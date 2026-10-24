const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   localStorage.setItem('totus-tuus-parcours-marial-33-v1',JSON.stringify({'1':true,'2':true}));
   localStorage.removeItem('totus-tuus-parcours-marial-33-preview-rc7');
  });
  await page.goto('http://127.0.0.1:8765/',{waitUntil:'domcontentloaded'});
  await page.locator('.tt33-cover').evaluate(el=>el.click());
  await page.locator('#tt33-day-scroll').waitFor({timeout:20000});
  assert.match(await page.locator('#tt33-content').innerText(),/0 \/ 33/);
  assert.equal(await page.locator('#tt33-day').inputValue(),'0');
  assert.equal(await page.locator('.tt33-day-section').count(),5);
  const text=await page.locator('#tt33-day-scroll').innerText();
  for(const part of ['Invocation au Saint-Esprit','Amen.','Parole de Dieu','Méditation','Traité de la vraie dévotion','Prière du jour'])assert.ok(text.includes(part),'Section absente : '+part);
  assert.match(text,/Gabriel/);
  assert.match(text,/26/);
  const layout=await page.evaluate(()=>{
   const el=document.querySelector('#tt33-day-scroll');
   return {scrollable:el.scrollHeight>el.clientHeight,overflow:getComputedStyle(el).overflowY};
  });
  assert.ok(layout.scrollable&&layout.overflow==='auto','Lecture verticale non défilante');
  const doneBox=await page.locator('.tt33-check').boundingBox();
  const resetBox=await page.locator('#tt33-reset').boundingBox();
  assert.ok(doneBox&&resetBox&&doneBox.height>=48&&resetBox.height>=44,'Zones tactiles trop petites');
  assert.ok(resetBox.y-doneBox.y-doneBox.height>=12,'Validation et réinitialisation trop rapprochées');
  // La consultation des autres journées ne change pas la progression.
  await page.locator('#tt33-day').selectOption('32');
  assert.match(await page.locator('#tt33-day-scroll').innerText(),/Corinthiens|Co 11/);
  assert.match(await page.locator('#tt33-content').innerText(),/0 \/ 33/);
  await page.locator('#tt33-forward').isDisabled();
  await page.locator('#tt33-day').selectOption('1');
  await page.locator('#tt33-done').click();
  assert.equal(await page.locator('#tt33-day').inputValue(),'0','Une coche hors ordre doit revenir au jour 1');
  assert.match(await page.locator('#tt33-content').innerText(),/0 \/ 33/);
  await page.locator('#tt33-done').click();
  assert.equal(await page.locator('#tt33-day').inputValue(),'1','Validation du jour 1 doit ouvrir le jour 2');
  assert.match(await page.locator('#tt33-content').innerText(),/1 \/ 33/);
  await page.locator('#tt33-close').click();
  await page.locator('.tt33-cover').evaluate(el=>el.click());
  assert.equal(await page.locator('#tt33-day').inputValue(),'1');
  let promptSeen=false;
  page.once('dialog',async dialog=>{promptSeen=true;await dialog.dismiss();});
  await page.locator('#tt33-reset').click();
  assert.ok(promptSeen,'Confirmation avant réinitialisation absente');
  assert.match(await page.locator('#tt33-content').innerText(),/1 \/ 33/);
  await page.locator('#tt33-smaller').click();
  await page.locator('#tt33-larger').click();
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('totus-tuus-parcours-marial-33-preview-rc7')||'{}'));
  assert.equal(saved['1'],true,'Progression perdue');
  assert.equal(errors.length,0,'Erreurs JavaScript : '+errors.join('; '));
  console.log('PASS: 33 jours en lecture verticale, cinq sections, progression et sécurité des boutons');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
