/* Totus Tuus Marian preview: self-contained offline cache, isolated scope. */
const CACHE='totus-marial-preview-2026-10-20-v7';
const FILES=['./','./index.html','./parcours-33.js','./traite-vraie-devotion-fr.pdf'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('totus-marial-preview-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
  event.respondWith(caches.match(req,{ignoreSearch:true}).then(hit=>{
    if(hit)return hit;
    return fetch(req).then(response=>{
      if(response.ok&&!req.headers.has('range')){
        const copy=response.clone();
        event.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,copy)));
      }
      return response;
    });
  }));
});
