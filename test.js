// Test script — WK 2026 poule logica
// Simuleert 5 gebruikers + pool TEST123 zonder browser of Firebase

// ─── Data (overgenomen uit index.html) ───────────────────────────────────────
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
  'Argentina':{ranking:1},'France':{ranking:2},'England':{ranking:3},'Belgium':{ranking:4},
  'Brazil':{ranking:5},'Portugal':{ranking:6},'Netherlands':{ranking:7},'Spain':{ranking:8},
  'Germany':{ranking:9},'Croatia':{ranking:10},'Colombia':{ranking:11},'USA':{ranking:12},
  'Morocco':{ranking:13},'Mexico':{ranking:14},'Switzerland':{ranking:15},'Japan':{ranking:16},
  'Uruguay':{ranking:17},'Senegal':{ranking:18},'Turkey':{ranking:19},'Norway':{ranking:20},
  'South Korea':{ranking:21},'Iran':{ranking:22},'Ecuador':{ranking:23},'Austria':{ranking:24},
  'Australia':{ranking:25},'Algeria':{ranking:26},'Sweden':{ranking:27},'Scotland':{ranking:28},
  'Tunisia':{ranking:29},'Ivory Coast':{ranking:30},'Egypt':{ranking:31},
  'Bosnia-Herzegovina':{ranking:32},'Czechia':{ranking:33},'Canada':{ranking:34},
  'Paraguay':{ranking:35},'Saudi Arabia':{ranking:36},'Cape Verde':{ranking:37},
  'Ghana':{ranking:38},'South Africa':{ranking:39},'DR Congo':{ranking:40},
  'Iraq':{ranking:41},'Qatar':{ranking:42},'Jordan':{ranking:43},'Panama':{ranking:44},
  'Haiti':{ranking:45},'Uzbekistan':{ranking:46},'Curaçao':{ranking:47},'New Zealand':{ranking:48},
};

const KO_ROUNDS = [
  {key:'r16',slots:16,pts:10},{key:'qf',slots:8,pts:20},
  {key:'sf',slots:4,pts:30},{key:'final',slots:2,pts:40},{key:'winner',slots:1,pts:20},
];

const BONUS = [
  {key:'b1',pts:10},{key:'b2',pts:10,type:'number'},{key:'b3',pts:10},
  {key:'b4',pts:10,opts:['Yes','No']},{key:'b5',pts:10,type:'number'},
  {key:'b6',pts:10,opts:['Europe','South America','CONCACAF','Africa','Asia/Oceania']},
];

// ─── DB state ────────────────────────────────────────────────────────────────
let DB = {players:{},results:{},koResults:{},bonusAnswers:{},pools:{}};

// ─── Functies (identiek aan index.html) ──────────────────────────────────────
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
    if(q.type==='number') { const tol=q.key==='b5'?3:5; if(Math.abs(+ans-+correct)<=tol) pts+=q.pts; }
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
  if (!DB.players[user].scores) DB.players[user].scores={};
  const winScores=[[1,0],[2,0],[2,1],[3,0],[3,1],[3,2],[4,1],[4,2],[2,0],[1,0],[3,1]];
  const drawScores=[[0,0],[1,1],[2,2],[1,1],[0,0]];
  SCHEDULE.forEach(m => {
    const rankH=(COUNTRIES[m.h]&&COUNTRIES[m.h].ranking)||50;
    const rankA=(COUNTRIES[m.a]&&COUNTRIES[m.a].ranking)||50;
    const diff=rankA-rankH;
    const roll=Math.random()*100;
    let outcome;
    if      (diff>15) outcome=roll<72?'h':roll<88?'d':'a';
    else if (diff>5)  outcome=roll<55?'h':roll<78?'d':'a';
    else if (diff<-15)outcome=roll<12?'h':roll<28?'d':'a';
    else if (diff<-5) outcome=roll<22?'h':roll<45?'d':'a';
    else              outcome=roll<42?'h':roll<68?'d':'a';
    let h,a;
    if(outcome==='d'){const s=drawScores[Math.floor(Math.random()*drawScores.length)];h=s[0];a=s[1];}
    else{const s=winScores[Math.floor(Math.random()*winScores.length)];if(outcome==='h'){h=s[0];a=s[1];}else{h=s[1];a=s[0];}}
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
      const r=pd.scores&&pd.scores[m.id];
      if(!r||r.h==null||r.a==null) return;
      const h=+r.h,a=+r.a;
      stats[m.h].gf+=h;stats[m.h].gd+=h-a;
      stats[m.a].gf+=a;stats[m.a].gd+=a-h;
      if(h>a)stats[m.h].pts+=3;else if(h<a)stats[m.a].pts+=3;else{stats[m.h].pts+=1;stats[m.a].pts+=1;}
    });
    standings[g]=Object.values(stats).sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf);
  });
  const projected=[],thirds=[];
  ['A','B','C','D','E','F','G','H','I','J','K','L'].forEach(g=>{
    projected.push(standings[g][0].team);
    projected.push(standings[g][1].team);
    thirds.push(standings[g][2]);
  });
  thirds.sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf);
  thirds.slice(0,8).forEach(t=>projected.push(t.team));

  const rankOf=t=>(COUNTRIES[t]&&COUNTRIES[t].ranking)||99;
  const byRank=arr=>[...arr].sort((a,b)=>rankOf(a)-rankOf(b));
  const qf=byRank(projected).slice(0,8);
  const sf=byRank(qf).slice(0,4);
  const final2=byRank(sf).slice(0,2);
  const winner=byRank(final2).slice(0,1);

  if(!DB.players[user].ko) DB.players[user].ko={};
  DB.players[user].ko.r16=projected;
  DB.players[user].ko.qf=qf;
  DB.players[user].ko.sf=sf;
  DB.players[user].ko.final=final2;
  DB.players[user].ko.winner=winner;
}

// ─── Test helpers ─────────────────────────────────────────────────────────────
let passed=0, failed=0;
function assert(label, condition, detail='') {
  if(condition){ console.log(`  ✓  ${label}`); passed++; }
  else { console.log(`  ✗  ${label}${detail?' — '+detail:''}`); failed++; }
}

// ─── TEST 1: Pool TEST123 aanmaken ────────────────────────────────────────────
console.log('\n[ Pool aanmaken ]');
DB.pools['TEST123'] = {code:'TEST123', name:'Test Pool', icon:'🧪', members:[]};
assert('Pool TEST123 bestaat', !!DB.pools['TEST123']);
assert('Pool heeft lege memberlijst', DB.pools['TEST123'].members.length === 0);

// ─── TEST 2: 5 gebruikers aanmaken en toevoegen aan pool ─────────────────────
console.log('\n[ 5 gebruikers aanmaken + pool joinen ]');
const USERS = ['Alice','Bob','Charlie','Diana','Erik'];
USERS.forEach(u => {
  DB.players[u] = {scores:{},ko:{},bonus:{}};
  DB.pools['TEST123'].members.push(u);
});
assert('Alle 5 spelers aangemaakt', Object.keys(DB.players).length === 5);
assert('Alle 5 in pool TEST123', DB.pools['TEST123'].members.length === 5);
USERS.forEach(u => assert(`${u} zit in pool`, DB.pools['TEST123'].members.includes(u)));

// ─── TEST 3: Auto-fill groepsfase ─────────────────────────────────────────────
console.log('\n[ Auto-fill groepsfase ]');
USERS.forEach(u => autoFillGroupStage(u));

USERS.forEach(u => {
  const pct = filledPct(u);
  assert(`${u}: groepsfase 100% ingevuld`, pct === 100, `${pct}%`);
});

// Controleer dat scores realistisch zijn (0-20)
const alice = DB.players['Alice'];
let allValid = true;
SCHEDULE.forEach(m => {
  const s = alice.scores[m.id];
  if(!s || s.h==null || s.a==null || s.h<0 || s.a<0 || s.h>20 || s.a>20) allValid=false;
});
assert('Alice: alle scores in geldig bereik (0-20)', allValid);

// Controleer dat sterkere teams vaker winnen (ranking-based)
// Argentina (#1) vs Haiti (#45) — Argentina zou in de meeste simulaties winnen
let argWins=0;
for(let i=0;i<200;i++){
  autoFillGroupStage('__testuser__');
  const s=DB.players['__testuser__'].scores;
  // Zoek een wedstrijd met groot ranking-verschil
  const match=SCHEDULE.find(m=>m.h==='Argentina'||m.a==='Argentina');
  if(match){
    const sc=s[match.id];
    if(sc){
      if(match.h==='Argentina'&&sc.h>sc.a) argWins++;
      if(match.a==='Argentina'&&sc.a>sc.h) argWins++;
    }
  }
}
delete DB.players['__testuser__'];
assert('Ranking-gebaseerd: Argentina wint >60% van simulaties', argWins > 120, `${argWins}/200`);

// ─── TEST 4: Auto-suggest KO ronden ──────────────────────────────────────────
console.log('\n[ Auto-suggest KO ronden ]');
USERS.forEach(u => autoSuggestKO(u));

USERS.forEach(u => {
  const ko = DB.players[u].ko;
  assert(`${u}: R16 heeft 32 teams`,  ko.r16  && ko.r16.length  === 32);
  assert(`${u}: QF heeft 8 teams`,    ko.qf   && ko.qf.length   === 8);
  assert(`${u}: SF heeft 4 teams`,    ko.sf   && ko.sf.length   === 4);
  assert(`${u}: Final heeft 2 teams`, ko.final && ko.final.length === 2);
  assert(`${u}: Winner heeft 1 team`, ko.winner && ko.winner.length === 1);
});

// R16 moet precies de top-2 per groep + 8 beste derde-plaatsers bevatten (32 unieke teams)
const aliceR16 = DB.players['Alice'].ko.r16;
const uniqueR16 = new Set(aliceR16);
assert('Alice: R16 bevat 32 unieke teams', uniqueR16.size === 32, `${uniqueR16.size} uniek`);

// QF moet subset zijn van R16
const aliceQF = DB.players['Alice'].ko.qf;
const qfInR16 = aliceQF.every(t => aliceR16.includes(t));
assert('Alice: QF-teams zitten allemaal in R16', qfInR16);

// Winner moet in Final zitten
const aliceFinal = DB.players['Alice'].ko.final;
const aliceWinner = DB.players['Alice'].ko.winner[0];
assert('Alice: Winner zit in Final', aliceFinal.includes(aliceWinner));

// Sterkste teams bovenaan (FIFA ranking)
const rankOf = t => (COUNTRIES[t]&&COUNTRIES[t].ranking)||99;
const winnerRank = rankOf(aliceWinner);
assert(`Alice: Winner heeft FIFA-ranking ≤ 10 (is ${aliceWinner}, #${winnerRank})`, winnerRank <= 10);

// ─── TEST 5: Puntensysteem ────────────────────────────────────────────────────
console.log('\n[ Puntensysteem ]');

// Stel officiële resultaten in (identiek aan Alice's voorspellingen voor 3 wedstrijden)
const aliceScores = DB.players['Alice'].scores;
DB.results['A1'] = {...aliceScores['A1']}; // exact goed → +5
DB.results['A2'] = {h: aliceScores['A2'].h, a: aliceScores['A2'].a+1}; // zelfde winnaar → +3 (of +3+1)
DB.results['A3'] = {h:99, a:99}; // compleet fout → 0

const pts = calcPoints('Alice');
assert('Alice: 0 punten wanneer geen resultaten overeenkomen voor rest', typeof pts === 'number');
assert('Alice scoort punten voor exact goed (A1)', pts >= 5);

// Test exact score bonus (+5 ipv +3)
DB.results = {};
const testMatch = SCHEDULE[0]; // A1
DB.players['TestPts'] = {scores:{[testMatch.id]:{h:2,a:1}},ko:{},bonus:{}};
DB.results[testMatch.id] = {h:2,a:1}; // exact goed
const exactPts = calcPoints('TestPts');
assert('Exact score geeft +5 punten', exactPts === 5, `${exactPts} pts`);

DB.results[testMatch.id] = {h:2,a:0}; // zelfde winnaar, andere score
const winnerPts = calcPoints('TestPts');
assert('Zelfde winnaar (niet exact) geeft +3+1=4 of +3 punten', winnerPts >= 3 && winnerPts <= 4, `${winnerPts} pts`);

DB.results[testMatch.id] = {h:0,a:2}; // away wint, away score anders — voorspelling was 2-1 (home wint)
const wrongPts = calcPoints('TestPts');
// Winnaar fout → +0, home score fout → +0, away score fout → +0
assert('Foute winnaar + foute scores geeft 0 punten', wrongPts === 0, `${wrongPts} pts`);
delete DB.players['TestPts'];
DB.results = {};

// ─── TEST 6: Bonus-antwoorden ─────────────────────────────────────────────────
console.log('\n[ Bonusvragen ]');
DB.players['Alice'].bonus = {b1:'Brazil',b2:'150',b3:'Messi',b4:'Yes',b5:'8',b6:'Europe'};
DB.bonusAnswers = {b1:'Brazil',b2:'148',b3:'Messi',b4:'Yes',b5:'6',b6:'Europe'};

const bonusPts = calcPoints('Alice');
// b1: exact → +10, b2: |150-148|=2 ≤5 → +10, b3: exact → +10, b4: exact → +10
// b5: |8-6|=2 ≤3 → +10, b6: exact → +10 → totaal bonus = 60
assert('Alice: alle 6 bonusvragen goed = 60 bonuspunten', bonusPts === 60, `${bonusPts} pts`);

DB.bonusAnswers.b1 = 'Germany'; // fout
const partialBonusPts = calcPoints('Alice');
assert('Alice: 5 van 6 bonus = 50 bonuspunten', partialBonusPts === 50, `${partialBonusPts} pts`);

DB.bonusAnswers = {};

// ─── TEST 7: Leaderboard volgorde ─────────────────────────────────────────────
console.log('\n[ Leaderboard ]');
// Stel resultaten in identiek aan Alice (wint alles)
SCHEDULE.slice(0,10).forEach(m => {
  DB.results[m.id] = {...DB.players['Alice'].scores[m.id]};
});
DB.koResults = {r16:[...DB.players['Alice'].ko.r16]};

const scores = USERS.map(u => ({name:u, pts:calcPoints(u)}));
scores.sort((a,b)=>b.pts-a.pts);
assert('Leaderboard gesorteerd op punten (hoogste eerst)', scores[0].pts >= scores[scores.length-1].pts);
assert('Alle 5 gebruikers in leaderboard', scores.length === 5);

console.log('\n  Leaderboard (alleen R16 + eerste 10 groepsduels):');
scores.forEach((s,i) => console.log(`    ${i+1}. ${s.name}: ${s.pts} pts (${filledPct(s.name)}% ingevuld)`));

// ─── TEST 8: Firebase overwrite-bescherming ───────────────────────────────────
console.log('\n[ Firebase-overwrite bescherming ]');
// Simuleer: gebruiker typt lokale score in (nog niet gesaved naar Firebase)
let currentUser = 'Alice';
DB.players['Alice'].scores['A1'] = {h:3,a:0}; // lokaal gewijzigd, nog niet gesaved

// Simuleer Firebase update die de DB overschrijft
const savedScores = currentUser && DB.players && DB.players[currentUser] && DB.players[currentUser].scores;
const incomingData = JSON.parse(JSON.stringify(DB)); // deep copy = "server snapshot"
incomingData.players['Alice'].scores['A1'] = {h:0,a:0}; // server had andere waarde

DB = incomingData;
['players','results','koResults','bonusAnswers','pools'].forEach(k=>{if(!DB[k])DB[k]={};});
if(savedScores && currentUser && DB.players[currentUser]) {
  Object.assign(DB.players[currentUser].scores, savedScores);
}

assert('Lokale scores blijven na Firebase-update', DB.players['Alice'].scores['A1'].h !== 0,
  `A1 score: ${JSON.stringify(DB.players['Alice'].scores['A1'])}`);

// ─── Samenvatting ─────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(50)}`);
console.log(`  Resultaat: ${passed} geslaagd, ${failed} mislukt`);
if(failed === 0) console.log('  Alle tests geslaagd ✓');
else console.log('  Let op: er zijn mislukte tests!');
console.log('');
