#!/usr/bin/env python3
"""Porta nell'editor visuale (Portable Text) le pagine che mostrano ancora
l'HTML importato da WordPress, poi svuota bodyHtml.

  python3 scripts/migrate-bodyhtml.py            # prova: scrive solo .backup-sanity/
  python3 scripts/migrate-bodyhtml.py --apply    # carica immagini e aggiorna Sanity

Legge .env.local (SANITY_API_WRITE_TOKEN). Prima di scrivere salva una copia
di ogni documento in .backup-sanity/.
"""
import json
import os
import re
import sys
import unicodedata
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BACKUP = ROOT / ".backup-sanity"
APPLY = "--apply" in sys.argv

env = {}
for line in (ROOT / ".env.local").read_text().splitlines():
    if "=" in line and not line.lstrip().startswith("#"):
        k, v = line.split("=", 1)
        env[k.strip()] = v.strip().strip('"')
PROJECT = env["NEXT_PUBLIC_SANITY_PROJECT_ID"]
DATASET = env.get("NEXT_PUBLIC_SANITY_DATASET", "production")
TOKEN = env["SANITY_API_WRITE_TOKEN"]
API = f"https://{PROJECT}.api.sanity.io/v2025-01-01"


def request(url, data=None, content_type="application/json"):
    req = urllib.request.Request(url, data=data, method="POST" if data else "GET")
    req.add_header("Authorization", f"Bearer {TOKEN}")
    if data:
        req.add_header("Content-Type", content_type)
    with urllib.request.urlopen(req) as r:
        return json.load(r)


def query(groq):
    q = urllib.parse.urlencode({"query": groq, "perspective": "raw"})
    return request(f"{API}/data/query/{DATASET}?{q}")["result"]


def anchor(text):
    t = unicodedata.normalize("NFD", text)
    t = "".join(c for c in t if not unicodedata.combining(c)).lower()
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-")


_key_n = 0


def key():
    global _key_n
    _key_n += 1
    return f"m{_key_n:04d}"


uploaded = {}


def image_asset(src):
    """Carica l'immagine in Sanity (solo con --apply) e restituisce l'_id."""
    if src in uploaded:
        return uploaded[src]
    path = ROOT / "public" / src.lstrip("/")
    if not path.is_file():
        raise SystemExit(f"Immagine non trovata: {path}")
    if not APPLY:
        uploaded[src] = f"DA-CARICARE:{src}"
        return uploaded[src]
    ext = path.suffix.lower().lstrip(".")
    mime = {"jpg": "image/jpeg", "jpeg": "image/jpeg"}.get(ext, f"image/{ext}")
    res = request(
        f"{API}/assets/images/{DATASET}?filename={urllib.parse.quote(path.name)}",
        data=path.read_bytes(),
        content_type=mime,
    )
    uploaded[src] = res["document"]["_id"]
    return uploaded[src]


class Converter(HTMLParser):
    """HTML WordPress semplice → blocchi Portable Text."""

    HEADINGS = {"h1": "section", "h2": "h2", "h3": "h3", "h4": "h3", "h5": "h3", "h6": "h3"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.blocks = []
        self.block = None  # blocco di testo aperto
        self.marks = []  # decoratori/annotazioni attivi
        self.lists = []  # pila di (tipo lista)
        self.style_stack = []
        self.anchor_map = {}  # vecchio id → nuova ancora

    # -- blocchi --------------------------------------------------------
    def open_block(self, style="normal"):
        self.close_block()
        self.block = {"_type": "block", "_key": key(), "style": style,
                      "markDefs": [], "children": []}
        if self.lists:
            self.block["listItem"] = self.lists[-1]
            self.block["level"] = len(self.lists)

    def close_block(self):
        b = self.block
        self.block = None
        if not b:
            return
        # unisci gli span consecutivi con gli stessi mark e ripulisci spazi
        merged = []
        for s in b["children"]:
            if merged and merged[-1]["marks"] == s["marks"]:
                merged[-1]["text"] += s["text"]
            else:
                merged.append(s)
        for s in merged:
            s["text"] = re.sub(r"[ \t\r\f\v]*\n[ \t\r\f\v]*", "\n", re.sub(r"[ \t\r\f\v]+", " ", s["text"]))
        if merged:
            merged[0]["text"] = merged[0]["text"].lstrip()
            merged[-1]["text"] = merged[-1]["text"].rstrip()
        merged = [s for s in merged if s["text"]]
        if not merged:
            return
        used = {m for s in merged for m in s["marks"]}
        b["markDefs"] = [d for d in b["markDefs"] if d["_key"] in used]
        b["children"] = merged
        self.blocks.append(b)

    def text(self, t):
        if not self.block:
            if not t.strip():
                return
            self.open_block()
        self.block["children"].append(
            {"_type": "span", "_key": key(), "text": t, "marks": [m for m in self.marks if m]})

    # -- parser ---------------------------------------------------------
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in self.HEADINGS:
            style = "section" if "ricerca-macro" in (a.get("class") or "") else self.HEADINGS[tag]
            self.open_block(style)
            self.block["_oldId"] = a.get("id")
        elif tag in ("p", "figcaption"):
            self.open_block("normal")
        elif tag == "blockquote":
            self.open_block("blockquote")
        elif tag in ("ul", "ol"):
            self.close_block()
            kind = "index" if "ricerca-indice" in (a.get("class") or "") else (
                "bullet" if tag == "ul" else "number")
            self.lists.append(kind)
        elif tag == "li":
            self.open_block("normal")
        elif tag in ("strong", "b"):
            self.marks.append("strong")
        elif tag in ("em", "i"):
            self.marks.append("em")
        elif tag == "a":
            if not self.block:
                self.open_block()
            href = a.get("href", "")
            k = key()
            d = {"_type": "link", "_key": k, "href": href}
            if "btn-link" in (a.get("class") or ""):
                d["button"] = True
            self.block["markDefs"].append(d)
            self.marks.append(k)
        elif tag == "br":
            self.text("\n")
        elif tag == "img":
            src = a.get("src", "")
            if src.startswith("http"):
                # emoji di Google (es. 👉): diventa testo
                if a.get("alt"):
                    self.text(a["alt"] + " ")
                return
            reopen = self.block is not None and bool(self.block["children"])
            style = self.block["style"] if self.block else "normal"
            self.close_block()
            self.blocks.append({"_type": "image", "_key": key(),
                                "asset": {"_type": "reference", "_ref": image_asset(src)},
                                "alt": a.get("alt", "")})
            if reopen:
                self.open_block(style)
        else:
            self.marks.append(None) if tag in ("span", "u") else None

    def handle_endtag(self, tag):
        if tag in self.HEADINGS or tag in ("p", "figcaption", "blockquote", "li"):
            self.close_block()
        elif tag in ("ul", "ol"):
            self.close_block()
            if self.lists:
                self.lists.pop()
        elif tag in ("strong", "b", "em", "i", "a", "span", "u"):
            if self.marks:
                self.marks.pop()

    def handle_data(self, data):
        if self.block or data.strip():
            self.text(data)

    def result(self):
        self.close_block()
        # ancore: i link "#vecchio-id" puntano alla nuova ancora del titolo
        for b in self.blocks:
            old = b.pop("_oldId", None)
            if old:
                self.anchor_map["#" + old] = "#" + anchor("".join(c["text"] for c in b["children"]))
        for b in self.blocks:
            for d in b.get("markDefs", []):
                d["href"] = self.anchor_map.get(d["href"], d["href"])
        return self.blocks


def convert(html):
    c = Converter()
    c.feed(html)
    return c.result()


def to_text(blocks):
    out = []
    for b in blocks:
        if b["_type"] == "image":
            out.append(f"[immagine {b['asset']['_ref']}]")
            continue
        t = "".join(c["text"] for c in b["children"])
        links = [d for d in b["markDefs"]]
        prefix = {"section": "## ", "h2": "## ", "h3": "### "}.get(b["style"], "")
        li = f"{'  ' * (b.get('level', 1) - 1)}- [{b['listItem']}] " if b.get("listItem") else ""
        out.append(f"{li}{prefix}{t}" + "".join(
            f"  →{' [PULSANTE]' if d.get('button') else ''} {d['href']}" for d in links))
    return "\n".join(out)


def main():
    BACKUP.mkdir(exist_ok=True)
    docs = query('*[_type == "page" && defined(bodyHtml) && bodyHtml != ""]')
    mutations = []
    report = []
    for d in docs:
        slug = d["slug"]["current"]
        (BACKUP / f"{d['_id']}.json").write_text(json.dumps(d, ensure_ascii=False, indent=1))
        if d["_id"] == "page-dona-campagne":
            # qui il testo nuovo è già nell'editor (Angelica): solo pulizia
            body = []
            for b in d["body"]:
                t = "".join(c.get("text", "") for c in b.get("children", []))
                m = re.fullmatch(r"\(immagine: (\S+)\)", t.strip()) if b.get("_type") == "block" else None
                if m and m.group(1).startswith("/"):
                    body.append({"_type": "image", "_key": b["_key"],
                                 "asset": {"_type": "reference", "_ref": image_asset(m.group(1))},
                                 "alt": ""})
                elif m:
                    continue  # emoji: aggiunta come testo nel blocco seguente
                else:
                    if t.startswith("Per info e contatti") and not t.startswith("👉"):
                        b["children"][0]["text"] = "👉 " + b["children"][0]["text"]
                    body.append(b)
        else:
            body = convert(d["bodyHtml"])
        report.append(f"===== /{slug}\n{to_text(body)}\n")
        mutations.append({"patch": {"id": d["_id"], "ifRevisionID": d["_rev"],
                                    "set": {"body": body}, "unset": ["bodyHtml"]}})

    (BACKUP / "anteprima-conversione.txt").write_text("\n".join(report))
    (BACKUP / "mutazioni.json").write_text(json.dumps({"mutations": mutations}, ensure_ascii=False, indent=1))
    print(f"{len(docs)} pagine. Anteprima: {BACKUP / 'anteprima-conversione.txt'}")
    if not APPLY:
        print("Prova: niente scritto su Sanity. Rilancia con --apply.")
        return
    res = request(f"{API}/data/mutate/{DATASET}?returnIds=true",
                  data=json.dumps({"mutations": mutations}).encode())
    print("Fatto, transazione", res.get("transactionId"), "-", len(res.get("results", [])), "documenti")


main()
