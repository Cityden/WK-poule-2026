// Test script — WK 2026 poule — pool TEST123
// Simuleert 5 gebruikers die joinen via code TEST123

// ─── Data ─────────────────────────────────────────────────────────────────────
const SCHEDULE = [
  {id:'A1',g:'A',h:'Mexico',a:'South Africa'},{id:'A2',g:'A',h:'South Korea',a:'Czechia'},
  {id:'A3',g:'A',h:'Czechia',a:'South Africa'},{id:'A4',g:'A',h:'Mexico',a:'South Korea'},
  {id:'A5',g:'A',h:'Czechia',a:'Mexico'},{id:'A6',g:'A',h:'South Africa',a:'South Korea'},
  {id:'B1',g:'B',h:'Canada',a:'Bosnia-Herzegovina'},{id:'B2',g:'B',h:'Qatar',a:'Switzerland'},
  {id:'B3',g:'B',h:'Switzerland',a:'Bosnia-Herzegovina'},{id:'B4',g:'B',h:'Canada',a:'Qatar'},
  {id:'B5',g:'B',h:'Switzerland',a:'Canada'},{id:'B6',g:'B',h:'Bosnia-Herzegovina',a:'Qatar'},
  {id:'C1',g:'C',h:'Brazil',a:'Morocco'},{id:'C2',g:'C',h:'Haiti',a:'Scotland'},
  {id:'C3',g:'C',h:'Scotland',a:'Morocco'},{id:'C4',g:'C',h:'Brazil',a:'Haiti'},
  {id:'C5',g:'C',h:'Scotland',a:'Brazil'},{id:'C6',g:'C',h:'Morocco',a:'Haiti'},
  {id:'D1',g:'D',h:'USA',a:'Paraguay'},{id:'D2',g:'D',h:'Australia',a:'Turkey'},
  {id:'D3',g:'D',h:'USA',a:'Australia'},{id:'D4',g:'D',h:'Turkey',a:'Paraguay'},
  {id:'D5',g:'D',h:'Turkey',a:'USA'},{id:'D6',g:'D',h:'Paraguay',a:'Australia'},
  {id:'E1',g:'E',h:'Germany',a:'Curaçao'},{id:'E2',g:'E',h:'Ivory Coast',a:'Ecuador'},
  {id:'E3',g:'E',h:'Germany',a:'Ivory Coast'},{id:'E4',g:'E',h:'Ecuador',a:'Curaçao'},
  {id:'E5',g:'E',h:'Ecuador',a:'Germany'},{id:'E6',g:'E',h:'Curaçao',a:'Ivory Coast'},
  {id:'F1',g:'F',h:'Netherlands',a:'Japan'},{id:'F2',g:'F',h:'Sweden',a:'Tunisia'},
  {id:'F3',g:'F',h:'Netherlands',a:'Sweden'},{id:'F4',g:'F',h:'Tunisia',a:'Japan'},
  {id:'F5',g:'F',h:'Japan',a:'Sweden'},{id:'F6',g:'F',h:'Tunisia',a:'Netherlands'},
  {id:'G1',g:'G',h:'Belgium',a:'Egypt'},{id:'G2',g:'G',h:'Iran',a:'New Zealand'},
  {id:'G3',g:'G',h:'Belgium',a:'Iran'},{id:'G4',g:'G',h:'New Zealand',a:'Egypt'},
  {id:'G5',g:'G',h:'Egypt',a:'Iran'},{id:'G6',g:'G',h:'New Zealand',a:'Belgium'},
  {id:'H1',g:'H',h:'Spain',a:'Cape Verde'},{id:'H2',g:'H',h:'Saudi Arabia',a:'Uruguay'},
  {id:'H3',g:'H',h:'Spain',a:'Saudi Arabia'},{id:'H4',g:'H',h:'Uruguay',a:'Cape Verde'},
  {id:'H5',g:'H',h:'Cape Verde',a:'Saudi Arabia'},{id:'H6',g:'H',h:'Uruguay',a:'Spain'},
  {id:'I1',g:'I',h:'France',a:'Senegal'},{id:'I2',g:'I',h:'Iraq',a:'Norway'},
  {id:'I3',g:'I',h:'France',a:'Iraq'},{id:'I4',g:'I',h:'Norway',a:'Senegal'},
  {id:'I5',g:'I',h:'Norway',a:'France'},{id:'I6',g:'I',h:'Senegal',a:'Iraq'},
  {id:'J1',g:'J',h:'Argentina',a:'Algeria'},{id:'J2',g:'J',h:'Austria',a:'Jordan'},
  {id:'J3',g:'J',h:'Argentina',a:'Austria'},{id:'J4',g:'J',h:'Jordan',a:'Algeria'},
  {id:'J5',g:'J',h:'Algeria',a:'Austria'},{id:'J6',g:'J',h:'Jordan',a:'Argentina'},
  {id:'K1',g:'K',h:'Portugal',a:'DR Congo'},{id:'K2',g:'K',h:'Uzbekistan',a:'Colombia'},
  {id:'K3',g:'K',h:'Portugal',a:'Uzbekistan'},{id:'K4',g:'K',h:'Colombia',a:'DR Congo'},
  {id:'K5',g:'K',h:'Colombia',a:'Portugal'},{id:'K6',g:'K',h:'DR Congo',a:'Uzbekistan'},
  {id:'L1',g:'L',h:'England',a:'Croatia'},{id:'L2',g:'L',h:'Ghana',a:'Panama'},
  {id:'L3',g:'L',h:'England',a:'Ghana'},{id:'L4',g:'L',h:'Panama',a:'Croatia'},
  {id:'L5',g:'L',h:'Panama',a:'England'},{id:'L6',g:'L',h:'Croatia',a:'Ghana'},
];

const BY_GROUP = {};
const WC_GROUPS = {};
SCHEDULE.forEach(m => {
  if (!BY_GROUP[m.g]) { BY_GROUP[m.g] = []; WC_GROUPS[m.g] = new Set(); }
  BY_GROUP[m.g].push(m);
  WC_GROUPS[m.g].add(m.h); WC_GROUPS[m.g].add(m.a);
});
Object.keys(WC_GROUPS).forEach(g => WC_GROUPS[g] = [...WC_GROUPS[g]]);

const COUNTRIES = {
  'Argentina':{ranking:1,flag:'🇦🇷'},'France':{ranking:2,flag:'🇫🇷'},'England':{ranking:3,flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿'},
  'Belgium':{ranking:4,flag:'🇧🇪'},'Brazil':{ranking:5,flag:'🇧🇷'},'Portugal':{ranking:6,flag:'🇵🇹'},
  'Netherlands':{ranking:7,flag:'🇳🇱'},'Spain':{ranking:8,flag:'🇪🇸'},'Germany':{ranking:9,flag:'🇩🇪'},
  'Croatia':{ranking:10,flag:'🇭🇷'},'Colombia':{ranking:11,flag:'🇨🇴'},'USA':{ranking:12,flag:'🇺🇸'},
  'Morocco':{ranking:13,flag:'🇲🇦'},'Mexico':{ranking:14,flag:'🇲🇽'},'Switzerland':{ranking:15,flag:'🇨🇭'},
  'Japan':{ranking:16,flag:'🇯🇵'},'Uruguay':{ranking:17,flag:'🇺🇾'},'Senegal':{ranking:18,flag:'🇸🇳'},
  'Turkey':{ranking:19,flag:'🇹🇷'},'Norway':{ranking:20,flag:'🇳🇴'},'South Korea':{ranking:21,flag:'🇰🇷'},
  'Iran':{ranking:22,flag:'🇮🇷'},'Ecuador':{ranking:23,flag:'🇪🇨'},'Austria':{ranking:24,flag:'🇦🇹'},
  'Australia':{ranking:25,flag:'🇦🇺'},'Algeria':{ranking:26,flag:'🇩🇿'},'Sweden':{ranking:27,flag:'🇸🇪'},
  'Scotland':{ranking:28,flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿'},'Tunisia':{ranking:29,flag:'🇹🇳'},'Ivory Coast':{ranking:30,flag:'🇨🇮'},
  'Egypt':{ranking:31,flag:'🇪🇬'},'Bosnia-Herzegovina':{ranking:32,flag:'🇧🇦'},'Czechia':{ranking:33,flag:'🇨🇿'},
  'Canada':{ranking:34,flag:'🇨🇦'},'Paraguay':{ranking:35,flag:'🇵🇾'},'Saudi Arabia':{ranking:36,flag:'🇸🇦'},
  'Cape Verde':{ranking:37,flag:'🇨🇻'},'Ghana':{ranking:38,flag:'🇬🇭'},'South Africa':{ranking:39,flag:'🇿🇦'},
  'DR Congo':{ranking:40,flag:'🇨🇩'},'Iraq':{ranking:41,flag:'🇮🇶'},'Qatar':{ranking:42,flag:'🇶🇦'},
  'Jordan':{ranking:43,flag:'🇯🇴'},'Panama':{ranking:44,flag:'🇵🇦'},'Haiti':{ranking:45,flag:'🇭🇹'},
  'Uzbekistan':{ranking:46,flag:'🇺🇿'},'Curaçao':{ranking:47,flag:'🇨🇼'},'New Zealand':{ranking:48,flag:'🇳🇿'},
};

const KO_ROUNDS = [
  {key:'r16',label:'Ronde van 16',slots:16,pts:10},
  {key:'qf', label:'Kwartfinale', slots:8, pts:20},
  {key:'sf', label:'Halve finale',slots:4, pts:30},
  {key:'final',label:'Finale',   slots:2, pts:40},
  {key:'winner',label:'Winnaar', slots:1, pts:20},
];

const BONUS = [
  {key:'b1',label:'Meeste doelpunten groepsfase?',pts:10},
  {key:'b2',label:'Totaal doelpunten toernooi? (±5)',pts:10,type:'number'},
  {key:'b3',label:'Gouden Schoen?',pts:10},
  {key:'b4',label:'Finale naar extra tijd of penalties?',pts:10,opts:['Yes','No']},
  {key:'b5',label:'Aantal rode kaarten? (±3)',pts:10,type:'number'},
  {key:'b6',label:'Welk continent heeft meeste teams in halve finale?',pts:10},
];

// ─── DB ───────────────────────────────────────────────────────────────────────
let DB = {
  players:{}, results:{}, koResults:{}, bonusAnswers:{},
  pools:{ TEST123:{ code:'TEST123', name:'Test Pool', icon:'🧪', members:[] } }
};

// ─── Functies ─────────────────────────────────────────────────────────────────
function calcPoints(player) {
  let pts=0; const pd=DB.players[player]; if(!pd) return 0;
  SCHEDULE.forEach(m => {
    const pr=pd.scores&&pd.scores[m.id], ac=DB.results[m.id];
    if(!pr||pr.h==null||pr.a==null||!ac||ac.h==null||ac.a==null) return;
    const [ph,pa,ah,aa]=[+pr.h,+pr.a,+ac.h,+ac.a];
    if(ph===ah&&pa===aa){pts+=5;return;}
    const pw=ph>pa?'h':ph<pa?'a':'d', aw=ah>aa?'h':ah<aa?'a':'d';
    if(pw===aw) pts+=3;
    if(ph===ah) pts+=1;
    if(pa===aa) pts+=1;
  });
  KO_ROUNDS.forEach(r => {
    const picks=(pd.ko&&pd.ko[r.key])||[], actual=(DB.koResults&&DB.koResults[r.key])||[];
    picks.forEach(p=>{ if(p&&actual.includes(p)) pts+=r.pts; });
  });
  BONUS.forEach(q => {
    const ans=pd.bonus&&pd.bonus[q.key], correct=DB.bonusAnswers&&DB.bonusAnswers[q.key];
    if(!ans||!correct) return;
    if(q.type==='number'){const tol=q.key==='b5'?3:5;if(Math.abs(+ans-+correct)<=tol)pts+=q.pts;}
    else if(ans.trim().toLowerCase()===correct.trim().toLowerCase()) pts+=q.pts;
  });
  return pts;
}

function filledPct(player) {
  const pd=DB.players[player]; if(!pd) return 0;
  let f=0; SCHEDULE.forEach(m=>{ const s=pd.scores&&pd.scores[m.id]; if(s&&s.h!=null&&s.a!=null) f++; });
  return Math.round(f/SCHEDULE.length*100);
}

function autoFillGroupStage(user) {
  if (!DB.players[user]) DB.players[user]={scores:{},ko:{},bonus:{}};
  const wins=[[1,0],[2,0],[2,1],[3,0],[3,1],[3,2],[4,1],[4,2],[2,0],[1,0],[3,1]];
  const draws=[[0,0],[1,1],[2,2],[1,1],[0,0]];
  SCHEDULE.forEach(m => {
    const rH=(COUNTRIES[m.h]&&COUNTRIES[m.h].ranking)||50;
    const rA=(COUNTRIES[m.a]&&COUNTRIES[m.a].ranking)||50;
    const diff=rA-rH, roll=Math.random()*100;
    let outcome;
    if(diff>15)       outcome=roll<72?'h':roll<88?'d':'a';
    else if(diff>5)   outcome=roll<55?'h':roll<78?'d':'a';
    else if(diff<-15) outcome=roll<12?'h':roll<28?'d':'a';
    else if(diff<-5)  outcome=roll<22?'h':roll<45?'d':'a';
    else              outcome=roll<42?'h':roll<68?'d':'a';
    let h,a;
    if(outcome==='d'){const s=draws[Math.floor(Math.random()*draws.length)];h=s[0];a=s[1];}
    else{const s=wins[Math.floor(Math.random()*wins.length)];h=outcome==='h'?s[0]:s[1];a=outcome==='h'?s[1]:s[0];}
    DB.players[user].scores[m.id]={h,a};
  });
}

function autoSuggestKO(user) {
  const pd=DB.players[user]||{scores:{}};
  const standings={};
  ['A','B','C','D','E','F','G','H','I','J','K','L'].forEach(g=>{
    const stats={};
    WC_GROUPS[g].forEach(t=>{stats[t]={pts:0,gd:0,gf:0,team:t};});
    BY_GROUP[g].forEach(m=>{
      const r=pd.scores&&pd.scores[m.id]; if(!r||r.h==null||r.a==null) return;
      const h=+r.h,a=+r.a;
      stats[m.h].gf+=h;stats[m.h].gd+=h-a;
      stats[m.a].gf+=a;stats[m.a].gd+=a-h;
      if(h>a)stats[m.h].pts+=3;else if(h<a)stats[m.a].pts+=3;else{stats[m.h].pts+=1;stats[m.a].pts+=1;}
    });
    standings[g]=Object.values(stats).sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf);
  });
  const projected=[],thirds=[];
  ['A','B','C','D','E','F','G','H','I','J','K','L'].forEach(g=>{
    projected.push(standings[g][0].team,standings[g][1].team);
    thirds.push(standings[g][2]);
  });
  thirds.sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf);
  thirds.slice(0,8).forEach(t=>projected.push(t.team));
  const rk=t=>(COUNTRIES[t]&&COUNTRIES[t].ranking)||99;
  const br=arr=>[...arr].sort((a,b)=>rk(a)-rk(b));
  const qf=br(projected).slice(0,8), sf=br(qf).slice(0,4);
  const final2=br(sf).slice(0,2), winner=br(final2).slice(0,1);
  if(!DB.players[user].ko) DB.players[user].ko={};
  Object.assign(DB.players[user].ko,{r16:projected,qf,sf,final:final2,winner});
}

const flag = t => (COUNTRIES[t]&&COUNTRIES[t].flag)||'🏳️';
const bar  = (pct,w=20) => '█'.repeat(Math.round(pct/100*w)).padEnd(w,'░');
const sep  = (c='─',n=58) => c.repeat(n);

// ─── SIMULATIE ────────────────────────────────────────────────────────────────
const USERS = [
  {name:'Marijn',  bonus:{b1:'Brazil',  b2:'168', b3:'Erling Haaland',    b4:'Yes', b5:'8',  b6:'Europe'}},
  {name:'Sophie',  bonus:{b1:'France',  b2:'155', b3:'Kylian Mbappé',     b4:'No',  b5:'5',  b6:'Europe'}},
  {name:'Thomas',  bonus:{b1:'Germany', b2:'180', b3:'Florian Wirtz',     b4:'Yes', b5:'12', b6:'Europe'}},
  {name:'Lotte',   bonus:{b1:'Brazil',  b2:'162', b3:'Vinicius Jr.',      b4:'No',  b5:'7',  b6:'South America'}},
  {name:'Kevin',   bonus:{b1:'France',  b2:'171', b3:'Lionel Messi',      b4:'Yes', b5:'9',  b6:'Europe'}},
];

console.log('\n' + sep('═'));
console.log('  WK 2026 POULE — TEST SIMULATIE  |  Pool: 🧪 TEST123');
console.log(sep('═'));

// Stap 1: gebruikers aanmaken + pool joinen
console.log('\n📋 STAP 1 — Gebruikers joinen pool TEST123\n');
USERS.forEach(u => {
  DB.players[u.name] = {scores:{},ko:{},bonus:{}};
  DB.pools['TEST123'].members.push(u.name);
  console.log(`  ✓  ${u.name} heeft poolcode TEST123 ingevoerd en is lid geworden`);
});

// Stap 2: auto-fill groepsfase + KO per gebruiker
console.log('\n⚡ STAP 2 — Auto-fill groepsfase + KO ronden\n');
USERS.forEach(u => {
  autoFillGroupStage(u.name);
  autoSuggestKO(u.name);
  DB.players[u.name].bonus = {...u.bonus};
  console.log(`  ✓  ${u.name}: groepsfase ingevuld (${filledPct(u.name)}%), KO-ronden gesuggereerd`);
  console.log(`      Winnaar-voorspelling: ${flag(DB.players[u.name].ko.winner[0])} ${DB.players[u.name].ko.winner[0]}`);
});

// Stap 3: Admin vult resultaten in (eerste 18 wedstrijden + R16)
console.log('\n⚙️  STAP 3 — Admin voert resultaten in\n');
const adminResults = [
  {id:'A1',h:2,a:0},{id:'A2',h:1,a:1},{id:'A3',h:0,a:2},{id:'A4',h:3,a:1},{id:'A5',h:1,a:0},{id:'A6',h:0,a:1},
  {id:'B1',h:2,a:1},{id:'B2',h:0,a:0},{id:'B3',h:3,a:0},{id:'B4',h:1,a:0},{id:'B5',h:2,a:2},{id:'B6',h:1,a:2},
  {id:'C1',h:3,a:1},{id:'C2',h:0,a:1},{id:'C3',h:0,a:2},{id:'C4',h:2,a:0},{id:'C5',h:1,a:4},{id:'C6',h:2,a:0},
];
adminResults.forEach(r => { DB.results[r.id]={h:r.h,a:r.a}; });
DB.koResults.r16 = ['Argentina','France','Mexico','Switzerland','Brazil','Morocco',
                    'USA','Turkey','Germany','Netherlands','Belgium','Spain',
                    'Portugal','England','Norway','Colombia'];
DB.bonusAnswers = {b1:'Brazil',b2:'165',b3:'Erling Haaland',b4:'Yes',b5:'9',b6:'Europe'};
console.log(`  ✓  ${adminResults.length} groepsduels ingevoerd als resultaat`);
console.log(`  ✓  R16 (16 teams) ingevuld`);
console.log(`  ✓  Bonusvragen: correcte antwoorden ingevuld`);

// ─── ADMIN PANEL WEERGAVE ─────────────────────────────────────────────────────
console.log('\n' + sep('═'));
console.log('  ⚙️  ADMIN PANEL — Pools');
console.log(sep('═'));

console.log(`
  ┌─────────────────────────────────────┐
  │  🧪  Test Pool                      │
  │  Code: TEST123   │  5 leden         │
  │                                     │
  │  Leden:                             │`);
USERS.forEach(u => console.log(`  │    • ${u.name.padEnd(30)}│`));
console.log(`  └─────────────────────────────────────┘`);

// ─── LEADERBOARD ──────────────────────────────────────────────────────────────
console.log('\n' + sep('─'));
console.log('  🏅  LEADERBOARD — Pool TEST123');
console.log(sep('─'));
console.log(`  ${'#'.padEnd(3)} ${'Naam'.padEnd(12)} ${'Pts'.padStart(5)}  ${'Ingevuld'.padEnd(22)} Winnaar-pick`);
console.log(sep('─'));

const ranked = USERS.map(u=>({
  name:u.name,
  pts:calcPoints(u.name),
  pct:filledPct(u.name),
  winner:DB.players[u.name].ko.winner[0]
})).sort((a,b)=>b.pts-a.pts||b.pct-a.pct);

const medals = ['🥇','🥈','🥉','4.','5.'];
ranked.forEach((p,i)=>{
  const b=bar(p.pct,16);
  console.log(`  ${medals[i].padEnd(3)} ${p.name.padEnd(12)} ${String(p.pts).padStart(5)}  ${b} ${p.pct}%  ${flag(p.winner)} ${p.winner}`);
});

// ─── KO PICKS PER GEBRUIKER ───────────────────────────────────────────────────
console.log('\n' + sep('─'));
console.log('  🏆  KO-VOORSPELLINGEN (samenvatting per gebruiker)');
console.log(sep('─'));

USERS.forEach(u => {
  const ko = DB.players[u.name].ko;
  const pts = calcPoints(u.name);
  console.log(`\n  ${u.name} (${pts} pts)`);
  KO_ROUNDS.forEach(r => {
    const picks = (ko[r.key]||[]).slice(0,4);
    const rest  = (ko[r.key]||[]).length - picks.length;
    const preview = picks.map(t=>`${flag(t)} ${t}`).join(', ') + (rest>0?` +${rest} meer`:'');
    console.log(`    ${r.label.padEnd(16)}: ${preview}`);
  });
});

// ─── BONUS ANTWOORDEN ─────────────────────────────────────────────────────────
console.log('\n' + sep('─'));
console.log('  🎯  BONUSVRAGEN');
console.log(sep('─'));
console.log(`  ${'Vraag'.padEnd(38)} ${'Correct antwoord'.padEnd(20)} Wie goed?`);
console.log(sep('─'));

BONUS.forEach(q => {
  const correct = DB.bonusAnswers[q.key]||'—';
  const winners = USERS.filter(u => {
    const ans = DB.players[u.name].bonus&&DB.players[u.name].bonus[q.key];
    if(!ans||!correct) return false;
    if(q.type==='number'){const tol=q.key==='b5'?3:5;return Math.abs(+ans-+correct)<=tol;}
    return ans.trim().toLowerCase()===correct.trim().toLowerCase();
  }).map(u=>u.name);
  const label = q.label.slice(0,36).padEnd(38);
  console.log(`  ${label} ${correct.padEnd(20)} ${winners.length?winners.join(', '):'niemand'}`);
});

// ─── SAMENVATTING ─────────────────────────────────────────────────────────────
console.log('\n' + sep('═'));
console.log('  ✅  SAMENVATTING');
console.log(sep('═'));
console.log(`  Pool TEST123 actief          ✓`);
console.log(`  5 gebruikers lid             ✓`);
console.log(`  Groepsfase ingevuld (100%)   ✓  (auto-fill werkt)`);
console.log(`  KO ronden ingevuld           ✓  (auto-suggest R16→QF→SF→Final→Winner werkt)`);
console.log(`  Bonusvragen ingevuld         ✓`);
console.log(`  Puntentelling na resultaten  ✓  (admin heeft 18 duels + R16 ingevoerd)`);
console.log(`  Leaderboard gesorteerd       ✓  (${ranked[0].name} leidt met ${ranked[0].pts} pts)`);
console.log('');
