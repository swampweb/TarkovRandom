document.addEventListener("DOMContentLoaded", () => {
const maps = ["Customs","Woods","Factory","Interchange","Reserve","Shoreline","Lighthouse","Streets","Ground Zero","Labs","Random Map"];
const defaultPlayers = [
  { id: crypto.randomUUID(), name: "CajunVeteran", level: 42, money: 2500000, ready: true, active: true },
  { id: crypto.randomUUID(), name: "SilverFoxJonesy", level: 37, money: 1800000, ready: true, active: true },
  { id: crypto.randomUUID(), name: "WickedWill", level: 28, money: 1200000, ready: true, active: true },
  { id: crypto.randomUUID(), name: "BackwoodBeast", level: 22, money: 900000, ready: true, active: true },
  { id: crypto.randomUUID(), name: "SwampyFPS", level: 31, money: 1500000, ready: false, active: false },
  { id: crypto.randomUUID(), name: "BayouBandit", level: 16, money: 600000, ready: false, active: false }
];
const weapons=[{name:"MP-133 Shotgun",min:1,cost:25000,ammo:"12/70 buckshot",style:"Budget chaos"},{name:"SKS",min:1,cost:35000,ammo:"7.62x39 best available",style:"Reliable budget"},{name:"Mosin Infantry",min:1,cost:45000,ammo:"7.62x54R",style:"Classic pain"},{name:"MP5",min:10,cost:65000,ammo:"9x19 best available",style:"Smooth SMG"},{name:"AKS-74U",min:10,cost:55000,ammo:"5.45x39 best available",style:"Compact fighter"},{name:"AKM",min:15,cost:85000,ammo:"7.62x39 best available",style:"Hard hitter"},{name:"M4A1",min:15,cost:95000,ammo:"5.56 best available",style:"NATO classic"},{name:"RFB",min:20,cost:110000,ammo:"7.62x51 best available",style:"Budget puncher"},{name:"MPX",min:23,cost:120000,ammo:"9x19 best available",style:"Fancy SMG"},{name:"RD-704",min:30,cost:185000,ammo:"7.62x39 best available",style:"AK beast"},{name:"MCX .300 Blackout",min:30,cost:175000,ammo:".300 BLK best available",style:"CajunVeteran special"},{name:"SA-58",min:37,cost:210000,ammo:"7.62x51 best available",style:"Recoil rodeo"}];
const armor=[{name:"No armor",min:1,cost:0},{name:"PACA or soft armor",min:1,cost:25000},{name:"Class 3 armor",min:10,cost:45000},{name:"Class 4 armor",min:15,cost:85000},{name:"Class 5 armor",min:30,cost:140000}];
const helmets=[{name:"No helmet",min:1,cost:0},{name:"Basic helmet",min:10,cost:25000},{name:"Class 4 helmet",min:15,cost:60000},{name:"Helmet with face shield",min:30,cost:120000}];
const rigs=[{name:"Scav vest",cost:10000},{name:"Bank robber rig",cost:15000},{name:"Any small rig",cost:25000},{name:"Any medium rig",cost:35000},{name:"Any armored rig",cost:70000}];
const bags=[{name:"No backpack",cost:0},{name:"Sling",cost:8000},{name:"T-Bag",cost:12000},{name:"Day Pack",cost:18000},{name:"Berkut/Scav BP",cost:30000}];
const challenges=["Must push first gunshot heard","No looting until first kill","One teammate calls all extracts","Boss hunt if boss spawns","Only one mag loaded at a time","Grenades must be thrown dramatically"];
let currentEventCode = cleanCode(localStorage.getItem("ctc-current-event") || "CV7264");
let state = loadEvent(currentEventCode);
let selectedId = state.players[0]?.id || "";
function cleanCode(v){ return String(v||"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,16) || "CV7264"; }
function getAll(){ try{return JSON.parse(localStorage.getItem("ctc-events")||"{}")}catch{return {}} }
function saveAll(all){ localStorage.setItem("ctc-events", JSON.stringify(all)); }
function loadEvent(code){ const all=getAll(); return all[code] || {eventCode:code,eventName:"Friday Night Mayhem",map:"Customs",time:"Day",players:structuredClone(defaultPlayers),results:[],rolledAt:"",rule:pick(challenges)}; }
function save(){ const all=getAll(); state.eventCode=currentEventCode; all[currentEventCode]=state; saveAll(all); localStorage.setItem("ctc-current-event", currentEventCode); }
function switchEvent(code){ save(); currentEventCode=cleanCode(code); state=loadEvent(currentEventCode); selectedId=state.players[0]?.id || ""; render(); }
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function fmt(n){return `₽ ${new Intl.NumberFormat("en-US").format(Number(n||0))}`}
function parseMoney(v){return Number(String(v||"").replace(/[^0-9]/g,""))||0}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]))}
function activePlayers(){return state.players.filter(p=>p.active!==false)}
function allReady(){const a=activePlayers();return a.length>0&&a.every(p=>p.ready&&p.name&&p.level>0&&p.money>0)}
function allowed(list,level){return list.filter(x=>(x.min||1)<=level)}
function total(k){return k.weapon.cost+k.armor.cost+k.helmet.cost+k.rig.cost+k.bag.cost}
function buildKit(level){return {weapon:pick(allowed(weapons,level)),armor:pick(allowed(armor,level)),helmet:pick(allowed(helmets,level)),rig:pick(rigs),bag:pick(bags)}}
function makeLoadout(p){let kit=null;for(let i=0;i<80;i++){const k=buildKit(Number(p.level));if(total(k)<=Number(p.money)){kit=k;break}}if(!kit){kit={weapon:allowed(weapons,p.level)[0],armor:armor[0],helmet:helmets[0],rig:rigs[0],bag:bags[0]}}return {id:crypto.randomUUID(),name:p.name,level:p.level,money:p.money,...kit,total:total(kit),challenge:pick(challenges)}}
function bind(){
  mapName.innerHTML=maps.map(m=>`<option>${m}</option>`).join("");
  document.querySelectorAll(".nav-btn,[data-view]").forEach(b=>b.onclick=()=>setView(b.dataset.view));
  loadEventBtn.onclick=()=>switchEvent(eventCodeInput.value);
  newEventBtn.onclick=()=>{eventCodeInput.value="CV"+Math.floor(100000+Math.random()*900000);switchEvent(eventCodeInput.value)};
  streamerLoadEventBtn.onclick=()=>switchEvent(streamerEventCodeInput.value);
  eventName.oninput=e=>{state.eventName=e.target.value;save()};
  mapName.onchange=e=>{state.map=e.target.value;render()};
  dayBtn.onclick=()=>{state.time="Day";render()};
  nightBtn.onclick=()=>{state.time="Night";render()};
  addStreamerBtn.onclick=()=>{state.players.push({id:crypto.randomUUID(),name:"New Streamer",level:1,money:100000,ready:false,active:true});render()};
  createStreamerBtn.onclick=()=>{const name=newStreamerName.value.trim(); if(!name)return; state.players.push({id:crypto.randomUUID(),name,level:1,money:100000,ready:false,active:true}); selectedId=state.players[state.players.length-1].id; newStreamerName.value=""; render();};
  randomizeBtn.onclick=roll; dashRerollBtn.onclick=roll; copyBtn.onclick=copyResults;
  streamerSelect.onchange=e=>{selectedId=e.target.value; renderStreamer()};
  streamerNameInput.oninput=e=>updatePlayer(selectedId,{name:e.target.value},false);
  streamerLevelInput.onchange=e=>updatePlayer(selectedId,{level:Number(e.target.value)});
  streamerMoneyInput.onfocus=e=>e.target.value=parseMoney(e.target.value)||"";
  streamerMoneyInput.onchange=e=>updatePlayer(selectedId,{money:parseMoney(e.target.value)});
  submitReadyBtn.onclick=()=>updatePlayer(selectedId,{ready:true});
}
function setView(id){document.querySelectorAll(".view").forEach(v=>v.classList.remove("active-view"));document.getElementById(id).classList.add("active-view");document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.view===id));render()}
function updatePlayer(id,patch,rerender=true){state.players=state.players.map(p=>p.id===id?{...p,...patch}:p);save();if(rerender)render()}
function render(){eventCodeTop.textContent=currentEventCode;eventCodePlayer.textContent=currentEventCode;eventCodeInput.value=currentEventCode;streamerEventCodeInput.value=currentEventCode;eventName.value=state.eventName;mapName.value=state.map;dayBtn.classList.toggle("active",state.time==="Day");nightBtn.classList.toggle("active",state.time==="Night");renderAdmin();renderStreamer();renderDashboard();save()}
function renderAdmin(){const active=activePlayers();const inactive=state.players.filter(p=>p.active===false);readyPill.textContent=`${active.filter(p=>p.ready).length}/${active.length} Ready`;randomizeBtn.disabled=!allReady();dashRerollBtn.disabled=!allReady();playingBody.innerHTML=active.map(row).join("")||'<tr><td colspan="6" class="muted">No playing streamers.</td></tr>';notPlayingBody.innerHTML=inactive.map(row).join("")||'<tr><td colspan="6" class="muted">No streamers are marked Not Playing.</td></tr>';notPlayingCount.textContent=inactive.length;wireRows()}
function row(p){const out=p.active===false;return `<tr><td><span class="status-badge ${out?"out":""}">${out?"Not Playing":"Playing"}</span></td><td><div class="streamer-cell"><span class="avatar">${esc((p.name||"?")[0])}</span><input class="name-input" data-field="name" data-id="${p.id}" value="${esc(p.name)}"></div></td><td><input class="row-input" type="number" data-field="level" data-id="${p.id}" value="${p.level}"></td><td><input class="money-input" data-field="money" data-id="${p.id}" value="${fmt(p.money)}"></td><td>${out?'<span class="not-required">— Not Required</span>':`<button class="action-btn" data-ready="${p.id}">${p.ready?"✓ Ready":"Mark Ready"}</button>`}</td><td><button class="action-btn" data-active="${p.id}">${out?"Mark As Playing":"Mark Not Playing"}</button></td></tr>`}
function wireRows(){document.querySelectorAll("[data-field]").forEach(i=>{i.onfocus=e=>{if(i.dataset.field==="money")e.target.value=parseMoney(e.target.value)||""};i.onchange=e=>{const f=i.dataset.field;updatePlayer(i.dataset.id,{[f]:f==="name"?e.target.value:f==="money"?parseMoney(e.target.value):Number(e.target.value)})}});document.querySelectorAll("[data-ready]").forEach(b=>b.onclick=()=>{const p=state.players.find(x=>x.id===b.dataset.ready);updatePlayer(p.id,{ready:!p.ready})});document.querySelectorAll("[data-active]").forEach(b=>b.onclick=()=>{const p=state.players.find(x=>x.id===b.dataset.active);updatePlayer(p.id,{active:!(p.active!==false),ready:false})})}
function renderStreamer(){streamerSelect.innerHTML=state.players.map(p=>`<option value="${p.id}" ${p.id===selectedId?"selected":""}>${esc(p.name)}${p.active===false?" - Not Playing":""}</option>`).join("");const p=state.players.find(x=>x.id===selectedId)||state.players[0];if(!p)return;selectedId=p.id;streamerSelect.value=p.id;streamerNameInput.value=p.name;streamerLevelInput.value=p.level;streamerMoneyInput.value=fmt(p.money);streamerStatus.className=`status-card ${p.ready?"ready":""} ${p.active===false?"out":""}`;streamerStatus.innerHTML=`<strong>${p.active===false?"Not Playing This Run":p.ready?"Ready for Contract":"Not Ready Yet"}</strong><p>${p.active===false?"Admin has you sitting out this roll.":"Update your info and submit when ready."}</p>`;submitReadyBtn.disabled=p.active===false}
function roll(){if(!allReady())return;state.results=activePlayers().map(makeLoadout);state.rolledAt=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});setView("dashboard")}
function renderDashboard(){dashTitle.textContent=`${state.map} - ${state.time} Raid`;squadRule.textContent=`Squad Rule: ${state.rule}`;rolledAt.textContent=state.rolledAt?`Last rolled at ${state.rolledAt}`:"";copyBtn.disabled=!state.results.length;if(!state.results.length){dashboardResults.className="results-empty";dashboardResults.innerHTML="No contracts assigned yet. Admin must click <b>Randomize Loadouts</b>.";return}dashboardResults.className="results-grid";dashboardResults.innerHTML=state.results.map((r,i)=>`<article class="contract-card"><div class="contract-top"><div><span class="muted">Level ${r.level} · Rubles ${fmt(r.money)}</span><h3>${esc(r.name)}</h3></div><span class="num">#${i+1}</span></div><div class="weapon"><span>Assigned Gun</span><h4>${esc(r.weapon.name)}</h4><p>${esc(r.weapon.style)} · ${esc(r.weapon.ammo)}</p><b class="yellow">Mod it however you want, but it must stay this gun.</b></div><div class="gear-grid"><div class="gear"><span>Armor</span><b>${esc(r.armor.name)}</b></div><div class="gear"><span>Helmet</span><b>${esc(r.helmet.name)}</b></div><div class="gear"><span>Rig</span><b>${esc(r.rig.name)}</b></div><div class="gear"><span>Backpack</span><b>${esc(r.bag.name)}</b></div></div><div class="cost"><span class="muted">Estimated Kit Cost</span><br><b>${fmt(r.total)}</b></div><div class="challenge"><span class="muted">Contract Twist</span><br><b>${esc(r.challenge)}</b></div></article>`).join("")}
function copyResults(){navigator.clipboard.writeText(state.results.map(r=>`${r.name}\nGun: ${r.weapon.name}\nRubles: ${fmt(r.money)}\nEstimated Cost: ${fmt(r.total)}\nTwist: ${r.challenge}`).join("\n\n"))}
bind(); render();
});
