/* Totus Tuus : afficher le début de la nouvelle prière après navigation. */
(() => {
  'use strict';
  const controls = new Set(['next','previous','guided-next','guided-back','intention-next','intention-prev']);
  const selectors = {
    next: ['#step-title','#prayer-body','#day-title'],
    previous: ['#step-title','#prayer-body','#day-title'],
    'guided-next': ['#guided-title','#guided-prayer','#guided-rosary'],
    'guided-back': ['#guided-title','#guided-prayer','#guided-rosary'],
    'intention-next': ['#intention-title','#intention-prayer'],
    'intention-prev': ['#intention-title','#intention-prayer']
  };
  const visible = element => element && element.getClientRects().length > 0;
  function position(id) {
    const target = selectors[id].map(s => document.querySelector(s)).find(visible);
    if (!target) return;
    const header = document.querySelector('header.top');
    const offset = visible(header) ? header.getBoundingClientRect().height + 12 : 12;
    const top = Math.max(0, target.getBoundingClientRect().top + window.pageYOffset - offset);
    window.scroll({top, behavior:'instant'});
  }
  document.addEventListener('click', event => {
    const b = event.target.closest('button');
    if (!b || !controls.has(b.id) || b.disabled) return;
    requestAnimationFrame(() => requestAnimationFrame(() => position(b.id)));
  }, true);
})();
