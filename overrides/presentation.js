/* Totus Tuus V5.5 — présentation et invitation à la prière. */
(() => {
  'use strict';
  const hero = document.querySelector('#accueil .hero-copy');
  const begin = document.getElementById('begin');
  if (!hero || !begin || document.getElementById('discover-app')) return;

  const style = document.createElement('style');
  style.textContent = `
    #discover-app { display:inline-block; margin:.65rem 0; padding:.7rem 1rem; border:1px solid currentColor; border-radius:.7rem; background:transparent; color:inherit; font:inherit; font-weight:650; cursor:pointer; }
    #totus-presentation { max-width:750px; margin:1.1rem auto; padding:1.35rem; background:#fff; color:#243650; border:1px solid #d7dfeb; border-radius:1rem; box-shadow:0 5px 24px #00000012; text-align:left; }
    #totus-presentation[hidden] { display:none !important; }
    #totus-presentation h2 { margin:.1rem 0 .9rem; font-size:clamp(1.35rem,4vw,1.9rem); line-height:1.25; }
    #totus-presentation h3 { margin:1rem 0 .35rem; font-size:1.1rem; }
    #totus-presentation p { line-height:1.65; margin:.55rem 0; }
    #totus-presentation ul { margin:.5rem 0 .9rem; padding-left:1.4rem; }
    #totus-presentation li { margin:.4rem 0; line-height:1.55; }
    #totus-presentation .presentation-actions { display:flex; flex-wrap:wrap; gap:.6rem; margin-top:1.2rem; }
    #totus-presentation .presentation-actions button { padding:.75rem 1rem; border-radius:.7rem; font:inherit; cursor:pointer; }
    #totus-presentation .presentation-actions .go { background:#18365b; color:white; border:1px solid #18365b; font-weight:650; }
    #totus-presentation .presentation-actions .close { background:white; color:#18365b; border:1px solid #9aaabe; }
  `;
  document.head.append(style);
  const open = document.createElement('button');
  open.type = 'button';
  open.id = 'discover-app';
  open.setAttribute('aria-expanded','false');
  open.setAttribute('aria-controls','totus-presentation');
  open.textContent = 'Découvrir l’application et son chemin de prière →';
  const panel = document.createElement('section');
  panel.id = 'totus-presentation';
  panel.hidden = true;
  panel.setAttribute('aria-labelledby','totus-presentation-title');
  panel.innerHTML = `
    <p class="eyebrow">BIENVENUE DANS TOTUS TUUS</p>
    <h2 id="totus-presentation-title" tabindex="-1">Un chemin de prière, d’espérance et de confiance</h2>
    <p><strong>Totus Tuus</strong>, « Tout à toi », rappelle la confiance filiale de saint Jean-Paul II envers la Vierge Marie, qui nous conduit toujours à son Fils, Jésus-Christ.</p>
    <p>Cette application a été conçue pour vous accompagner dans la prière personnelle, à votre rythme, dans le silence ou en famille. Elle vous propose de méditer la Parole de Dieu et de demander au Seigneur ses grâces par l’intercession de saint Jean-Paul II.</p>
    <h3>Ce que vous trouverez dans l’application</h3>
    <ul>
      <li><strong>Une neuvaine mariale de neuf jours</strong> pour contempler le Christ avec Marie et saint Jean-Paul II.</li>
      <li><strong>Des neuvaines selon vos intentions</strong> : confiez une situation particulière à Dieu et suivez un cheminement de prière sur neuf jours.</li>
      <li><strong>Le Rosaire méditatif</strong>, avec les mystères, leurs fruits spirituels et des lectures bibliques à méditer.</li>
      <li><strong>Des aides pratiques</strong> : progression pas à pas, lecture à voix haute lorsque disponible, taille des textes et rappel de prière.</li>
    </ul>
    <h3>Une invitation à commencer</h3>
    <p>Peut-être portez-vous une joie à rendre grâce, une épreuve à traverser, une personne à confier au Seigneur ou une décision à éclairer. N’attendez pas que tout soit parfait pour prier. Offrez à Dieu quelques minutes de votre journée, avec un cœur sincère et disponible.</p>
    <p><strong>« N’ayez pas peur ! Ouvrez toutes grandes les portes au Christ ! »</strong> — saint Jean-Paul II.</p>
    <p>Avancez avec persévérance, sans rechercher de résultat automatique : la prière est d’abord une rencontre avec Dieu. Que Marie vous aide à accueillir sa paix, à grandir dans la foi et à aimer davantage.</p>
    <div class="presentation-actions">
      <button class="go" id="totus-presentation-start" type="button">Commencer mon chemin de prière →</button>
      <button class="close" id="totus-presentation-close" type="button">Retour à l’accueil</button>
    </div>
    <p class="subtle">Les prières proposées sont des compositions de dévotion ; elles ne remplacent ni les sacrements ni l’accompagnement spirituel de l’Église.</p>
  `;
  begin.insertAdjacentElement('afterend', open);
  hero.append(panel);
  function show() {
    panel.hidden = false;
    open.setAttribute('aria-expanded','true');
    panel.querySelector('h2').focus({preventScroll:true});
    panel.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function hide() {
    panel.hidden = true;
    open.setAttribute('aria-expanded','false');
    open.focus({preventScroll:true});
  }
  open.addEventListener('click', () => panel.hidden ? show() : hide());
  panel.querySelector('#totus-presentation-close').addEventListener('click', hide);
  panel.querySelector('#totus-presentation-start').addEventListener('click', () => {
    panel.hidden = true;
    open.setAttribute('aria-expanded','false');
    begin.click();
  });
})();