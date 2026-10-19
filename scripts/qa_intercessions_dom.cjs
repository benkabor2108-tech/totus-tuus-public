/* Recette d'intégration réelle des 108 combinaisons catégorie/jour. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');
const html=`<!doctype html><html><body>
<select id="intention-choice"></select>
<textarea id="intention-detail"></textarea>
<input id="intention-start" type="date">
<div id="intention-prayer"></div><div id="intention-days"></div>
<button id="intention-prev"></button><button id="intention-next"></button>
<button id="intention-done"></button>
<div id="intention-day-info"></div><div id="intention-status"></div>
</body></html>`;
const base=fs.readFileSync('site/interventions.js','utf8');
const enriched=fs.readFileSync('site/intercession-prayers.js','utf8');
const ids=['sante','famille','couple','enfants','travail','paix','foi','decision','deuil','reconciliation','vocation','epreuve'];
const tick=()=>new Promise(resolve=>setTimeout(resolve,0));
async function main(){
const dom=new JSDOM(html,{url:'https://example.test/totus-tuus-public/',runScripts:'outside-only'});
const w=dom.window;
w.eval(base);
w.eval(enriched);
const $=id=>w.document.getElementById(id);
assert.equal($('intention-choice').options.length,12);
const signatures=new Set();
for(const id of ids){
$('intention-choice').value=id;
$('intention-choice').dispatchEvent(new w.Event('change',{bubbles:true}));
await tick();
for(let day=0;day<9;day++){
$('intention-days').querySelectorAll('button')[day].click();
await tick();
const root=$('intention-prayer');
const h=[...root.querySelectorAll('h4')].find(x=>x.textContent.trim()==='Prière d’intercession');
assert(h,'Prière absente '+id+'/'+day);
const p=h.nextElementSibling;
assert.equal(p.dataset.intercessionEnriched,'1',id+'/'+day);
assert(p.textContent.length>450,'Prière trop courte '+id+'/'+day);
assert(p.textContent.includes('saint Jean-Paul II'),id+'/'+day);
assert(p.textContent.includes('Très Sainte Vierge Marie'),id+'/'+day);
assert(p.textContent.includes('Par Jésus, le Christ'),id+'/'+day);
assert(!p.textContent.includes('II, Donne'),id+'/'+day);
assert(!p.textContent.includes('II, Accorde'),id+'/'+day);
const signature=p.textContent;
assert(!signatures.has(signature),'Prière identique '+id+'/'+day);
signatures.add(signature);
}
}
assert.equal(signatures.size,108);
$('intention-choice').value='enfants';
$('intention-choice').dispatchEvent(new w.Event('change'));
$('intention-detail').value='Une intention privée pour la recette';
$('intention-detail').dispatchEvent(new w.Event('input'));
await tick();
assert($('intention-prayer').textContent.includes('Une intention privée pour la recette'));
$('intention-done').click();
const saved=w.localStorage.getItem('totus-intercession-v51');
assert(saved&&saved.includes('Une intention privée pour la recette'));
assert(JSON.parse(saved).done.enfants.includes(0));
const second=new JSDOM(html,{url:'https://example.test/totus-tuus-public/',runScripts:'outside-only'});
second.window.localStorage.setItem('totus-intercession-v51',saved);
second.window.eval(base);
second.window.eval(enriched);
await tick();
assert.equal(second.window.document.getElementById('intention-detail').value,'Une intention privée pour la recette');
assert(second.window.document.getElementById('intention-prayer').textContent.includes('Une intention privée pour la recette'));
assert(second.window.document.getElementById('intention-day-info').textContent.includes('1 jour(s)'));
console.log('PASS : 108 prières uniques, 12 catégories, 9 jours, rendu DOM, navigation, données conservées après rechargement.');
dom.window.close();second.window.close();
}
main().catch(e=>{console.error(e);process.exit(1)});
