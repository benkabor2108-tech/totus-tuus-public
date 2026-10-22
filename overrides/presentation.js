/* Totus Tuus V5.11.9 — présentation enrichie du parcours de 33 jours. */
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
    #totus-presentation .marial-discovery { margin:1.2rem 0; padding:1rem; border:1px solid #d7dfeb; border-radius:.85rem; background:#f8f6f0; }
    #totus-presentation .marial-discovery summary { cursor:pointer; font-weight:700; padding:.4rem 0; min-height:44px; }
    #totus-presentation .marial-discovery ol { padding-left:1.7rem; columns:2; column-gap:2rem; }
    #totus-presentation .marial-discovery li { break-inside:avoid; padding-right:.3rem; }
    #totus-presentation .marial-discovery .open-marial { display:block; margin:.85rem 0 .2rem; padding:.8rem 1rem; min-height:48px; border:0; border-radius:.65rem; background:#18365b; color:white; font:600 1rem system-ui; cursor:pointer; }
    @media(max-width:600px) { #totus-presentation .marial-discovery ol { columns:1; } }
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
      <li><strong>Le parcours marial « 33 jours avec Marie »</strong> : un chemin progressif pour approfondir la consécration à Jésus-Christ par Marie, inspiré du <em>Traité de la vraie dévotion</em> de saint Louis-Marie de Montfort.</li>
      <li><strong>Des aides pratiques</strong> : progression pas à pas, lecture à voix haute lorsque disponible, taille des textes et rappel de prière.</li>
    </ul>
    <h3>33 jours avec Marie : un livre de prière et de méditation</h3>
    <p>Chaque journée réunit une invocation au Saint-Esprit, un passage de la Parole de Dieu, une méditation, une lecture du <em>Traité de la vraie dévotion</em> et une prière du jour. Le livre se feuillette page par page ; vous pouvez adapter la taille des caractères.</p>
    <p><strong>Vous avancez librement :</strong> consulter une journée ne la marque jamais comme accomplie. Seule votre validation volontaire « Journée accomplie » enregistre le progrès et conduit au jour suivant. Votre avancement est conservé sur cet appareil. La remise à zéro demande une confirmation.</p>
    <details class="marial-discovery" id="totus-marial-discovery">
      <summary>Découvrir les thèmes des 33 journées</summary>
      <p>Voici les thèmes proposés, du premier jour jusqu'à la préparation finale. Leur consultation ici ne modifie pas votre progression.</p>
      <ol id="totus-marial-day-list"><li>Chargement des 33 journées…</li></ol>
      <button type="button" class="open-marial" id="totus-presentation-marial">Ouvrir le livre « 33 jours avec Marie » →</button>
    </details>
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
  const marialDetails = panel.querySelector('#totus-marial-discovery');
  let marialListLoaded = false;
  marialDetails.addEventListener('toggle', async () => {
    if (!marialDetails.open || marialListLoaded) return;
    const list = panel.querySelector('#totus-marial-day-list');
    try {
      const response = await fetch('./modules/parcours-marial/parcours_marial_33_jours_enrichi.json', {cache:'default'});
      if (!response.ok) throw new Error('Données indisponibles');
      const data = await response.json();
      if (!Array.isArray(data.jours) || data.jours.length !== 33) throw new Error('Liste incomplète');
      list.replaceChildren();
      for (const day of data.jours) {
        const item = document.createElement('li');
        item.textContent = 'Jour ' + day.jour + ' — ' + day.titre;
        list.appendChild(item);
      }
      marialListLoaded = true;
    } catch (error) {
      list.replaceChildren();
      const item = document.createElement('li');
      item.textContent = 'Les titres détaillés sont momentanément indisponibles. Le livre reste accessible depuis le bouton ci-dessous.';
      list.appendChild(item);
    }
  });
  panel.querySelector('#totus-presentation-marial').addEventListener('click', () => {
    const bookButton = document.getElementById('tt33-open');
    if (bookButton) bookButton.click();
    else {
      panel.hidden = true;
      open.setAttribute('aria-expanded','false');
      begin.click();
    }
  });
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