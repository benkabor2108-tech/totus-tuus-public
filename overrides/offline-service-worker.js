'use strict';
const CACHE='__CACHE_NAME__',FILES=__PRECACHE_FILES__,REQUIRED=__REQUIRED_FILES__;
const base=new URL('./',self.location.href);
const absolute=p=>new URL(p,base).href;
self.addEventListener('install',e=>e.waitUntil((async()=>{
 const c=await caches.open(CACHE);
 await c.addAll(REQUIRED.map(absolute));
 await self.skipWaiting();
})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
 const keys=await caches.keys();
 await Promise.all(keys.filter(k=>k.startsWith('totus-tuus-pages-')&&k!==CACHE).map(k=>caches.delete(k)));
 await self.clients.claim();
 // L'activation ne doit pas attendre le téléchargement des fichiers secondaires.
 // Le livre complet (Bible, Traité, 33 journées, couverture) est déjà précaché.
 const optional=FILES.filter(p=>!REQUIRED.includes(p));
 e.waitUntil((async()=>{
  const c=await caches.open(CACHE);
  for(let i=0;i<optional.length;i+=12)
   await Promise.allSettled(optional.slice(i,i+12).map(async p=>{
    const r=await fetch(absolute(p),{cache:'reload'});
    if(r.ok)await c.put(absolute(p),r);
   }));
 })());
})()));
self.addEventListener('fetch',e=>{
 const req=e.request;if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==base.origin||!url.pathname.startsWith(base.pathname))return;
 const key=url.origin+url.pathname;
 if(req.mode==='navigate'){
  e.respondWith((async()=>{try{
   const r=await fetch(req);
   if(r.ok)(await caches.open(CACHE)).put(absolute('index.html'),r.clone()).catch(()=>{});
   return r;
  }catch(_){return(await caches.match(absolute('index.html')))||Response.error();}})());return;
 }
 e.respondWith((async()=>{
  const c=await caches.open(CACHE);
  const saved=(await c.match(req))||(await c.match(key));
  if(saved)return saved;
  try{const r=await fetch(req);if(r.ok)c.put(key,r.clone()).catch(()=>{});return r;}
  catch(_){return Response.error();}
 })());
});