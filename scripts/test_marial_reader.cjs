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
  // Une seule référence biblique par journée, même si les versets sont regroupés en plusieurs fragments.
  await page.locator('#tt33-day').selectOption('1');
  const bibleSection=page.locator('.tt33-day-section').nth(1);
  assert.equal(await bibleSection.locator('h3').count(),1,'Le titre biblique doit apparaître une seule fois');
  assert.match(await bibleSection.locator('h3').innerText(),/Jn 2,1-11/);
  const bibleText=await bibleSection.innerText();
  assert.equal((bibleText.match(/Parole de Dieu/g)||[]).length,1,'Répétition du titre au milieu des versets');
  for(const n of ['1','7','11'])assert.ok(bibleText.includes(n),'Verset manquant : '+n);
  await page.locator('#tt33-day').selectOption('0');
  assert.match(text,/Gabriel/);
  assert.match(text,/26/);
  const layout=await page.evaluate(()=>{
   const el=document.querySelector('#tt33-day-scroll');
   return {scrollable:el.scrollHeight>el.clientHeight,overflow:getComputedStyle(el).overflowY};
  });
  assert.ok(layout.scrollable&&layout.overflow==='auto','Lecture verticale non défilante');
  const doneBox=await page.locator('.tt33-check').boundingBox();
  const options=page.locator('.tt33-reset-options');
  assert.equal(await options.getAttribute('open'),null,'Réinitialisation doit rester repliée');
  await options.locator('summary').click();
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
  await page.locator('.tt33-reset-options summary').click();
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
