const H=window.HUB,$=document.getElementById('app');let filter='all';
const e=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const gm=id=>H.games.find(g=>g.id==id)||{name:id,icon:'★'};
const poster=t=>{const href=t.url?e(t.url):'#/t/'+e(t.id);
 if(t.poster)return `<a class="poster has" href="${href}"><img src="${e(t.poster)}" alt="${e(t.name)} ${e(t.season)} poster"><span class="tag">${e(t.status)}</span><div class="cap"><b>${e(t.name)} · ${e(t.season)}</b>${t.status=='completed'&&t.winner?`<span>🏆 ${e(t.winner)}</span>`:`<span>${e(t.date)}</span>`}</div></a>`;
 return `<a class="poster" href="${href}"><span class="tag">${e(t.status)}</span><div><div class="big">${e(gm(t.game).icon)}</div><h3>${e(t.name)}<br>${e(t.season)}</h3><p>${e(t.date)}</p>${t.status=='completed'&&t.winner?`<span class="win">🏆 ${e(t.winner)}</span>`:''}<div class="go">View tournament →</div></div></a>`};
function grid(){const ts=H.tournaments.filter(t=>filter=='all'||t.game==filter).slice().reverse();
 document.getElementById('posters').innerHTML=ts.map(poster).join('')+`<div class="poster soon"><div><div class="big">+</div><h3>More coming</h3><p>New games soon</p></div></div>`;
 document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c.dataset.f==filter))}
function home(){const T=H.tournaments;
 $.innerHTML=`<section id="about"><div class="about"><div><span class="hl">About</span><p>${e(H.org.about)}</p><p class="sub">${e(H.org.sub)}</p></div>
 <div class="stats"><div class="stat"><b>${T.length}</b><span>TOURNAMENTS</span></div><div class="stat"><b>${H.games.length}</b><span>GAMES</span></div>
 <div class="stat"><b>${T.filter(t=>t.status=='completed').length}</b><span>COMPLETED</span></div><div class="stat"><b>${T.filter(t=>t.status!='completed').length}</b><span>UPCOMING / LIVE</span></div></div></div></section>
 <section id="gallery"><div class="bar"><span class="hl">Gallery</span><div class="arrows"><button aria-label="Previous" data-d="-1">←</button><button aria-label="Next" data-d="1">→</button></div></div>
 <div class="reel" id="reel">${H.photos.map((p,i)=>`<figure><span class="n">${i+1}</span><img src="${e(p.src)}" alt="${e(p.caption)}" loading="lazy" onerror="this.remove()"><figcaption>${e(p.caption)}</figcaption></figure>`).join('')}</div></section>
 <section id="tournaments"><span class="hl">All Tournaments</span><div class="chips"><button class="chip" data-f="all">All</button>${H.games.map(g=>`<button class="chip" data-f="${e(g.id)}">${e(g.icon)} ${e(g.name)}</button>`).join('')}</div><div class="posters" id="posters"></div></section>
 ${H.next?`<div class="cta"><div><h3>${e(H.next.title)}</h3><p>${e(H.next.text)}</p></div><a class="btn" href="${e(H.next.url)}">${e(H.next.label)}</a></div>`:''}`;
 grid();
 $.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{filter=c.dataset.f;grid()});
 const r=document.getElementById('reel');$.querySelectorAll('.arrows button').forEach(b=>b.onclick=()=>r.scrollBy({left:b.dataset.d*340,behavior:'smooth'}));
 let d=0,x=0,s=0;r.onmousedown=ev=>{d=1;x=ev.pageX;s=r.scrollLeft};addEventListener('mouseup',()=>d=0);r.onmousemove=ev=>{if(d)r.scrollLeft=s-(ev.pageX-x)};
 const id=location.hash.slice(1);if(id&&document.getElementById(id))document.getElementById(id).scrollIntoView()}
async function sheet(id,name){const r=await fetch(`https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&sheet=${name}`);
 const x=await r.text(),j=JSON.parse(x.slice(x.indexOf('{'),x.lastIndexOf('}')+1));
 const val=c=>c?(c.f??c.v??''):'';let cols=j.table.cols.map(c=>(c.label||'').trim()),rows=j.table.rows||[];
 if(cols.every(c=>!c)&&rows.length){cols=rows[0].c.map(c=>String(val(c)).trim());rows=rows.slice(1)}
 return rows.map(r=>Object.fromEntries(cols.map((c,i)=>[c||'col'+i,val(r.c[i])]))).filter(o=>Object.values(o).some(v=>String(v).trim()))}
function standings(ps,ms){const s={};ps.forEach(p=>s[p.name]={n:p.name,p:0,w:0,d:0,l:0,pts:0});
 ms.forEach(m=>{const a=s[m.player1],b=s[m.player2],r=String(m.result).trim().toLowerCase();if(!a||!b)return;
  if(r=='p1'){a.w++;b.l++;a.pts++}else if(r=='p2'){b.w++;a.l++;b.pts++}else if(r=='draw'){a.d++;b.d++;a.pts+=.5;b.pts+=.5}else return;a.p++;b.p++});
 return Object.values(s).sort((x,y)=>y.pts-x.pts||y.w-x.w)}
const champ=t=>t.winner?`<div class="champ"><div style="font-size:52px">🏆</div><div>Champion<strong>${e(t.winner)}</strong>${t.runnerUp?`<div>Runner-up: ${e(t.runnerUp)}</div>`:''}</div></div>`:'';
async function tour(id){const t=H.tournaments.find(x=>x.id==id);if(!t)return home();
 $.innerHTML=`<a class="crumb" href="#tournaments">← All tournaments</a><span class="hl" style="display:block;width:fit-content">${e(t.name)}</span><p class="mono">${e(t.season)} · ${e(t.date)} · ${e(t.status)}</p>
 ${t.poster?`<img class="bigposter" src="${e(t.poster)}" alt="">`:''}${(t.details||[]).map(d=>`<p class="mono">${e(d)}</p>`).join('')}<div id="champSlot">${champ(t)}</div>${t.url?`<a class="btn" href="${e(t.url)}">Open full tournament site</a>`:''}<div id="live"></div>`;
 if(!t.sheetId)return;const L=document.getElementById('live');L.innerHTML='<p>Loading…</p>';
 try{const [ps,ms,st]=await Promise.all([sheet(t.sheetId,'Players'),sheet(t.sheetId,'Matches'),sheet(t.sheetId,'Settings').catch(()=>[])]);
  const cfg={};st.forEach(r=>{const k=Object.keys(r);if(r[k[0]])cfg[String(r[k[0]]).trim()]=r[k[1]]});
  if(cfg.winner&&!t.winner){t.winner=cfg.winner;t.runnerUp=cfg.runnerUp;document.getElementById('champSlot').innerHTML=champ(t)}
  L.innerHTML=`<h2 class="hl" style="margin-top:28px">Standings</h2><div class="wrap"><table><tr><th>#</th><th>Player</th><th>P</th><th>W</th><th>D</th><th>L</th><th>Pts</th></tr>`+
  standings(ps,ms).map((r,i)=>`<tr><td>${i+1}</td><td>${e(r.n)}</td><td>${r.p}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td><td><b>${r.pts}</b></td></tr>`).join('')+`</table></div>
  <h2 class="hl">Matches</h2><div class="wrap"><table><tr><th>Round</th><th>Match</th><th>When</th><th>Result</th></tr>`+
  ms.map(m=>`<tr><td>${e(m.round)}</td><td>${e(m.player1)} vs ${e(m.player2)}</td><td>${e(m.date)} ${e(m.time)}</td><td>${e(m.result)}</td></tr>`).join('')+`</table></div>`
 }catch(_){L.innerHTML='<p>Could not load the sheet. Check it is shared as "Anyone with the link can view".</p>'}}
function route(){const h=location.hash;if(h.startsWith('#/t/')){tour(h.slice(4));scrollTo(0,0)}else if(!document.getElementById('reel')){home()}else{const el=document.getElementById(h.slice(1));el&&el.scrollIntoView()}}
addEventListener('hashchange',route);route();
