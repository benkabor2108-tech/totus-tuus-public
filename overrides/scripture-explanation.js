/* Totus Tuus V5.9 : « Comprendre le texte » sans répétition du texte biblique. */
(() => {
  'use strict';
  const notes = [
    ['Accueillir l’appel de Dieu','À l’Annonciation, Marie écoute, questionne et consent librement à la parole de Dieu. Son « oui » nous apprend que la foi est une réponse confiante, même lorsque nous ne comprenons pas tout.','Quelle réponse Dieu attend-il de moi aujourd’hui ?'],
    ['Recevoir Marie comme mère','Marie accompagne les disciples et les conduit vers son Fils. L’accueillir comme mère spirituelle, c’est grandir dans la fidélité à Jésus, y compris dans les épreuves.','Comment Marie peut-elle m’aider à suivre Jésus ?'],
    ['Contempler Jésus dans le Rosaire','Le Rosaire nous invite à méditer les événements de la vie du Christ avec Marie. La répétition des prières soutient la contemplation, elle ne remplace pas l’attention du cœur.','Quel mystère de Jésus ai-je besoin de méditer ?'],
    ['Aimer avec un cœur disponible','Le Cœur Immaculé de Marie exprime son amour fidèle et sa disponibilité à Dieu. Cette dévotion nous invite à purifier nos intentions et à aimer avec plus de générosité.','Quelle attitude de mon cœur dois-je confier au Seigneur ?'],
    ['Prier en toute circonstance','Demander l’intercession de Marie ne remplace pas la prière adressée à Dieu : elle nous conduit vers Jésus. Nous pouvons lui confier nos joies, nos peines et nos décisions.','Dans quelle situation ai-je besoin de revenir à Jésus ?'],
    ['Imiter les vertus de Marie','L’humilité de Marie consiste à reconnaître l’œuvre de Dieu sans se placer au centre. Sa pureté et son obéissance sont des expressions de sa liberté et de son amour.','Quel acte concret d’humilité puis-je poser aujourd’hui ?'],
    ['Demeurer en présence de Dieu','La prière continuelle n’exige pas de parler sans arrêt. Elle signifie vivre en présence de Dieu, lui offrir son travail et revenir à lui au fil de la journée.','Quelle activité quotidienne puis-je transformer en prière ?'],
    ['Se donner à Jésus par Marie','Le « Totus Tuus » de saint Jean-Paul II signifie une confiance filiale envers Marie pour appartenir davantage à Jésus. La consécration mariale est orientée vers le Christ.','Qu’ai-je encore du mal à remettre au Seigneur ?'],
    ['Persévérer dans la foi','La fidélité se construit jour après jour, même lorsque la prière semble difficile. La persévérance s’appuie sur la grâce de Dieu, et non sur notre seule volonté.','Quelle habitude de prière vais-je garder après la neuvaine ?']
  ];
  const body = document.getElementById('prayer-body');
  const count = document.getElementById('step-count');
  if (!body || !count) return;
  let rendering = false;
  function apply() {
    if (rendering) return;
    const step = Number((count.textContent.match(/Étape\s*(\d+)/i)||[])[1]);
    if (step !== 4) { delete body.dataset.explanationIndex; return; }
    const day = document.getElementById('day-title')?.textContent || '';
    const markers = ['connaître et d’aimer','véritable Mère','saint Rosaire','Cœur Immaculé','invoquer Marie','humilité','prière continuelle','entièrement à Jésus','persévérance'];
    const index = markers.findIndex(m => day.toLocaleLowerCase('fr').includes(m.toLocaleLowerCase('fr')));
    if (index < 0 || (body.dataset.explanationIndex === String(index) && body.querySelector('[data-totus-explanation]'))) return;
    rendering = true;
    const [title, explanation, question] = notes[index];
    const h = document.createElement('h3'); h.textContent = title; h.dataset.totusExplanation = 'true';
    const p = document.createElement('p'); p.textContent = explanation;
    const h2 = document.createElement('h4'); h2.textContent = 'Pour méditer';
    const p2 = document.createElement('p'); p2.textContent = question;
    body.replaceChildren(h,p,h2,p2);
    body.dataset.explanationIndex = String(index);
    rendering = false;
  }
  new MutationObserver(apply).observe(document.getElementById('priere') || document.body,{subtree:true,childList:true,characterData:true});
  apply();
})();