const { chromium }=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   localStorage.setItem('totus-tuus-parcours-marial-33-v1',JSON.stringify({'1':true,'2':true,'3':true,'4':true,'5':true,'6':true}));
   localStorage.removeItem('totus-tuus-parcours-marial-33-preview-rc5');
  });
  await page.goto('http://127.0.0.1:8765/',{waitUntil:'domcontentloaded'});
  await page.locator('.tt33-cover').evaluate(el=>el.click());
  await page.locator('#tt33-page').waitFor({timeout:20000});
  assert.match(await page.locator('#tt33-page').innerText(),/Invocation au Saint-Esprit/);
  assert.match(await page.locator('#tt33-content').innerText(),/0 \/ 33/);
  assert.equal(await page.locator('#tt33-day').inputValue(),'0');
  assert.match(await page.locator('#tt33-page').innerText(),/Invocation au Saint-Esprit/);
  // Une coche hors ordre doit revenir au premier jour non accompli.
  await page.locator('#tt33-day').selectOption('1');
  await page.locator('#tt33-done').click();
  assert.equal(await page.locator('#tt33-day').inputValue(),'0');
  assert.match(await page.locator('#tt33-content').innerText(),/0 \/ 33/);
  // L'ouverture quotidienne reprend au premier jour non accompli,
  // toujours à l'invocation, et non à la dernière page feuilletée.
  await page.locator('#tt33-done').click();
  assert.equal(await page.locator('#tt33-day').inputValue(),'1');
  assert.match(await page.locator('#tt33-content').innerText(),/1 \/ 33/);
  await page.locator('#tt33-close').click();
  await page.locator('.tt33-cover').evaluate(el=>el.click());
  assert.match(await page.locator('#tt33-page').innerText(),/Invocation au Saint-Esprit/);
  assert.equal(await page.locator('#tt33-day').inputValue(),'1');
  await page.locator('#tt33-done').click();
  assert.equal(await page.locator('#tt33-day').inputValue(),'2');
  assert.match(await page.locator('#tt33-content').innerText(),/2 \/ 33/);
  await page.locator('#tt33-close').click();
  await page.locator('.tt33-cover').evaluate(el=>el.click());
  assert.equal(await page.locator('#tt33-day').inputValue(),'2');
  assert.match(await page.locator('#tt33-page').innerText(),/Invocation au Saint-Esprit/);
  // Repartir de 0/33 pour les contrôles de lecture indépendants.
  await page.evaluate(()=>localStorage.setItem('totus-tuus-parcours-marial-33-preview-rc5','{}'));
  await page.locator('#tt33-close').click();
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.tt33-cover').evaluate(el=>el.click());
  assert.equal(await page.locator('#tt33-day').inputValue(),'0');

  await page.locator('#tt33-forward').click();
  assert.match(await page.locator('#tt33-page').innerText(),/Invocation au Saint-Esprit/);
  await page.locator('#tt33-forward').click();
  assert.match(await page.locator('#tt33-page').innerText(),/Parole de Dieu/);
  assert.match(await page.locator('#tt33-page').innerText(),/Gabriel/);
  assert.match(await page.locator('#tt33-page').innerText(),/26/);
  await page.locator('#tt33-back').click();
  assert.match(await page.locator('#tt33-page').innerText(),/Invocation/);
  await page.locator('#tt33-day').selectOption('32');
  assert.match(await page.locator('#tt33-page').innerText(),/Invocation/);
  await page.locator('#tt33-forward').click();
  await page.locator('#tt33-forward').click();
  assert.match(await page.locator('#tt33-page').innerText(),/Corinthiens|Co 11/);
  await page.locator('#tt33-day').selectOption('0');
  await page.locator('#tt33-smaller').click();
  await page.locator('#tt33-larger').click();
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('totus-tuus-parcours-marial-33-preview-rc5')));
  assert.equal(Object.values(saved||{}).filter(Boolean).length,0);
  assert.equal(errors.length,0,'JavaScript errors: '+errors.join('; '));
  console.log('PASS: feuilletage, Bible Crampon, jours 1/33, taille, 0/33 initial conservé');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
