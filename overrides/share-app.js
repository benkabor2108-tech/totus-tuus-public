/* Partager la nouvelle adresse de Totus Tuus sans renvoyer vers Netlify. */
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
  button.addEventListener('click', async () => {
    const message = 'Découvrez Totus Tuus : neuvaines et Rosaire méditatif.';
    if (navigator.share) {
      try { await navigator.share({title:'Totus Tuus',text:message,url}); return; }
      catch (error) { if (error.name === 'AbortError') return; }
    }
    if (navigator.clipboard) {
      try { await navigator.clipboard.writeText(url); button.textContent='Lien copié'; return; }
      catch (_) {}
    }
    window.prompt('Lien à partager',url);
  });
  actions.append(button);
})();
