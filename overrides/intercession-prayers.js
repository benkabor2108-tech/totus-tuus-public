/* Candidat non publié : enrichissement spirituel des 108 prières d'intercession.
   Conserve les méditations, demandes spécifiques, choix et données locales existants. */
(() => {
'use strict';
const openings={
sante:'Seigneur Jésus, toi qui t’es approché des malades avec compassion, visite ceux dont le corps ou le cœur souffre.',
famille:'Père de miséricorde, entre dans nos maisons et apprends-nous la patience, le dialogue et le respect.',
couple:'Seigneur, source de l’amour fidèle, bénis les époux et ceux qui construisent ensemble leur avenir.',
enfants:'Père plein de tendresse, tu connais chaque enfant et chaque jeune par son nom. Veille sur leur croissance.',
travail:'Dieu de providence, regarde les personnes qui cherchent un travail digne et les foyers éprouvés par le manque.',
paix:'Prince de la paix, entends le cri des familles frappées par la violence, notamment au Burkina Faso.',
foi:'Seigneur Jésus, réveille en nous le désir de te connaître, de te suivre et de vivre selon ton Évangile.',
decision:'Esprit Saint, lumière des cœurs, éclaire nos choix et libère-nous de la peur comme de la précipitation.',
deuil:'Dieu de toute consolation, reçois nos larmes et soutiens les cœurs blessés par l’absence.',
reconciliation:'Père de miséricorde, tu vois les blessures, les fautes et les silences qui séparent les personnes.',
vocation:'Seigneur, tu appelles chacun à aimer et à servir. Rends nos cœurs attentifs à ta voix.',
epreuve:'Seigneur Jésus, toi qui as connu l’angoisse, demeure auprès de ceux qui traversent une épreuve.'
};
const endings={
sante:'Soutiens les soignants et les proches. Donne aux malades des soins adaptés, du réconfort et une espérance qui ne dépend pas d’une guérison promise.',
famille:'Fais de nos foyers des lieux sûrs où chacun puisse être écouté, protégé et aimé.',
couple:'Fortifie la fidélité, la tendresse et la sécurité ; que le pardon ne fasse jamais oublier la vérité ni le respect.',
enfants:'Guide les parents et les éducateurs ; protège les plus vulnérables et ouvre aux jeunes un avenir juste.',
travail:'Ouvre des chemins de solidarité et d’activité honnête ; préserve chacun de la honte et du découragement.',
paix:'Protège les populations civiles, console les victimes et soutiens les artisans de justice et de réconciliation.',
foi:'Accorde-nous la joie de la conversion, le courage de pardonner et la fidélité dans les petites choses.',
decision:'Donne-nous de bons conseils, une conscience droite et le courage d’accomplir le bien.',
deuil:'Accueille nos défunts dans ta miséricorde et fais grandir en nous l’espérance de la Résurrection.',
reconciliation:'Conduis-nous vers une paix fondée sur la vérité, la justice et le respect des limites nécessaires.',
vocation:'Bénis les vocations au mariage, au sacerdoce, à la vie consacrée et au service du prochain.',
epreuve:'Fais surgir des secours concrets et donne-nous la force d’avancer un jour après l’autre.'
};
const journey=[
'En ce premier jour, nous déposons humblement cette intention devant toi. Apprends-nous à accueillir ta présence.',
'En ce deuxième jour, nous te remettons nos fardeaux. Accorde-nous le repos intérieur et la force de demander de l’aide.',
'En ce troisième jour, avec Marie à l’Annonciation, apprends-nous à accueillir ta volonté dans la confiance.',
'En ce quatrième jour, avec Marie à Cana, rends-nous attentifs à Jésus et courageux pour accomplir sa parole.',
'En ce cinquième jour, lorsque l’attente se prolonge, garde-nous patients dans l’épreuve et fidèles à la prière.',
'En ce sixième jour, fais descendre ta paix dans nos pensées, nos paroles et nos gestes envers les autres.',
'En ce septième jour, apprends-nous à persévérer sans nous décourager, même lorsque le chemin reste obscur.',
'En ce huitième jour, nous te confions notre avenir. Éclaire le prochain pas et apaise nos inquiétudes.',
'En ce neuvième jour, nous te rendons grâce pour ta présence fidèle et pour les fruits de cette neuvaine.'
];
const root=document.getElementById('intention-prayer');
const choice=document.getElementById('intention-choice');
if(!root||!choice)return;
let busy=false;
function enhance(){
if(busy)return;
const key=choice.value;
if(!openings[key])return;
const heading=[...root.querySelectorAll('h4')].find(e=>e.textContent.trim()==='Prière d’intercession');
if(!heading)return;
const prayer=heading.nextElementSibling;
if(!prayer||prayer.tagName!=='P'||prayer.dataset.intercessionEnriched==='1')return;
const match=root.querySelector('.eyebrow')?.textContent.match(/JOUR\s+(\d+)\s*\/\s*9/i);
const day=match?Number(match[1])-1:-1;
if(day<0||day>8)return;
const original=prayer.textContent.trim();
if(!original.startsWith('Père très bon, nous te confions '))return;
const closing=' Que ton Esprit nous guide dans les actes que nous pouvons poser aujourd’hui. Par Jésus, le Christ, notre Seigneur. Amen.';
const middle=(original.endsWith(closing)?original.slice(0,-closing.length):original)
.replace(/(Par l’intercession de saint Jean-Paul II, )([A-ZÀÂÉÈÊÎÏÔÙÛÜ])/u,(_,prefix,letter)=>prefix+letter.toLocaleLowerCase('fr-FR'));
busy=true;
prayer.textContent=[
openings[key],
journey[day],
middle,
endings[key],
'Très Sainte Vierge Marie, accompagne notre supplication et conduis-nous à Jésus. Donne-nous, Seigneur, de faire aujourd’hui le bien qui dépend de nous et de recevoir avec confiance ce qui nous dépasse. Par Jésus, le Christ, notre Seigneur. Amen.'
].join(' ');
prayer.dataset.intercessionEnriched='1';
busy=false;
}
const observer=new MutationObserver(enhance);
observer.observe(root,{childList:true,subtree:false});
choice.addEventListener('change',()=>queueMicrotask(enhance));
enhance();
})();