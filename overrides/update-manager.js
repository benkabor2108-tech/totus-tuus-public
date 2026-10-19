/* Totus Tuus V5.7 : mise à jour douce des onglets et applications installées. */
(() => {
  'use strict';
  const VERSION_URL = new URL('./version.json', location.href).href;
  const CHECK_EVERY_MS = 15 * 60 * 1000;
  const key = 'totus-version-current';
  let running = false;
  let notice = null;
  let current = '';
  const getStored = () => { try { return localStorage.getItem(key) || ''; } catch (_) { return ''; } };
  const store = value => { try { localStorage.setItem(key, value); } catch (_) {} };
  async function fetchVersion() {
    const response = await fetch(VERSION_URL + '?t=' + Date.now(), {cache:'no-store', credentials:'same-origin'});
    if (!response.ok) throw new Error('Version indisponible');
    const payload = await response.json();
    if (!payload || typeof payload.version !== 'string' || !/^[a-zA-Z0-9._-]{4,80}$/.test(payload.version)) throw new Error('Version invalide');
    return payload.version;
  }
  function showUpdate() {
    if (notice) return;
    notice = document.createElement('aside');
    notice.id = 'totus-update-notice';
    notice.setAttribute('role','status');
    notice.setAttribute('aria-live','polite');
    notice.style.cssText = 'position:fixed;left:12px;right:12px;bottom:14px;z-index:2147483000;max-width:530px;margin:auto;padding:14px 16px;border:1px solid #a9c5dd;border-radius:14px;background:#fff;color:#18365b;box-shadow:0 6px 30px #0003;font:16px/1.45 system-ui,sans-serif;';
    const message = document.createElement('p');
    message.style.margin = '0 0 10px';
    message.textContent = 'Une nouvelle version de Totus Tuus est disponible. Vous pouvez terminer votre prière avant de l’installer.';
    const refresh = document.createElement('button');
    refresh.type = 'button';
    refresh.textContent = 'Mettre à jour maintenant';
    refresh.style.cssText = 'background:#18365b;color:#fff;border:0;border-radius:8px;padding:10px 12px;margin-right:8px;cursor:pointer;';
    refresh.addEventListener('click', async () => {
      refresh.disabled = true;
      refresh.textContent = 'Mise à jour…';
      try {
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map(r => r.update().catch(() => {})));
        }
      } catch (_) {}
      store(current);
      const target = new URL(location.href);
      target.searchParams.set('tt_version', current);
      location.replace(target.href);
    });
    const later = document.createElement('button');
    later.type = 'button';
    later.textContent = 'Plus tard';
    later.style.cssText = 'border:1px solid #98a9bd;background:#fff;color:#18365b;border-radius:8px;padding:10px 12px;cursor:pointer;';
    later.addEventListener('click', () => { notice.remove(); notice = null; });
    notice.append(message, refresh, later);
    document.body.append(notice);
  }
  async function check() {
    if (running || !navigator.onLine) return;
    running = true;
    try {
      const remote = await fetchVersion();
      const prior = current || getStored();
      if (!prior) {
        current = remote;
        store(remote);
      } else if (remote !== prior) {
        showUpdate();
      }
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) registration.update().catch(() => {});
      }
    } catch (_) {
      // En mode hors connexion, conserver les prières accessibles.
    } finally {
      running = false;
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    check();
    window.setInterval(() => { if (document.visibilityState === 'visible') check(); }, CHECK_EVERY_MS);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check(); });
    window.addEventListener('online', check);
  }, {once:true});
})();