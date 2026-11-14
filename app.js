const H=window.HUB,$=document.getElementById('app'),C=document.getElementById('crumbs');
const e=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const tcard=t=>`<a class="card" href="${t.url?e(t.url):'#/t/'+e(t.id)}"><span class="tag ${e(t.status)}">${e(t.status)}</span>
<p><b>${e(t.name)} · ${e(t.season)}</b></p><p>${e(t.date)}${t.status=='completed'&&t.winner?' · 🏆 '+e(t.winner):''}</p></a>`;
const champ=t=>t.status=='completed'&&t.winner?`<div class="card champ"><div class="ico">🏆</div><div><div>Champion</div><strong>${e(t.winner)}</strong>${t.runnerUp?`<div>Runner-up: ${e(t.runnerUp)}</div>`:''}</div></div>`:'';
function home(){C.innerHTML='';
 $.innerHTML=`<h1>${e(H.org.name)}</h1><p class="lead">${e(H.org.tagline)}</p><h2>Games</h2><div class="grid">`+
 H.games.map(g=>{const n=H.tournaments.filter(t=>t.game==g.id).length;
 return `<a class="card" href="#/g/${e(g.id)}"><div class="ico">${e(g.icon)}</div><b>${e(g.name)}</b><p>${e(g.blurb)}</p><p>${n} tournament${n==1?'':'s'}</p></a>`}).join('')+`</div>`+
 `<h2>Latest</h2><div class="grid">`+H.tournaments.slice().reverse().slice(0,4).map(tcard).join('')+`</div>`}
function game(id){const g=H.games.find(x=>x.id==id);if(!g)return home();
 C.innerHTML=`<a href="#/">All games</a>`;const ts=H.tournaments.filter(t=>t.game==id);
 $.innerHTML=`<h1>${e(g.icon)} ${e(g.name)}</h1><p class="lead">${e(g.blurb)}</p><h2>Tournaments</h2><div class="grid">`+
 (ts.length?ts.slice().reverse().map(tcard).join(''):'<p class="lead">No tournaments yet.</p>')+`</div>`}
async function sheet(id,name){const r=await fetch(`https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&sheet=${name}`);
 const x=await r.text(),j=JSON.parse(x.slice(x.indexOf('{'),x.lastIndexOf('}')+1));
 const val=c=>c?(c.f??c.v??''):'';let cols=j.table.cols.map(c=>(c.label||'').trim()),rows=j.table.rows||[];
 if(cols.every(c=>!c)&&rows.length){cols=rows[0].c.map(c=>String(val(c)).trim());rows=rows.slice(1)}
 return rows.map(r=>Object.fromEntries(cols.map((c,i)=>[c||'col'+i,val(r.c[i])]))).filter(o=>Object.values(o).some(v=>String(v).trim()))}
function standings(ps,ms){const s={};ps.forEach(p=>s[p.name]={n:p.name,p:0,w:0,d:0,l:0,pts:0});
 ms.forEach(m=>{const a=s[m.player1],b=s[m.player2],r=String(m.result).trim();if(!a||!b)return;
  if(r=='P1'){a.w++;b.l++;a.pts++}else if(r=='P2'){b.w++;a.l++;b.pts++}else if(r.toLowerCase()=='draw'){a.d++;b.d++;a.pts+=.5;b.pts+=.5}else return;a.p++;b.p++});
 return Object.values(s).sort((x,y)=>y.pts-x.pts||y.w-x.w)}
async function tour(id){const t=H.tournaments.find(x=>x.id==id);if(!t)return home();
 const g=H.games.find(x=>x.id==t.game);C.innerHTML=`<a href="#/">All games</a><a href="#/g/${e(t.game)}">${e(g?.name)}</a>`;
 $.innerHTML=`<h1>${e(t.name)}</h1><p class="lead">${e(t.season)} · ${e(t.date)} · <span class="${e(t.status)}">${e(t.status)}</span></p>
 ${t.url?`<a class="btn" href="${e(t.url)}">Open full tournament site</a>`:''}<div id="champSlot">${champ(t)}</div><div id="live"></div>`;
 if(!t.sheetId)return;const L=document.getElementById('live');L.innerHTML='<p class="lead">Loading…</p>';
 try{const [ps,ms,st]=await Promise.all([sheet(t.sheetId,'Players'),sheet(t.sheetId,'Matches'),sheet(t.sheetId,'Settings').catch(()=>[])]);
  const cfg={};st.forEach(r=>{const k=Object.keys(r);if(r[k[0]])cfg[String(r[k[0]]).trim()]=r[k[1]]});
  if(cfg.winner&&!t.winner){t.winner=cfg.winner;t.runnerUp=cfg.runnerUp;t.status='completed';document.getElementById('champSlot').innerHTML=champ(t)}
  L.innerHTML=`<h2>Standings</h2><div class="wrap"><table><tr><th>#</th><th>Player</th><th>P</th><th>W</th><th>D</th><th>L</th><th>Pts</th></tr>`+
  standings(ps,ms).map((r,i)=>`<tr><td>${i+1}</td><td>${e(r.n)}</td><td>${r.p}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td><td><b>${r.pts}</b></td></tr>`).join('')+`</table></div>
  <h2>Matches</h2><div class="wrap"><table><tr><th>Round</th><th>Match</th><th>When</th><th>Result</th></tr>`+
  ms.map(m=>`<tr><td>${e(m.round)}</td><td>${e(m.player1)} vs ${e(m.player2)}</td><td>${e(m.date)} ${e(m.time)}</td><td>${e(m.result)}</td></tr>`).join('')+`</table></div>`
 }catch(_){L.innerHTML='<p class="lead">Could not load the sheet. Check it is shared as "Anyone with the link can view" and has Players and Matches tabs.</p>'}}
function route(){const [,k,v]=location.hash.split('/');k=='g'?game(v):k=='t'?tour(v):home();scrollTo(0,0)}
addEventListener('hashchange',route);route();
