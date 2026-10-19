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
    '🙏 Et si vous preniez chaque jour quelques minutes pour vous rapprocher de Jésus, à l’école de la Vierge Marie ?',
    '',
    '🌹 Découvrez TOTUS TUUS, un chemin de prière inspiré de saint Jean-Paul II : neuvaine de neuf jours, méditations bibliques, intentions personnelles et Rosaire méditatif.',
    '',
    '✨ Confiez vos intentions au Seigneur, fortifiez votre foi et avancez dans l’espérance !',
    '',
    '🙏 Découvrez l’application et partagez cette invitation avec vos proches.',
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
