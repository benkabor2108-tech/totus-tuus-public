const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'allow'});
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:8765/',{waitUntil:'load'});
  await page.evaluate(async()=>{
   if(!('serviceWorker' in navigator))throw Error('Service worker absent');
   const reg=await navigator.serviceWorker.register('./service-worker.js');
   await navigator.serviceWorker.ready;
   await new Promise((resolve,reject)=>{
    if(navigator.serviceWorker.controller)return resolve();
    const t=setTimeout(()=>reject(Error('SW non actif')),15000);
    navigator.serviceWorker.addEventListener('controllerchange',()=>{clearTimeout(t);resolve()},{once:true});
   });
  });
  const before=await page.evaluate(async()=>{
   const c=await caches.open('totus-tuus-pages-v5-12-2');
   const paths=['index.html','modules/parcours-marial/parcours-marial.js','modules/parcours-marial/parcours_marial_33_jours_enrichi.json','modules/parcours-marial/bible_crampon_33_lectures.json','modules/parcours-marial/traite_33_lectures.json'];
   return Promise.all(paths.map(async p=>[p,!!(await c.match(new URL(p,location.href).href))]));
  });
  assert.ok(before.every(x=>x[1]),'Ressources absentes du cache: '+JSON.stringify(before));
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  const result=await page.evaluate(async()=>{
   const paths=['./modules/parcours-marial/parcours_marial_33_jours_enrichi.json','./modules/parcours-marial/bible_crampon_33_lectures.json','./modules/parcours-marial/traite_33_lectures.json'];
   return Promise.all(paths.map(async p=>{const r=await fetch(p);return [p,r.status,(await r.json())!=null]}));
  });
  assert.ok(result.every(x=>x[1]===200&&x[2]),'Lecture hors connexion impossible: '+JSON.stringify(result));
  // Vérification fonctionnelle : ouvrir réellement le livre après coupure réseau.
  await page.locator('.tt33-cover').evaluate(el=>el.click());
  await page.locator('#tt33-day').waitFor({state:'visible',timeout:15000});
  assert.equal(await page.locator('#tt33-day').inputValue(),'0');
  assert.match(await page.locator('#tt33-day-scroll').innerText(),/Invocation au Saint-Esprit/);
  assert.match(await page.locator('#tt33-day-scroll').innerText(),/Amen/);
  assert.match(await page.locator('#tt33-day-scroll').innerText(),/Parole de Dieu/);
  assert.equal(await page.locator('.tt33-day-section').count(),5);
  await page.locator('#tt33-forward').click();
  assert.equal(await page.locator('#tt33-day').inputValue(),'1');
  assert.equal(await page.locator('#tt33-done').isChecked(),false);
  assert.ok(await page.locator('body').isVisible());
  console.log('PASS: parcours réellement ouvert et lu par journées hors connexion, données des 33 jours, Bible et Traité disponibles');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
