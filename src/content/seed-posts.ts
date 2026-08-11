export type PostCategory = "campagna" | "evento" | "comunicato";

export type PortableTextBlock = {
  _type: string;
  _key?: string;
  style?: string;
  children?: { _type: string; text: string; marks?: string[] }[];
  markDefs?: { _key: string; _type: string; href?: string }[];
  [key: string]: unknown;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: PortableTextBlock[];
  coverImageUrl?: string;
  coverImage?: {
    asset?: { _ref?: string; url?: string };
    alt?: string;
  };
  category: PostCategory;
  publishedAt: string;
};

/** Contenuti iniziali migrati dal blog WordPress (usati se Sanity non è configurato). */
export const seedPosts: Post[] = [
  {
    "_id": "seed-2210",
    "title": "Studio di Napoli sulla N-Acetilcisteina",
    "slug": "studio-napoli-n-acetilcisteina",
    "excerpt": "A Napoli, all’Università Federico II, il team della dott.ssa Simona Fecarotta studia la N-acetilcisteina (NAC) come possibile approccio terapeutico per la sindrome DDX3X.",
    "coverImageUrl": "/media/wp/2026/08/Blue-Modern-Content-Ideas-For-Social-Media-Carousel-Instagram-Post.png",
    "category": "comunicato",
    "publishedAt": "2026-08-10T13:31:47.000Z",
    "body": [
      {
        "_type": "block",
        "_key": "b0",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Ricerca sulla sindrome DDX3X: perché a Napoli si sta studiando la N-acetilcisteina (NAC)",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b1",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "“Ogni nuova terapia nasce da un’idea. Ma prima ancora nasce dalla comprensione della malattia.”",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b2",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Negli ultimi anni, la ricerca sulla sindrome DDX3X ha compiuto importanti passi avanti. Dopo aver identificato il gene responsabile della sindrome, gli scienziati stanno cercando di capire quali meccanismi biologici vengono alterati e come sia possibile intervenire per migliorare la qualità di vita delle persone che ne sono affette.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b3",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "In Italia, uno dei gruppi più attivi in questo ambito è quello dell’Unità di Malattie Metaboliche Pediatriche dell’Università Federico II di Napoli, coordinato dalla Dott.ssa Simona Fecarotta. Durante la Conferenza Internazionale DDX3X Italia 2026, il team ha presentato i risultati preliminari di uno studio osservazionale sull’utilizzo della N-acetilcisteina (NAC).",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b4",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "È importante chiarire fin dall’inizio un punto fondamentale: non si tratta di una nuova terapia approvata, ma di una linea di ricerca che sta cercando di capire se questa molecola possa aiutare alcuni aspetti della sindrome DDX3X.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b5",
        "style": "h2",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Dalla genetica ai meccanismi della malattia",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b6",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "La proteina DDX3X svolge molte funzioni all’interno delle cellule. Una delle più importanti riguarda la gestione dello stress cellulare.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b7",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Ogni giorno le nostre cellule affrontano numerose situazioni di stress. Normalmente riescono a proteggersi e a ripristinare il proprio equilibrio. Quando però il gene DDX3X è alterato, questo sistema potrebbe non funzionare correttamente.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b8",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Uno dei fenomeni che i ricercatori stanno studiando è l’aumento dello stress ossidativo, cioè uno squilibrio tra la produzione di molecole altamente reattive (i radicali liberi) e la capacità dell’organismo di neutralizzarle.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b9",
        "style": "h3",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Che cos’è lo stress ossidativo?",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b10",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Immaginiamo una città.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b11",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Ogni giorno vengono prodotti rifiuti, ma esiste un efficiente servizio di raccolta che mantiene tutto pulito.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b12",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Se i rifiuti aumentano troppo o il servizio di raccolta smette di funzionare, iniziano ad accumularsi e possono danneggiare edifici, strade e servizi.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b13",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Nelle cellule succede qualcosa di simile.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b14",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "I radicali liberi vengono prodotti continuamente e, in condizioni normali, vengono eliminati grazie ai sistemi antiossidanti dell’organismo. Quando questo equilibrio si rompe, aumenta lo stress ossidativo e la cellula può funzionare meno efficacemente.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b15",
        "style": "h2",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Cosa hanno osservato i ricercatori?",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b16",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Prima di coinvolgere i pazienti, il gruppo di Napoli ha lavorato in laboratorio.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b17",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Utilizzando cellule ottenute da bambine con sindrome DDX3X, i ricercatori hanno osservato:",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b18",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• un aumento dello stress ossidativo;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b19",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• una maggiore ossidazione delle membrane cellulari;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b20",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• livelli ridotti di glutatione, uno dei principali antiossidanti prodotti naturalmente dall’organismo.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b21",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Quando queste cellule sono state trattate con N-acetilcisteina, alcuni di questi parametri sono migliorati.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b22",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Questi risultati hanno suggerito che valesse la pena verificare se effetti simili potessero essere osservati anche nei pazienti.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b23",
        "style": "h2",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Perché è stata scelta proprio la N-acetilcisteina?",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b24",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "La NAC non è stata scelta perché considerata una “cura” della sindrome DDX3X.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b25",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "È stata scelta perché:",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b26",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• è una molecola conosciuta da molti anni;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b27",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• possiede proprietà antiossidanti;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b28",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• contribuisce alla produzione di glutatione;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b29",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• era già stata studiata in altre patologie neurologiche;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b30",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• alcuni studi sul disturbo dello spettro autistico avevano mostrato risultati incoraggianti su alcuni aspetti comportamentali.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b31",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Queste informazioni hanno fornito una base scientifica sufficiente per proporne l’utilizzo in uno studio osservazionale sulla sindrome DDX3X.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b32",
        "style": "h3",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Cosa significa “uso off-label”?",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b33",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Quando un farmaco viene prescritto off-label, significa che viene utilizzato per una condizione diversa da quelle riportate nel foglietto illustrativo.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b34",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Questo non significa che venga usato senza basi scientifiche.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b35",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Al contrario, l’uso off-label può essere giustificato quando esistono studi e dati che ne supportano la sicurezza e il possibile beneficio, soprattutto nelle malattie rare, dove spesso non esistono farmaci specificamente approvati.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b36",
        "style": "h2",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Lo studio clinico svolto a Napoli",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b37",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Lo studio ha coinvolto inizialmente 19 persone con sindrome DDX3X.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b38",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Dodici sono state rivalutate dopo circa un anno di trattamento e dieci hanno proseguito il follow-up fino a 24–30 mesi.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b39",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "I ricercatori hanno utilizzato scale cliniche validate per valutare:",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b40",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• caratteristiche dello spettro autistico;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b41",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• irritabilità;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b42",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• iperattività;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b43",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• impulsività;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b44",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• attenzione;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b45",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• qualità del sonno;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b46",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• comportamento adattivo.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b47",
        "style": "h2",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Quali risultati sono emersi?",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b48",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "I dati presentati sono ancora preliminari.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b49",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Nel gruppo studiato non sono emersi cambiamenti significativi nelle caratteristiche dello spettro autistico considerate nel loro insieme.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b50",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Sono stati però osservati miglioramenti in alcuni aspetti comportamentali.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b51",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "In particolare, diversi partecipanti hanno mostrato una riduzione di:",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b52",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• irritabilità;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b53",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• iperattività;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b54",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• impulsività;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b55",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• comportamenti oppositivi;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b56",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• difficoltà attentive.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b57",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Alcuni bambini hanno risposto meglio di altri. I ricercatori li definiscono responders, cioè persone che sembrano trarre un beneficio maggiore dal trattamento.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b58",
        "style": "h3",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Chi sono i “responders”?",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b59",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Non tutte le persone con sindrome DDX3X sono uguali.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b60",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Ogni paziente presenta una variante genetica diversa, caratteristiche cliniche differenti e un proprio percorso di sviluppo.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b61",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Per questo motivo è possibile che uno stesso trattamento abbia effetti diversi da una persona all’altra.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b62",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Capire chi risponde meglio e perché rappresenta uno degli obiettivi principali della ricerca futura.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b63",
        "style": "h2",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Cosa non è cambiato?",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b64",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Anche i risultati negativi sono importanti.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b65",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Ad esempio, nello studio non sono stati osservati miglioramenti significativi nei disturbi del sonno, che sono rimasti sostanzialmente stabili durante il periodo di osservazione.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b66",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Conoscere ciò che non cambia aiuta i ricercatori a orientare meglio le future strategie terapeutiche.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b67",
        "style": "h2",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Perché non possiamo ancora parlare di una terapia?",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b68",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "La stessa Dott.ssa Fecarotta ha sottolineato i limiti dello studio.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b69",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Il numero dei partecipanti è ancora ridotto.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b70",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Ogni paziente presenta una variante genetica diversa.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b71",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Manca un gruppo di controllo che permetta di distinguere gli effetti del trattamento dalla naturale evoluzione della sindrome.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b72",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Per questo motivo non è ancora possibile concludere che i miglioramenti osservati siano stati causati dalla N-acetilcisteina.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b73",
        "style": "h3",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Che cos’è un trial clinico?",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b74",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Uno studio osservazionale permette di raccogliere informazioni preziose, ma non è sufficiente per dimostrare l’efficacia di una terapia.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b75",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Per questo servono i trial clinici, studi progettati con protocolli rigorosi e, quando possibile, con gruppi di controllo che consentano confronti affidabili.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b76",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Solo attraverso questi studi è possibile capire se un trattamento è realmente efficace e sicuro.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b77",
        "style": "h2",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "I prossimi passi",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b78",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Secondo il gruppo di ricerca di Napoli, il lavoro continuerà su più fronti:",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b79",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• ampliare il numero dei pazienti coinvolti;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b80",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• identificare biomarcatori dello stress ossidativo;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b81",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• comprendere meglio i meccanismi biologici della sindrome;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b82",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• testare anche altre molecole promettenti nei modelli cellulari e animali;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b83",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• avviare futuri trial clinici controllati.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b84",
        "style": "h2",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Un percorso che coinvolge tutta la comunità",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b85",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "La ricerca sulle malattie rare è un lavoro di squadra.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b86",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Ricercatori, clinici, laboratori, associazioni di pazienti e famiglie contribuiscono, ciascuno con il proprio ruolo, a costruire nuove conoscenze.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b87",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Lo studio presentato a Napoli rappresenta un tassello importante di questo percorso. Non offre ancora risposte definitive, ma aggiunge informazioni preziose che potranno guidare le prossime fasi della ricerca.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b88",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Per chi vive ogni giorno con la sindrome DDX3X, sapere che esistono gruppi di ricerca impegnati a comprendere i meccanismi della malattia e a sviluppare nuove strategie terapeutiche è già un segnale concreto di progresso.",
            "marks": []
          }
        ]
      }
    ]
  },
  {
    "_id": "seed-1994",
    "title": "Campagna di Pasqua 2026! Più uova, più ricerca!",
    "slug": "campagna-pasqua-2026",
    "excerpt": "Questa Pasqua puoi trasformare un dono tradizionale in un gesto di grande valore. Le nostre uova non sono solo buone: raccontano una storia di rarità, inclusione e speranza. La c",
    "coverImageUrl": "/media/wp/2026/02/uova-di-pasqua-2026.png",
    "category": "campagna",
    "publishedAt": "2026-02-06T13:23:35.000Z",
    "body": [
      {
        "_type": "block",
        "_key": "b0",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Questa Pasqua puoi trasformare un dono tradizionale in un gesto di grande valore. Le nostre uova non sono solo buone: raccontano una storia di rarità, inclusione e speranza.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b1",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "La campagna si è CONCLUSA!",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b2",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Grazie di cuore a chi ha scelto di rendere questa Pasqua ancora più dolce e solidale.",
            "marks": []
          }
        ]
      }
    ]
  },
  {
    "_id": "seed-1904",
    "title": "3° CONFERENZA INTERNAZIONALE - REGISTRATI ORA!",
    "slug": "conferenza-internazionale-registrati",
    "excerpt": "Le iscrizioni alla Conferenza internazionale sono APERTE! Un evento dedicato a famiglie, professionisti, ricercatori e caregiver, per condividere conoscenza, esperienze e pr",
    "coverImageUrl": "/media/wp/2026/01/DDX3X-Conference-5-6-May-2026-1-1.png",
    "category": "evento",
    "publishedAt": "2026-01-26T14:51:29.000Z",
    "body": [
      {
        "_type": "block",
        "_key": "b0",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Le iscrizioni alla Conferenza internazionale sono APERTE!",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b1",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Un evento dedicato a famiglie, professionisti, ricercatori e caregiver, per condividere conoscenza, esperienze e prospettive sulla sindrome DDX3X.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b2",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Trova tutte le info sulla pagine dedicata: 3° CONFERENZA INTERNAZIONALE",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b3",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Registration for the International Conference are now OPEN!",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b4",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "An event dedicated to families, professionals, researchers and caregivers, to share knowledge, experiences, and perspectives on DDX3X syndrome.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b5",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Find more info to the dedicated page: 3° INTERNATIONAL CONFERENCE",
            "marks": []
          }
        ]
      }
    ]
  },
  {
    "_id": "seed-1791",
    "title": "Campagna di Natale! Sostieni l'Associazione DDX3X con il tuo dono!",
    "slug": "campagna-natale-2025",
    "excerpt": "Quest’anno, per il Natale, abbiamo scelto una modalità semplice e speciale per sostenere l’Associazione DDX3X ODV: la vendita solidale di creme spalmabili artigianali. Acquistand",
    "coverImageUrl": "/media/wp/2025/11/Sostieni-lAssociazione-DDX3X-1-2.png",
    "category": "campagna",
    "publishedAt": "2025-11-20T12:11:33.000Z",
    "body": [
      {
        "_type": "block",
        "_key": "b0",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Quest’anno, per il Natale, abbiamo scelto una modalità semplice e speciale per sostenere l’Associazione DDX3X ODV: la vendita solidale di creme spalmabili artigianali.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b1",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Acquistando questi prodotti buoni e genuini, una quota del ricavato sarà donata all’associazione e contribuirà a sostenere i progetti dedicati alle persone con sindrome DDX3X e alle loro famiglie: supporto quotidiano, informazione, iniziative di sensibilizzazione e attività di ricerca.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b2",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• Per fare un regalo goloso e di qualità.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b3",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• Per trasformare un acquisto di Natale in un gesto di solidarietà.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b4",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "• Per aiutare concretamente la nostra comunità e i progetti che portiamo avanti ogni giorno.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b5",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": " Come acquistare",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b6",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": " Per info e contatti rivolgersi a info@ddx3x.it oppure contattare Valentina: 349 1433538",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b7",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Grazie di cuore a chi sceglierà di rendere questo Natale ancora più dolce e solidale.",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b8",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "Insieme possiamo fare la differenza!",
            "marks": []
          }
        ]
      }
    ]
  },
  {
    "_id": "seed-1249",
    "title": "Le mutazioni in DDX3X sono una causa comune di disabilità intellettiva inspiegabile con effetti specifici per genere sulla segnalazione Wnt",
    "slug": "mutazioni-ddx3x-disabilita-intellettiva",
    "excerpt": "Studio scientifico sulle mutazioni DDX3X come causa comune di disabilità intellettiva inspiegabile, con effetti specifici per genere sulla segnalazione Wnt.",
    "coverImageUrl": "/media/wp/2025/05/Screenshot-2025-10-16-112710.png",
    "category": "comunicato",
    "publishedAt": "2025-05-23T11:26:02.000Z",
    "body": [
      {
        "_type": "block",
        "_key": "b1",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "marks": [],
            "text": "Le mutazioni in DDX3X sono una causa comune di disabilità intellettiva inspiegabile, con effetti specifici per genere sulla segnalazione Wnt. Lo studio approfondisce il ruolo del gene DDX3X nello sviluppo neurologico e nelle differenze di presentazione tra maschi e femmine."
          }
        ]
      }
    ]
  }
];
