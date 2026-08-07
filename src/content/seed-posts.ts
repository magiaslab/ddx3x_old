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
