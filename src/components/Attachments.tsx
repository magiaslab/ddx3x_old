/** Documento scaricabile da Sanity, già risolto dalla query GROQ. */
export type Attachment = {
  _key?: string;
  title?: string;
  description?: string;
  url?: string;
  extension?: string;
  size?: number;
  originalFilename?: string;
};

/** Proiezione GROQ per un documento (campo `attachments` o blocco nel body). */
export const attachmentProjection = `
  _key, _type, title, description,
  "url": asset->url,
  "extension": asset->extension,
  "size": asset->size,
  "originalFilename": asset->originalFilename
`;

function formatSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toLocaleString("it-IT", {
    maximumFractionDigits: 1,
  })} MB`;
}

function FileIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M12 12v5" />
      <path d="m9.5 14.5 2.5 2.5 2.5-2.5" />
    </svg>
  );
}

export function AttachmentCard({ file }: { file: Attachment }) {
  if (!file.url) return null;
  const title = file.title || file.originalFilename || "Documento";
  const meta = [file.extension?.toUpperCase(), formatSize(file.size)]
    .filter(Boolean)
    .join(" · ");

  return (
    <a
      href={file.url}
      target="_blank"
      rel="noreferrer"
      className="doc-card"
      aria-label={`${title}${meta ? ` (${meta})` : ""}, si apre in una nuova scheda`}
    >
      <span className="doc-card__icon">
        <FileIcon />
      </span>
      <span className="doc-card__text">
        <span className="doc-card__title">{title}</span>
        {file.description ? (
          <span className="doc-card__desc">{file.description}</span>
        ) : null}
        {meta ? <span className="doc-card__meta">{meta}</span> : null}
      </span>
    </a>
  );
}

export function AttachmentList({ files }: { files?: Attachment[] }) {
  const list = (files ?? []).filter((f) => f.url);
  if (!list.length) return null;

  return (
    <section aria-labelledby="documenti" className="doc-section">
      <h2 id="documenti">Documenti</h2>
      <ul className="doc-list">
        {list.map((file, i) => (
          <li key={file._key ?? i}>
            <AttachmentCard file={file} />
          </li>
        ))}
      </ul>
    </section>
  );
}
