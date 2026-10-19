/* Restaurer le message d'invitation dans le partage Totus Tuus V5.9.1. */
(() => {
  'use strict';
  const panel = document.getElementById('totus-presentation');
  const actions = panel?.querySelector('.presentation-actions');
  if (!actions || document.getElementById('totus-share-app')) return;
  const url = new URL('./', document.baseURI).href;
  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'totus-share-app';
  button.textContent = 'Partager Totus Tuus';
  const message = [
    '🙏 Et si vous preniez chaque jour un moment pour vous rapprocher de Jésus, à l’école de la Vierge Marie ?',
    '',
    'Découvrez TOTUS TUUS, un chemin de prière inspiré de saint Jean-Paul II : neuf jours de méditation de la Parole de Dieu, intentions personnelles et Rosaire méditatif.',
    '',
    '🌹 Confiez au Seigneur vos joies, vos épreuves, votre famille et vos projets, par l’intercession de la Vierge Marie et de saint Jean-Paul II.',
    '',
    '✨ Prenez quelques minutes pour nourrir votre foi et votre espérance. « Totus Tuus » : tout à toi, Marie, pour être tout à Jésus.',
    '',
    '🙏 Partagez cette invitation avec vos proches : une simple invitation peut ouvrir un chemin de prière.',
    '',
    url
  ].join('\n');
  button.addEventListener('click', async () => {
    // Inclure le lien DANS le texte pour éviter que certaines applications
    // ne conservent que l'URL en ignorant la légende de partage.
    if (navigator.share) {
      try { await navigator.share({title:'Totus Tuus — Un chemin de prière',text:message}); return; }
      catch (error) { if (error.name === 'AbortError') return; }
    }
    if (navigator.clipboard) {
      try { await navigator.clipboard.writeText(message); button.textContent='Invitation copiée'; return; }
      catch (_) {}
    }
    window.prompt('Copier cette invitation à partager',message);
  });
  actions.append(button);
})();
