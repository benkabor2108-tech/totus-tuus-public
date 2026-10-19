/* Candidat non publié : enrichissement spirituel des 108 prières d'intercession.
   Conserve les méditations, demandes spécifiques, choix et données locales existants. */
(() => {
'use strict';
const openings={
sante:'Père très bon, par Jésus qui s’est approché des malades avec compassion, visite ceux dont le corps ou le cœur souffre.',
famille:'Père de miséricorde, entre dans nos maisons et apprends-nous la patience, le dialogue et le respect.',
couple:'Seigneur, source de l’amour fidèle, bénis les époux et ceux qui construisent ensemble leur avenir.',
enfants:'Père plein de tendresse, tu connais chaque enfant et chaque jeune par son nom. Veille sur leur croissance.',
travail:'Dieu de providence, regarde les personnes qui cherchent un travail digne et les foyers éprouvés par le manque.',
paix:'Père de toute paix, par Jésus ton Fils, entends le cri des familles frappées par la violence, notamment au Burkina Faso.',
foi:'Père très saint, réveille en nous le désir de connaître Jésus, de le suivre et de vivre selon son Évangile.',
decision:'Père de lumière, envoie ton Esprit Saint pour éclairer nos choix et nous libérer de la peur comme de la précipitation.',
deuil:'Dieu de toute consolation, reçois nos larmes et soutiens les cœurs blessés par l’absence.',
reconciliation:'Père de miséricorde, tu vois les blessures, les fautes et les silences qui séparent les personnes.',
vocation:'Seigneur, tu appelles chacun à aimer et à servir. Rends nos cœurs attentifs à ta voix.',
epreuve:'Père plein de bonté, par Jésus qui a connu l’angoisse, demeure auprès de ceux qui traversent une épreuve.'
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
const daily={
  "sante": [
    "Regarde les personnes qui attendent un diagnostic : dans l’incertitude, entoure-les de ta présence et de proches attentifs.",
    "Donne aux malades le courage d’exprimer leur douleur et de recevoir des soins sans se sentir diminués.",
    "Soutiens les familles qui accompagnent un proche souffrant ; apprends-leur la douceur, la patience et le repos nécessaire.",
    "Éclaire les médecins et les soignants dans leurs décisions ; rends leurs gestes compétents et profondément humains.",
    "Quand la guérison tarde, protège les cœurs du découragement et ouvre des chemins de soutien.",
    "Accorde la paix intérieure à ceux que la maladie prive de sommeil, de forces ou de projets.",
    "Visite les personnes isolées, âgées ou oubliées ; inspire-nous une présence fidèle et des gestes concrets.",
    "Aide-nous à accueillir les limites du corps sans perdre la dignité ni le goût de la vie.",
    "Nous te rendons grâce pour toute aide reçue ; garde notre espérance vivante, quelle que soit l’issue."
  ],
  "famille": [
    "Visite notre foyer et révèle à chacun qu’il a sa place et sa dignité dans la famille.",
    "Apprends-nous à écouter avant de répondre, surtout lorsque les paroles sont devenues difficiles.",
    "Donne aux parents la patience d’éduquer avec fermeté et tendresse, sans blesser les enfants.",
    "Répare les liens fragilisés par l’éloignement et ouvre des chemins de dialogue respectueux.",
    "Console les membres de nos familles qui portent seuls une inquiétude ou une responsabilité.",
    "Libère nos maisons de la violence et de l’humiliation ; inspire les démarches qui mettent chacun en sécurité.",
    "Fais grandir la reconnaissance pour les services discrets, les sacrifices et les gestes d’amour.",
    "Apprends-nous à demander pardon sincèrement et à réparer, autant que possible, le mal commis.",
    "Que notre famille devienne un lieu d’accueil, de partage et de prière, ouvert à ceux qui souffrent."
  ],
  "couple": [
    "Apprends-nous à recevoir l’autre avec gratitude, sans vouloir le façonner à notre image.",
    "Quand les incompréhensions surgissent, donne-nous des paroles vraies, calmes et respectueuses.",
    "Fortifie la fidélité quotidienne, faite de petits gestes, d’écoute et de décisions responsables.",
    "Soutiens les couples éprouvés par la distance, la maladie ou les difficultés matérielles.",
    "Éclaire ceux qui envisagent un engagement ; qu’ils discernent librement, dans la vérité et la paix.",
    "Protège toute personne exposée à la domination ou à la violence ; ouvre-lui un chemin sûr.",
    "Apprends aux époux à se pardonner sans banaliser les blessures ni renoncer à la justice.",
    "Fais grandir la tendresse, la joie du dialogue et le souci du bien de chacun.",
    "Nous te rendons grâce pour l’amour reçu ; aide-nous à le faire mûrir dans la fidélité et le service."
  ],
  "enfants": [
    "Veille sur les tout-petits, les enfants sans protection et ceux qui manquent d’affection.",
    "Donne aux parents et aux éducateurs un regard juste, patient et attentif aux besoins de chacun.",
    "Protège les enfants contre les abus, l’exploitation et toute forme de violence ; suscite des adultes responsables.",
    "Éclaire les jeunes dans leurs amitiés et leurs choix, pour qu’ils reconnaissent ce qui fait grandir.",
    "Accompagne ceux qui peinent à l’école ou cherchent leur voie ; garde-les de la honte et du découragement.",
    "Soutiens les jeunes blessés par la solitude, la peur ou le rejet ; mets sur leur route des personnes de confiance.",
    "Fais grandir en eux le désir de la vérité, de la prière et du service des autres.",
    "Bénis leurs projets et leurs talents ; ouvre-leur des occasions d’apprendre et de construire la paix.",
    "Nous te confions leur avenir : qu’ils deviennent des femmes et des hommes libres, responsables et généreux."
  ],
  "travail": [
    "Regarde ceux qui cherchent un emploi depuis longtemps ; préserve leur courage et leur dignité.",
    "Éclaire les démarches, les entretiens et les rencontres ; ouvre des portes justes et honnêtes.",
    "Soutiens les travailleurs épuisés, précaires ou maltraités ; suscite des conditions de travail respectueuses.",
    "Donne aux responsables la droiture dans leurs décisions et le souci des personnes les plus fragiles.",
    "Console les familles qui ne parviennent pas à satisfaire leurs besoins essentiels ; inspire la solidarité.",
    "Apprends-nous à gérer avec sagesse les ressources reçues, sans céder au désespoir ni à l’avidité.",
    "Fortifie les personnes qui entreprennent ou se forment ; donne-leur patience et persévérance.",
    "Ouvre nos yeux sur ceux qui ont besoin d’un soutien concret, d’un conseil ou d’une occasion de travailler.",
    "Nous te rendons grâce pour le pain partagé ; fais grandir en nous la justice et la générosité."
  ],
  "paix": [
    "Accueille les cris des victimes de violence et des familles déplacées ; ne les laisse pas seules.",
    "Protège les enfants, les personnes âgées et tous ceux qui vivent dans la peur quotidienne.",
    "Console les familles endeuillées et accompagne les blessés sur le chemin de la guérison.",
    "Éclaire les responsables afin qu’ils recherchent la justice, la protection des civils et le bien commun.",
    "Fortifie les personnes qui secourent, soignent et accueillent au péril de leur sécurité.",
    "Désarme les cœurs habités par la haine et ouvre des chemins de dialogue sans nier la vérité.",
    "Donne aux communautés la force de refuser la vengeance et de protéger les plus vulnérables.",
    "Bénis les artisans de réconciliation ; que leurs paroles deviennent des engagements concrets.",
    "Fais de nous des serviteurs de paix dans nos familles, nos quartiers et notre pays."
  ],
  "foi": [
    "Réveille en nous la soif de ta Parole et le désir de te rencontrer dans la prière.",
    "Quand le doute nous traverse, apprends-nous à chercher humblement plutôt qu’à nous fermer.",
    "Éclaire notre conscience afin que notre foi transforme réellement nos décisions.",
    "Donne-nous le courage de reconnaître nos fautes et d’accueillir ta miséricorde.",
    "Ramène vers toi ceux qui se sentent loin de l’Église ou blessés dans leur chemin de foi.",
    "Fais grandir en nous l’amour de l’Eucharistie, de la réconciliation et de la vie fraternelle.",
    "Apprends-nous à témoigner sans juger, avec respect, douceur et vérité.",
    "Soutiens notre fidélité dans les jours ordinaires, lorsque la ferveur sensible disparaît.",
    "Que notre conversion porte des fruits visibles de charité, de justice et de paix."
  ],
  "decision": [
    "Dans la confusion, apprends-nous à nommer avec vérité ce qui nous inquiète.",
    "Libère-nous des pressions qui empêchent une décision libre et responsable.",
    "Donne-nous l’humilité d’écouter les personnes sages et compétentes.",
    "Apprends-nous à distinguer nos désirs immédiats du bien durable.",
    "Éclaire les conséquences de nos choix pour notre famille et pour les plus fragiles.",
    "Quand plusieurs chemins semblent possibles, garde-nous de la précipitation.",
    "Donne-nous le courage de renoncer à une voie injuste, même si elle paraît facile.",
    "Accorde-nous la paix nécessaire pour poser un premier acte juste.",
    "Que nos décisions servent la vérité, la dignité humaine et ta volonté d’amour."
  ],
  "deuil": [
    "Reçois nos larmes et le poids du silence laissé par ceux qui nous ont quittés.",
    "Console ceux qui n’ont pas pu dire adieu et portent des paroles inachevées.",
    "Entoure les familles endeuillées d’une présence discrète, fidèle et respectueuse.",
    "Quand les souvenirs réveillent la douleur, aide-nous à les accueillir sans crainte.",
    "Soutiens les personnes dont le deuil s’accompagne de solitude ou de difficultés matérielles.",
    "Dans la nuit du manque, rappelle-nous la promesse de la Résurrection du Christ.",
    "Apprends-nous à honorer nos défunts par la prière et par des gestes d’amour.",
    "Donne-nous la liberté de retrouver peu à peu la joie sans trahir leur mémoire.",
    "Confie nos défunts à ta miséricorde et conduis les vivants sur un chemin d’espérance."
  ],
  "reconciliation": [
    "Montre-nous avec douceur la vérité sur nos paroles, nos actes et nos blessures.",
    "Libère-nous de la rancune qui consume le cœur sans nous demander de nier le mal subi.",
    "Donne-nous le courage de demander pardon lorsque nous avons blessé quelqu’un.",
    "Apprends-nous à écouter la souffrance de l’autre sans nous justifier trop vite.",
    "Éclaire les démarches de réparation et les gestes concrets qui rendent la confiance possible.",
    "Protège ceux qui doivent poser des limites pour préserver leur dignité et leur sécurité.",
    "Fais grandir en nous la patience : certaines blessures demandent du temps et un accompagnement.",
    "Conduis-nous vers une paix juste, sans contrainte, sans humiliation et sans mensonge.",
    "Que ton pardon nous transforme et nous rende artisans de miséricorde autour de nous."
  ],
  "vocation": [
    "Rends-nous attentifs à l’appel discret que tu déposes au fond de chaque vie.",
    "Libère-nous de la peur de ne pas être à la hauteur de la mission reçue.",
    "Éclaire les jeunes qui cherchent leur chemin et ceux qui les accompagnent.",
    "Apprends-nous à discerner nos dons dans la prière, le service et l’écoute.",
    "Soutiens les époux dans leur vocation à l’amour fidèle et à la vie familiale.",
    "Fortifie les prêtres, les personnes consacrées et ceux qui se préparent à te servir.",
    "Bénis les laïcs engagés dans l’Église et dans la société, au service du bien commun.",
    "Donne-nous la liberté de répondre oui sans rechercher les honneurs ni la facilité.",
    "Que notre vie entière devienne une réponse d’amour à ton appel."
  ],
  "epreuve": [
    "Dans l’inquiétude, rappelle-nous que nous pouvons venir à toi sans cacher notre fatigue.",
    "Quand les forces manquent, envoie des personnes capables d’écouter et de secourir.",
    "Protège-nous du désespoir et aide-nous à reconnaître les ressources encore possibles.",
    "Quand une injustice nous atteint, soutiens notre dignité et notre recherche de vérité.",
    "Donne-nous la patience de traverser un jour à la fois ce que nous ne pouvons résoudre aussitôt.",
    "Apprends-nous à recevoir l’aide des proches et des professionnels lorsque nous en avons besoin.",
    "Dans les nuits de solitude, garde notre cœur ouvert à ta présence et à l’espérance.",
    "Éclaire le prochain pas concret que nous pouvons accomplir aujourd’hui.",
    "Nous te rendons grâce de ne pas nous abandonner ; transforme notre épreuve en compassion pour les autres."
  ]
};

const saintPetitions={
sante:'Présentez au Seigneur les malades, leurs proches et ceux qui les soignent ; obtenez-leur la consolation, des secours adaptés et le courage de chaque jour.',
famille:'Présentez au Seigneur nos familles ; demandez pour elles la paix, le respect, la patience et la protection des plus fragiles.',
couple:'Présentez au Seigneur les couples ; demandez pour eux la fidélité, le dialogue vrai et un amour qui respecte la liberté de chacun.',
enfants:'Présentez au Seigneur les enfants et les jeunes ; demandez pour eux protection, discernement, affection et des éducateurs attentifs.',
travail:'Présentez au Seigneur ceux qui cherchent un travail et ceux qui peinent à vivre ; demandez pour eux des occasions justes et la solidarité.',
paix:'Présentez au Seigneur les victimes de la violence et les familles déplacées, particulièrement au Burkina Faso ; demandez justice, protection et paix.',
foi:'Présentez au Seigneur ceux dont la foi vacille ; demandez la grâce d’une rencontre vivante avec Jésus et d’une conversion sincère.',
decision:'Présentez au Seigneur nos décisions difficiles ; demandez la lumière de l’Esprit Saint, de bons conseils et la liberté de choisir le bien.',
deuil:'Présentez au Seigneur les personnes endeuillées et nos défunts ; demandez consolation pour les vivants et miséricorde pour ceux qui nous ont quittés.',
reconciliation:'Présentez au Seigneur nos relations blessées ; demandez la vérité, le pardon, la réparation et la sécurité des personnes.',
vocation:'Présentez au Seigneur ceux qui cherchent leur vocation ; demandez la liberté du cœur et la joie de répondre à son appel.',
epreuve:'Présentez au Seigneur ceux qui traversent une épreuve ; demandez des secours concrets, la persévérance et la paix du cœur.'
};
const finalPetitions={
sante:'Nous te confions les malades et leurs proches : que personne ne manque de soins, de présence et d’espérance.',
famille:'Nous te confions nos familles : fais grandir le dialogue, la protection et la tendresse dans nos foyers.',
couple:'Nous te confions les couples : fortifie leur fidélité et leur respect mutuel.',
enfants:'Nous te confions les enfants et les jeunes : garde-les du mal et aide-les à grandir dans la vérité et l’amour.',
travail:'Nous te confions ceux qui cherchent un travail : ouvre des chemins dignes et inspire la solidarité.',
paix:'Nous te confions les victimes de la violence : protège les innocents et fais grandir la justice et la paix.',
foi:'Nous te confions notre foi : conduis-nous à Jésus et rends notre charité plus vraie.',
decision:'Nous te confions nos choix : éclaire notre conscience et conduis-nous sur le chemin du bien.',
deuil:'Nous te confions nos défunts et ceux qui pleurent : accueille-les dans ta miséricorde et soutiens notre espérance.',
reconciliation:'Nous te confions nos blessures : guide-nous vers la vérité, le pardon et une paix juste.',
vocation:'Nous te confions nos vocations : apprends-nous à répondre avec liberté et générosité.',
epreuve:'Nous te confions nos épreuves : donne-nous la force d’aujourd’hui et des personnes pour nous soutenir.'
};
function replacePrayer(heading,body,marker,content){
if(!heading)return false;
const p=heading.nextElementSibling;
if(!p||p.tagName!=='P'||p.dataset[marker]==='1')return false;
p.textContent=content;
p.dataset[marker]='1';
return true;
}
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
if(!prayer||prayer.tagName!=='P')return;
const match=root.querySelector('.eyebrow')?.textContent.match(/JOUR\s+(\d+)\s*\/\s*9/i);
const day=match?Number(match[1])-1:-1;
if(day<0||day>8)return;
const original=prayer.textContent.trim();
if(!original.startsWith('Père très bon, nous te confions '))return;
const closing=' Que ton Esprit nous guide dans les actes que nous pouvons poser aujourd’hui. Par Jésus, le Christ, notre Seigneur. Amen.';
const middle=(original.endsWith(closing)?original.slice(0,-closing.length):original)
.replace(/(Par l’intercession de saint Jean-Paul II, )([A-ZÀÂÉÈÊÎÏÔÙÛÜ])/u,(_,prefix,letter)=>prefix+letter.toLocaleLowerCase('fr-FR'));
busy=true;
if(prayer.dataset.intercessionEnriched!=='1')prayer.textContent=[
openings[key],
journey[day],
daily[key][day],
middle,
endings[key],
'Très Sainte Vierge Marie, accompagne notre supplication et conduis-nous à Jésus. Donne-nous, Seigneur, de faire aujourd’hui le bien qui dépend de nous et de recevoir avec confiance ce qui nous dépasse. Par Jésus, le Christ, notre Seigneur. Amen.'
].join(' ');
prayer.dataset.intercessionEnriched='1';
const headings=[...root.querySelectorAll('h4')];
const saint=headings.find(e=>/Prière à saint Jean-Paul II/i.test(e.textContent));
if(saint&&saint.nextElementSibling&&saint.nextElementSibling.nextElementSibling?.tagName==='P')saint.nextElementSibling.nextElementSibling.remove();
replacePrayer(saint,null,'saintAdapted',[
'Saint Jean-Paul II, témoin fidèle de Jésus-Christ et serviteur de la Vierge Marie, vous avez porté dans votre prière les familles, les malades, les jeunes et tous ceux qui souffrent.',
'En ce jour '+(day+1)+' de notre neuvaine, nous vous confions particulièrement cette intention.',
saintPetitions[key],
'Intercédez pour nous auprès de Dieu. Aidez-nous à écouter sa Parole, à poser des actes justes et à accueillir sa volonté dans la confiance. Que notre prière nous conduise toujours plus profondément à Jésus-Christ. Amen.'
].join(' '));
const finale=headings.find(e=>/^(Acte de confiance|Prière finale|Prière de conclusion|Prière pour conclure|Prière de clôture)$/i.test(e.textContent.trim()));
replacePrayer(finale,null,'finalAdapted',[
'Père de bonté, nous te rendons grâce pour cette journée de prière.',
finalPetitions[key],
'Par l’intercession de saint Jean-Paul II et avec l’aide maternelle de la Vierge Marie, fais-nous avancer dans la foi, l’espérance et la charité.',
'Donne-nous d’accomplir aujourd’hui le bien qui dépend de nous et de te remettre avec confiance ce qui nous dépasse. Par Jésus, le Christ, notre Seigneur. Amen.'
].join(' '));
busy=false;
}
const observer=new MutationObserver(enhance);
observer.observe(root,{childList:true,subtree:false});
choice.addEventListener('change',()=>queueMicrotask(enhance));
enhance();
})();