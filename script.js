document.addEventListener("DOMContentLoaded", () => {
const maps=["Customs","Woods","Factory","Interchange","Reserve","Shoreline","Lighthouse","Streets","Ground Zero","Labs","Random Map"];
const starterProfiles=[
  {id:crypto.randomUUID(),name:"CajunVeteran",level:42,money:2500000},
  {id:crypto.randomUUID(),name:"SilverFoxJonesy",level:37,money:1800000},
  {id:crypto.randomUUID(),name:"WickedWill",level:28,money:1200000},
  {id:crypto.randomUUID(),name:"BackwoodBeast",level:22,money:900000},
  {id:crypto.randomUUID(),name:"SwampyFPS",level:31,money:1500000},
  {id:crypto.randomUUID(),name:"BayouBandit",level:16,money:600000}
];
const starterEventPlayers=starterProfiles.map((p,i)=>({id:crypto.randomUUID(),profileId:p.id,name:p.name,level:p.level,money:p.money,ready:i<4,active:i<4}));
const weapons=[
{name:"Glock 17",category:"Pistol",cartridge:"9x19mm Parabellum",min:1,cost:26000,ammo:"9x19mm Parabellum best available",style:"Compact sidearm",image:"Glock17.webp"},
{name:"MP-443 Grach",category:"Pistol",cartridge:"9x19mm Parabellum",min:1,cost:23000,ammo:"9x19mm Parabellum best available",style:"Russian service pistol",image:"MP-443.webp"},
{name:"APS",category:"Pistol",cartridge:"9x18mm Makarov",min:1,cost:24000,ammo:"9x18mm Makarov best available",style:"Full-auto sidearm",image:"APS.webp"},
{name:"MP-133 Shotgun",category:"Shotgun",cartridge:"12/70",min:1,cost:25000,ammo:"12/70 best available",style:"Budget pump-action",image:"Mr133.webp"},
{name:"TOZ-106",category:"Shotgun",cartridge:"20/70",min:1,cost:18000,ammo:"20/70 best available",style:"Tiny pain stick",image:"Toz.webp"},
{name:"SKS",category:"Assault Carbine",cartridge:"7.62x39mm",min:1,cost:35000,ammo:"7.62x39mm best available",style:"Reliable budget",image:"Opsks.webp"},
{name:"OP-SKS",category:"Assault Carbine",cartridge:"7.62x39mm",min:1,cost:42000,ammo:"7.62x39mm best available",style:"Classic hunter",image:"Opsks.webp"},
{name:"Mosin Infantry",category:"Bolt-Action Rifle",cartridge:"7.62x54mmR",min:1,cost:45000,ammo:"7.62x54mmR best available",style:"Classic pain",image:"MosinInfantry.webp"},
{name:"M700",category:"Bolt-Action Rifle",cartridge:"7.62x51mm NATO",min:15,cost:95000,ammo:"7.62x51mm NATO best available",style:"Precision bolt gun",image:"M700.webp"},
{name:"Marlin MXLR",category:"Bolt-Action Rifle",cartridge:".308 Marlin Express",min:15,cost:90000,ammo:".308 Marlin Express best available",style:"Lever rifle challenge",image:"MXLR.webp"},
{name:"Kedr-B",category:"Submachine Gun",cartridge:"9x18mm Makarov",min:1,cost:32000,ammo:"9x18mm Makarov best available",style:"Tiny SMG chaos",image:"Kedrb.webp"},
{name:"MP5",category:"Submachine Gun",cartridge:"9x19mm Parabellum",min:10,cost:65000,ammo:"9x19mm Parabellum best available",style:"Smooth SMG",image:"Mp5.webp"},
{name:"PP-19-01 Vityaz",category:"Submachine Gun",cartridge:"9x19mm Parabellum",min:10,cost:62000,ammo:"9x19mm Parabellum best available",style:"AK-style SMG",image:"Pp19.webp"},
{name:"P90",category:"Submachine Gun",cartridge:"5.7x28mm FN",min:20,cost:130000,ammo:"5.7x28mm FN best available",style:"Bullpup bullet hose",image:"P90.webp"},
{name:"SR-2M",category:"Submachine Gun",cartridge:"9x21mm Gyurza",min:20,cost:120000,ammo:"9x21mm Gyurza best available",style:"High-pen SMG",image:"SR2M.webp"},
{name:"AKS-74U",category:"Assault Rifle",cartridge:"5.45x39mm",min:10,cost:55000,ammo:"5.45x39mm best available",style:"Compact fighter",image:"Aks74u.webp"},
{name:"AKM",category:"Assault Rifle",cartridge:"7.62x39mm",min:15,cost:85000,ammo:"7.62x39mm best available",style:"Hard hitter",image:"Akm.webp"},
{name:"M4A1",category:"Assault Rifle",cartridge:"5.56x45mm NATO",min:15,cost:95000,ammo:"5.56x45mm NATO best available",style:"NATO classic",image:"M4a1.webp"},
{name:"ADAR 2-15",category:"Assault Carbine",cartridge:"5.56x45mm NATO",min:10,cost:65000,ammo:"5.56x45mm NATO best available",style:"Semi-auto precision",image:"ADAR2.webp"},
{name:"AUG A1",category:"Assault Rifle",cartridge:"5.56x45mm NATO",min:18,cost:110000,ammo:"5.56x45mm NATO best available",style:"Bullpup classic",image:"AUG_A1.webp"},
{name:"MDR 5.56",category:"Assault Rifle",cartridge:"5.56x45mm NATO",min:20,cost:130000,ammo:"5.56x45mm NATO best available",style:"Modern bullpup",image:"MDR.webp"},
{name:"G36",category:"Assault Rifle",cartridge:"5.56x45mm NATO",min:20,cost:120000,ammo:"5.56x45mm NATO best available",style:"Polymer rifle",image:"G36.webp"},
{name:"MCX .300 Blackout",category:"Assault Rifle",cartridge:".300 Blackout",min:30,cost:175000,ammo:".300 Blackout best available",style:"CajunVeteran special",image:"300_Blackout_MCX.webp"},
{name:"RD-704",category:"Assault Rifle",cartridge:"7.62x39mm",min:30,cost:185000,ammo:"7.62x39mm best available",style:"AK beast",image:"RD-704.webp"},
{name:"RPK-16",category:"Light Machine Gun",cartridge:"5.45x39mm",min:25,cost:140000,ammo:"5.45x39mm best available",style:"Squad support",image:"RPK-16.webp"},
{name:"RFB",category:"Assault Carbine",cartridge:"7.62x51mm NATO",min:20,cost:110000,ammo:"7.62x51mm NATO best available",style:"Budget puncher",image:"KT_RFB.webp"},
{name:"SA-58",category:"Assault Rifle",cartridge:"7.62x51mm NATO",min:37,cost:210000,ammo:"7.62x51mm NATO best available",style:"Recoil rodeo",image:"SA-58.webp"},
{name:"RSASS",category:"Designated Marksman Rifle",cartridge:"7.62x51mm NATO",min:35,cost:240000,ammo:"7.62x51mm NATO best available",style:"High-end marksman",image:"Rsass.webp"}
];
const armor=[{name:"No armor",min:1,cost:0},{name:"PACA or soft armor",min:1,cost:25000},{name:"Class 3 armor",min:10,cost:45000},{name:"Class 4 armor",min:15,cost:85000},{name:"Class 5 armor",min:30,cost:140000}];
const helmets=[{name:"No helmet",min:1,cost:0},{name:"Basic helmet",min:10,cost:25000},{name:"Class 4 helmet",min:15,cost:60000},{name:"Helmet with face shield",min:30,cost:120000}];
const rigs=[{name:"Scav vest",cost:10000},{name:"Bank robber rig",cost:15000},{name:"Any small rig",cost:25000},{name:"Any medium rig",cost:35000},{name:"Any armored rig",cost:70000}];
const bags=[{name:"No backpack",cost:0},{name:"Sling",cost:8000},{name:"T-Bag",cost:12000},{name:"Day Pack",cost:18000},{name:"Berkut/Scav BP",cost:30000}];
const challenges=["Must push first gunshot heard","No looting until first kill","One teammate calls all extracts","Boss hunt if boss spawns","Only one mag loaded at a time","Grenades must be thrown dramatically"];
const defaultTwists=challenges.map(text=>({text,type:"both"}));
let currentEventCode=cleanCode(localStorage.getItem("ctc-current-event")||"CV7264");
let profiles=[];let state;let selectedProfileId="";let selectedContractIndex=0;
function cleanCode(v){return String(v||"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,16)||"CV7264"}
function allEvents(){try{return JSON.parse(localStorage.getItem("ctc-events")||"{}")}catch{return {}}}
function saveEvents(obj){localStorage.setItem("ctc-events",JSON.stringify(obj))}
function loadProfiles(){try{profiles=JSON.parse(localStorage.getItem("ctc-streamer-profiles")||"[]")}catch{profiles=[]}if(!profiles.length){profiles=structuredClone(starterProfiles);saveProfiles()}migrateEventPlayersToProfiles();}
function saveProfiles(){localStorage.setItem("ctc-streamer-profiles",JSON.stringify(profiles))}
function findProfileByName(name){return profiles.find(p=>p.name.toLowerCase()===String(name||"").toLowerCase())}
function createProfile(name, level=1, money=100000){name=String(name||"").trim();if(!name)return null;let existing=findProfileByName(name);if(existing)return existing;const p={id:crypto.randomUUID(),name,level:Number(level)||1,money:Number(money)||100000};profiles.push(p);saveProfiles();return p}
function migrateEventPlayersToProfiles(){let changed=false;let events=allEvents();Object.values(events).forEach(e=>(e.players||[]).forEach(pl=>{let prof=pl.profileId?profiles.find(p=>p.id===pl.profileId):findProfileByName(pl.name);if(!prof){prof=createProfile(pl.name,pl.level,pl.money);changed=true}if(prof&&!pl.profileId){pl.profileId=prof.id;changed=true}}));if(changed)saveEvents(events)}
function newEvent(code){return {eventCode:code,eventName:"Friday Night Mayhem",map:"Customs",time:"Day",players:structuredClone(starterEventPlayers),results:[],rolledAt:"",rule:pick(defaultTwists),twistMode:"individual",twists:structuredClone(defaultTwists)}}
function loadEvent(code){const events=allEvents();const evt=events[code]||newEvent(code);return normalizeEvent(evt)}
function normalizeEvent(evt){if(!evt.twistMode)evt.twistMode="individual";if(!Array.isArray(evt.twists)||!evt.twists.length)evt.twists=structuredClone(defaultTwists);evt.twists=evt.twists.map(t=>typeof t==="string"?{text:t,type:"both"}:{text:t.text||String(t),type:t.type||"both"});if(!evt.rule)evt.rule=pick(evt.twists).text;return evt}
function save(){const events=allEvents();state.eventCode=currentEventCode;events[currentEventCode]=state;saveEvents(events);localStorage.setItem("ctc-current-event",currentEventCode)}
function createEvent(code){code=cleanCode(code);const events=allEvents();if(!events[code])events[code]={eventCode:code,eventName:"Friday Night Mayhem",map:"Customs",time:"Day",players:[],results:[],rolledAt:"",rule:pick(defaultTwists),twistMode:"individual",twists:structuredClone(defaultTwists)};saveEvents(events);switchEvent(code)}
function switchEvent(code){save();currentEventCode=cleanCode(code);state=loadEvent(currentEventCode);selectedProfileId=profiles[0]?.id||"";selectedContractIndex=0;render()}
function deleteEvent(code){code=cleanCode(code);const events=allEvents();if(!events[code])return;if(!confirm(`Delete event ${code}? This removes the event roster and contracts. Streamer names stay saved.`))return;delete events[code];saveEvents(events);const remaining=Object.keys(events);currentEventCode=remaining[0]||"CV7264";state=loadEvent(currentEventCode);save();selectedProfileId=profiles[0]?.id||"";render()}
function pick(a){return a[Math.floor(Math.random()*a.length)]}function fmt(n){return `₽ ${new Intl.NumberFormat("en-US").format(Number(n||0))}`}function parseMoney(v){return Number(String(v||"").replace(/[^0-9]/g,""))||0}function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]))}function activePlayers(){return state.players.filter(p=>p.active!==false)}function allReady(){const a=activePlayers();return a.length>0&&a.every(p=>p.ready&&p.name&&p.level>0&&p.money>0)}function allowed(list,level){return list.filter(x=>(x.min||1)<=level)}function total(k){return k.weapon.cost+k.armor.cost+k.helmet.cost+k.rig.cost+k.bag.cost}function buildKit(level){return {weapon:pick(allowed(weapons,level)),armor:pick(allowed(armor,level)),helmet:pick(allowed(helmets,level)),rig:pick(rigs),bag:pick(bags)}}function makeLoadout(p, assignedTwist){let kit=null;for(let i=0;i<80;i++){const k=buildKit(Number(p.level));if(total(k)<=Number(p.money)){kit=k;break}}if(!kit){kit={weapon:allowed(weapons,p.level)[0],armor:armor[0],helmet:helmets[0],rig:rigs[0],bag:bags[0]}}return {id:crypto.randomUUID(),name:p.name,level:p.level,money:p.money,...kit,total:total(kit),challenge:assignedTwist||"No Contract Twist"}}
function bind(){mapName.innerHTML=maps.map(m=>`<option>${m}</option>`).join("");document.querySelectorAll(".nav-btn,[data-view]").forEach(b=>b.onclick=()=>setView(b.dataset.view));loadSelectedEventBtn.onclick=()=>switchEvent(eventSelect.value);createEventBtn.onclick=()=>createEvent(eventCodeInput.value);newCodeBtn.onclick=()=>{eventCodeInput.value="CV"+Math.floor(100000+Math.random()*900000);createEvent(eventCodeInput.value)};deleteCurrentEventBtn.onclick=()=>deleteEvent(currentEventCode);streamerLoadEventBtn.onclick=()=>switchEvent(streamerEventSelect.value);addStreamerBtn.onclick=()=>addStreamerToEventPrompt();addSelectedStreamerBtn.onclick=()=>addSelectedStreamerToEvent();removeSelectedStreamerBtn.onclick=()=>removeSelectedStreamerFromEvent();createStreamerBtn.onclick=()=>{const p=createProfile(newStreamerName.value);if(!p)return;selectedProfileId=p.id;newStreamerName.value="";render()};eventName.oninput=e=>{state.eventName=e.target.value;save()};mapName.onchange=e=>{state.map=e.target.value;render()};dayBtn.onclick=()=>{state.time="Day";render()};nightBtn.onclick=()=>{state.time="Night";render()};randomizeBtn.onclick=roll;dashRerollBtn.onclick=roll;copyBtn.onclick=copyResults;streamerSelect.onchange=e=>{selectedProfileId=e.target.value;renderStreamer()};streamerNameInput.oninput=e=>editSelectedProfileName(e.target.value);streamerLevelInput.onchange=e=>updateSelectedForEvent({level:Number(e.target.value)});streamerMoneyInput.onfocus=e=>e.target.value=parseMoney(e.target.value)||"";streamerMoneyInput.onchange=e=>updateSelectedForEvent({money:parseMoney(e.target.value)});submitReadyBtn.onclick=()=>updateSelectedForEvent({ready:true},true);refreshReportBtn.onclick=renderReport;twistModeSelect.onchange=e=>{state.twistMode=e.target.value;render()};addTwistBtn.onclick=addTwist;removeCheckedTwistsBtn.onclick=removeCheckedTwists}
function setView(id){document.querySelectorAll(".view").forEach(v=>v.classList.remove("active-view"));document.getElementById(id).classList.add("active-view");document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.view===id));render()}
function playerForProfile(profileId){return state.players.find(p=>p.profileId===profileId)}
function addProfileToCurrentEvent(profile){let existing=playerForProfile(profile.id);if(existing)return existing;let player={id:crypto.randomUUID(),profileId:profile.id,name:profile.name,level:profile.level||1,money:profile.money||100000,ready:false,active:true};state.players.push(player);return player}
function addStreamerToEventPrompt(){let name=prompt("Streamer name to add to this event");if(!name)return;let profile=createProfile(name);addProfileToCurrentEvent(profile);selectedProfileId=profile.id;render()}
function removePlayer(id){const p=state.players.find(x=>x.id===id);if(!p)return;if(!confirm(`Remove ${p.name} from event ${currentEventCode}? Streamer name will stay in the system.`))return;state.players=state.players.filter(x=>x.id!==id);render()}
function updatePlayer(id,patch,rerender=true){state.players=state.players.map(p=>p.id===id?{...p,...patch}:p);save();if(rerender)render()}
function updateSelectedForEvent(patch,markReady=false){let prof=profiles.find(p=>p.id===selectedProfileId);if(!prof)return;let player=addProfileToCurrentEvent(prof);if(patch.level!==undefined)prof.level=patch.level;if(patch.money!==undefined)prof.money=patch.money;saveProfiles();updatePlayer(player.id,{...patch,ready:markReady?true:(patch.ready??player.ready)})}
function editSelectedProfileName(name){let prof=profiles.find(p=>p.id===selectedProfileId);if(!prof)return;prof.name=name;saveProfiles();let player=playerForProfile(prof.id);if(player)updatePlayer(player.id,{name},false);save();renderReport()}
function renderEventSelect(){let events=allEvents();if(!events[currentEventCode]){events[currentEventCode]=state;saveEvents(events)}const codes=Object.keys(events).sort();eventSelect.innerHTML=codes.map(c=>{const e=events[c];const count=(e.players||[]).length;return `<option value="${c}" ${c===currentEventCode?"selected":""}>${c} - ${esc(e.eventName||"Friday Night Mayhem")} (${count})</option>`}).join("");}

function renderEventDropdowns(){
  const events=allEvents();
  if(!events[currentEventCode]){events[currentEventCode]=state;saveEvents(events)}
  const codes=Object.keys(events).sort();
  if(typeof streamerEventSelect!=="undefined") streamerEventSelect.innerHTML=codes.map(c=>`<option value="${c}" ${c===currentEventCode?"selected":""}>${c} - ${esc(events[c].eventName||"Friday Night Mayhem")}</option>`).join("");
}
function renderAdminStreamerDropdowns(){
  const opts=profiles.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join("");
  if(typeof adminStreamerSelect!=="undefined") adminStreamerSelect.innerHTML=opts||'<option value="">No saved streamers</option>';
}
function addSelectedStreamerToEvent(){
  const prof=profiles.find(p=>p.id===adminStreamerSelect.value);
  if(!prof)return;
  addProfileToCurrentEvent(prof);
  selectedProfileId=prof.id;
  render();
}
function removeSelectedStreamerFromEvent(){
  const prof=profiles.find(p=>p.id===adminStreamerSelect.value);
  if(!prof)return;
  const player=state.players.find(p=>p.profileId===prof.id || p.name===prof.name);
  if(!player){alert(`${prof.name} is not assigned to event ${currentEventCode}.`);return;}
  if(!confirm(`Remove ${prof.name} from event ${currentEventCode}? Streamer stays saved in the system.`))return;
  state.players=state.players.filter(p=>p.id!==player.id);
  render();
}
function deleteSelectedStreamer(){
  const prof=profiles.find(p=>p.id===deleteStreamerSelect.value);
  if(!prof)return;
  if(!confirm(`Delete streamer ${prof.name} from the system? This removes the streamer from all events.`))return;
  profiles=profiles.filter(p=>p.id!==prof.id);
  saveProfiles();
  const events=allEvents();
  Object.keys(events).forEach(code=>{events[code].players=(events[code].players||[]).filter(pl=>pl.profileId!==prof.id && pl.name!==prof.name)});
  saveEvents(events);
  state=loadEvent(currentEventCode);
  selectedProfileId=profiles[0]?.id||"";
  render();
}


function renderTwistEditor(){
  if(typeof twistModeSelect!=="undefined")twistModeSelect.value=state.twistMode||"individual";
  let twists=(state.twists&&state.twists.length?state.twists:defaultTwists).map(t=>typeof t==="string"?{text:t,type:"both"}:t);
  state.twists=twists;
  if(typeof twistList==="undefined")return;
  twistList.innerHTML=twists.map((t,i)=>`<div class="twist-row"><input type="checkbox" data-twist-check="${i}"><input type="text" value="${esc(t.text)}" data-twist-edit="${i}"><select class="twist-type-select" data-twist-type="${i}"><option value="both" ${t.type==="both"?"selected":""}>Both</option><option value="player" ${t.type==="player"?"selected":""}>Player</option><option value="squad" ${t.type==="squad"?"selected":""}>Squad</option></select></div>`).join("");
  document.querySelectorAll('[data-twist-edit]').forEach(input=>input.onchange=()=>{const idx=Number(input.dataset.twistEdit);state.twists[idx].text=input.value.trim()||state.twists[idx].text;save();renderTwistEditor()});
  document.querySelectorAll('[data-twist-type]').forEach(sel=>sel.onchange=()=>{const idx=Number(sel.dataset.twistType);state.twists[idx].type=sel.value;save();renderTwistEditor()});
}
function addTwist(){const text=(newTwistInput.value||"").trim();if(!text)return;state.twists=state.twists||structuredClone(defaultTwists);state.twists=state.twists.map(t=>typeof t==="string"?{text:t,type:"both"}:t);state.twists.push({text,type:newTwistType.value||"both"});newTwistInput.value="";newTwistType.value="both";render()}
function removeCheckedTwists(){const checked=[...document.querySelectorAll('[data-twist-check]:checked')].map(x=>Number(x.dataset.twistCheck));if(!checked.length)return;state.twists=state.twists.filter((_,i)=>!checked.includes(i));if(!state.twists.length)state.twists=structuredClone(defaultTwists);render()}

function render(){eventCodeTop.textContent=currentEventCode;eventCodePlayer.textContent=currentEventCode;eventCodeInput.value=currentEventCode;renderEventDropdowns();eventName.value=state.eventName;mapName.value=state.map;dayBtn.classList.toggle("active",state.time==="Day");nightBtn.classList.toggle("active",state.time==="Night");renderEventSelect();renderAdminStreamerDropdowns();renderTwistEditor();renderAdmin();renderStreamer();renderDashboard();renderReport();save()}
function row(p){const out=p.active===false;return `<tr><td><span class="status-badge ${out?"out":""}">${out?"Resting":"Playing"}</span></td><td><div class="streamer-cell"><span class="avatar">${esc((p.name||"?")[0])}</span><input class="name-input" data-field="name" data-id="${p.id}" value="${esc(p.name)}"></div></td><td><input class="row-input" type="number" data-field="level" data-id="${p.id}" value="${p.level}"></td><td><input class="money-input" data-field="money" data-id="${p.id}" value="${fmt(p.money)}"></td><td>${out?'<span class="not-required">—</span>':`<button class="action-btn ready-btn ${p.ready?"is-ready":""}" data-ready="${p.id}">${p.ready?"✓ Ready":"Check"}</button>`}</td><td><div class="row-actions"><button class="action-btn play-btn" data-active="${p.id}">${out?"Playing":"Resting"}</button><button class="action-btn trash-btn danger-btn" title="Remove from event" data-remove="${p.id}">🗑</button></div></td></tr>`}
function renderAdmin(){const active=activePlayers();const inactive=state.players.filter(p=>p.active===false);readyPill.textContent=`${active.filter(p=>p.ready).length}/${active.length} Ready`;randomizeBtn.disabled=!allReady();dashRerollBtn.disabled=!allReady();playingBody.innerHTML=active.map(row).join("")||'<tr><td colspan="6" class="muted">No playing streamers.</td></tr>';notPlayingBody.innerHTML=inactive.map(row).join("")||'<tr><td colspan="6" class="muted">No streamers are marked Not Playing.</td></tr>';notPlayingCount.textContent=inactive.length;wireRows()}
function wireRows(){document.querySelectorAll("[data-field]").forEach(i=>{i.onfocus=e=>{if(i.dataset.field==="money")e.target.value=parseMoney(e.target.value)||""};i.onchange=e=>{const p=state.players.find(x=>x.id===i.dataset.id);const f=i.dataset.field;let val=f==="name"?e.target.value:f==="money"?parseMoney(e.target.value):Number(e.target.value);if(f==="name"&&p){let prof=profiles.find(pr=>pr.id===p.profileId);if(prof){prof.name=val;saveProfiles();}}if(f==="level"&&p){let prof=profiles.find(pr=>pr.id===p.profileId);if(prof){prof.level=val;saveProfiles();}}if(f==="money"&&p){let prof=profiles.find(pr=>pr.id===p.profileId);if(prof){prof.money=val;saveProfiles();}}updatePlayer(i.dataset.id,{[f]:val})}});document.querySelectorAll("[data-ready]").forEach(b=>b.onclick=()=>{const p=state.players.find(x=>x.id===b.dataset.ready);updatePlayer(p.id,{ready:!p.ready})});document.querySelectorAll("[data-active]").forEach(b=>b.onclick=()=>{const p=state.players.find(x=>x.id===b.dataset.active);updatePlayer(p.id,{active:!(p.active!==false),ready:false})});document.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>removePlayer(b.dataset.remove))}
function renderStreamer(){streamerSelect.innerHTML=profiles.map(p=>{let assigned=playerForProfile(p.id);return `<option value="${p.id}" ${p.id===selectedProfileId?"selected":""}>${esc(p.name)}${assigned&&assigned.active===false?" - Not Playing":assigned?" - In Event":""}</option>`}).join("");if(!selectedProfileId&&profiles[0])selectedProfileId=profiles[0].id;let prof=profiles.find(p=>p.id===selectedProfileId)||profiles[0];if(!prof)return;selectedProfileId=prof.id;streamerSelect.value=prof.id;let player=playerForProfile(prof.id);streamerNameInput.value=prof.name;streamerLevelInput.value=player?player.level:(prof.level||1);streamerMoneyInput.value=fmt(player?player.money:(prof.money||100000));streamerStatus.className=`status-card ${player&&player.ready?"ready":""} ${player&&player.active===false?"out":""}`;streamerStatus.innerHTML=player?`<strong>${player.active===false?"Not Playing This Run":player.ready?"Ready for Contract":"Joined - Not Ready Yet"}</strong><p>${player.active===false?"Admin has this streamer sitting out this roll.":"Update info and submit when ready."}</p>`:`<strong>Not In This Event Yet</strong><p>Submit and Mark Ready will add this streamer to event ${currentEventCode}.</p>`;submitReadyBtn.disabled=player&&player.active===false}
function twistText(t){return typeof t==="string"?t:(t&&t.text)||"No Contract Twist"}
function eligibleTwists(mode){const twists=(state.twists&&state.twists.length?state.twists:defaultTwists).map(t=>typeof t==="string"?{text:t,type:"both"}:t);if(mode==="squad")return twists.filter(t=>t.type==="squad"||t.type==="both");if(mode==="individual")return twists.filter(t=>t.type==="player"||t.type==="both");return []}
function roll(){if(!allReady())return;let squadPool=eligibleTwists("squad");let playerPool=eligibleTwists("individual");if(state.twistMode==="squad"&&!squadPool.length){alert("No Squad or Both contract twists are available.");return}if(state.twistMode==="individual"&&!playerPool.length){alert("No Player or Both contract twists are available.");return}let squadTwist=state.twistMode==="squad"?twistText(pick(squadPool)):"";state.rule=state.twistMode==="squad"?squadTwist:"";state.results=activePlayers().map(p=>{let twist=state.twistMode==="off"?"No Contract Twist":state.twistMode==="squad"?squadTwist:twistText(pick(playerPool));return makeLoadout(p,twist)});state.rolledAt=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});selectedContractIndex=0;setView("dashboard")}
function twistModeLabel(){if(state.twistMode==="squad")return "One Twist For Squad";if(state.twistMode==="off")return "Off";return "One Twist Per Streamer"}
function renderDashboard(){
  dashTitle.textContent=`${state.map} - ${state.time} Raid`;
  if(typeof dashEventCode!=="undefined")dashEventCode.textContent=currentEventCode;
  if(typeof dashTwistMode!=="undefined")dashTwistMode.textContent=twistModeLabel();
  if(typeof dashStatus!=="undefined")dashStatus.textContent=state.results.length?"Rolled":"Not Rolled";
  squadRule.textContent=state.twistMode==="squad"&&state.rule?`Squad Contract Twist: ${state.rule}`:state.twistMode==="off"?"Contract Twist Mode: Off":"Contract Twist Mode: One Twist Per Streamer";
  rolledAt.textContent=state.rolledAt?`Last rolled at ${state.rolledAt}`:"";
  copyBtn.disabled=!state.results.length;
  if(!state.results.length){dashboardResults.className="results-empty dashboard-empty";dashboardResults.innerHTML="No contracts assigned yet. Admin must click <b>Randomize Loadouts</b>.";return}
  if(selectedContractIndex>=state.results.length)selectedContractIndex=0;
  const selected=state.results[selectedContractIndex];
  dashboardResults.className="dashboard-split";
  dashboardResults.innerHTML=`<section class="card contract-roster-panel"><div class="contract-roster-title"><h3>Contract Roster</h3><span class="pill">${state.results.length}/${state.results.length} Ready</span></div><div class="contract-roster-list">${state.results.map((r,i)=>`<button class="contract-roster-item ${i===selectedContractIndex?'active':''}" data-contract-index="${i}"><span class="avatar">${esc((r.name||'?')[0])}</span><span class="roster-main"><strong>${esc(r.name)}</strong><span>Level ${r.level} · ${fmt(r.money)} · ${esc(weaponCategory(r.weapon))} · ${esc(r.weapon.name)}</span></span><span class="roster-num">#${i+1}</span></button>`).join("")}</div><div class="selected-rule" style="margin-top:16px"><span>The Rule</span><b>You may mod your weapon however you want, but you must use the assigned gun.</b></div></section><section class="card selected-contract-panel">${selectedContractHtml(selected,selectedContractIndex)}</section>`;
  document.querySelectorAll('[data-contract-index]').forEach(b=>b.onclick=()=>{selectedContractIndex=Number(b.dataset.contractIndex);renderDashboard()});
}

function gunImageFor(weaponName){
  const name=String(weaponName||"").toLowerCase();
  const map=[
    ["mp-133","mp133"],
    ["toz","toz106"],
    ["mosin","mosin"],
    ["op-sks","opsks"],
    ["sks","sks"],
    ["vpo-136","vpo136"],
    ["kedr","kedr"],
    ["mp5","mp5"],
    ["aks-74u","aks74u"],
    ["akm","akm"],
    ["m4a1","m4a1"],
    ["rfb","rfb"],
    ["g36","g36"],
    ["mpx","mpx"],
    ["sr-2m","sr2m"],
    ["sr2m","sr2m"],
    ["rd-704","rd704"],
    ["mcx","mcx"],
    ["sa-58","sa58"],
    ["sa58","sa58"],
    ["rsass","rsass"]
  ];
  const found=map.find(([key])=>name.includes(key));
  return `images/guns/${found?found[1]:"default-rifle"}.png`;
}

function selectedContractHtml(r,i){
  const weapon=lookupWeapon(r.weapon);
  const gunImg=gunImageFor(weapon.name||r.weapon.name);
  return `<div class="selected-top"><div><span class="roster-num">#${i+1}</span><h3>${esc(r.name)}</h3><div class="selected-meta"><span>Level ${r.level}</span><span>${fmt(r.money)}</span></div></div></div><div class="weapon-hero weapon-hero-with-image"><div class="weapon-copy"><span>Assigned Weapon</span><h4>${esc(weapon.name||r.weapon.name)}</h4><div class="weapon-meta-row"><span>${esc(weaponCategory(weapon))}</span><span>${esc(weaponCartridge(weapon))}</span></div><p>${esc(weaponStyle(weapon))} · ${esc(weaponCartridge(weapon))} best available</p><b class="yellow">Mod it however you want, but it must stay this gun.</b></div><div class="weapon-image-wrap"><img class="weapon-image" src="${gunImg}" alt="${esc(weapon.name||r.weapon.name)} image" onerror="this.onerror=null;this.src='images/guns/default-rifle.webp';"></div></div><div class="selected-gear-grid"><div class="selected-gear"><span>Armor</span><b>${esc(r.armor.name)}</b></div><div class="selected-gear"><span>Helmet</span><b>${esc(r.helmet.name)}</b></div><div class="selected-gear"><span>Rig</span><b>${esc(r.rig.name)}</b></div><div class="selected-gear"><span>Backpack</span><b>${esc(r.bag.name)}</b></div></div><div class="selected-bottom"><div class="selected-cost"><span>Estimated Kit Cost</span><b>${fmt(r.total)}</b></div><div class="selected-twist"><span>Contract Twist</span><b>${esc(r.challenge)}</b></div><div class="selected-rule"><span>The Rule</span><b>You may mod your weapon however you want, but you must use the assigned gun.</b></div></div>`
}
function renderReport(){const events=allEvents();const codes=Object.keys(events).sort();const eventSection=!codes.length?'<div class="results-empty">No events saved yet.</div>':codes.map(code=>{const e=events[code];const players=e.players||[];const playing=players.filter(p=>p.active!==false);const out=players.filter(p=>p.active===false);return `<article class="event-report-card"><div class="event-report-head"><div><h3>${esc(code)}</h3><div class="event-report-meta">${esc(e.eventName||"Friday Night Mayhem")} · ${esc(e.map||"Customs")} · ${esc(e.time||"Day")} · ${players.length} names</div></div><div class="event-actions-cell"><button class="action-btn" data-report-load="${code}">Load</button><button class="action-btn danger-btn" data-report-delete="${code}">Delete Event</button></div></div><div class="report-columns"><div class="report-list"><h4>Playing (${playing.length})</h4>${listNames(playing)}</div><div class="report-list"><h4>Not Playing (${out.length})</h4>${listNames(out)}</div></div></article>`}).join("");const streamerSection=`<div class="section-break"><h3>Streamer List <span class="count">${profiles.length}</span></h3></div>`+profiles.map(prof=>{let assigned=[];codes.forEach(code=>{let ep=(events[code].players||[]).find(p=>p.profileId===prof.id||p.name===prof.name);if(ep)assigned.push({code,player:ep,event:events[code]})});return `<article class="event-report-card"><div class="event-report-head"><div><h3>${esc(prof.name)}</h3><div class="event-report-meta">Default: Level ${prof.level||1} · ${fmt(prof.money||100000)} · Assigned to ${assigned.length} events</div></div></div>${assigned.length?`<div class="report-list"><ul>${assigned.map(a=>`<li><strong>${esc(a.code)}</strong> <span class="small-muted">${esc(a.event.eventName||'Friday Night Mayhem')} · ${a.player.active===false?'Not Playing':'Playing'} · L${a.player.level} · ${fmt(a.player.money)}</span> <button class="action-btn danger-btn" data-remove-assignment="${a.code}|${a.player.id}">Remove From Event</button></li>`).join('')}</ul></div>`:'<div class="small-muted">Not assigned to any events.</div>'}</article>`}).join('');reportArea.innerHTML=`<h3>Event List</h3>${eventSection}${streamerSection}`;document.querySelectorAll('[data-report-load]').forEach(b=>b.onclick=()=>{switchEvent(b.dataset.reportLoad);setView('admin')});document.querySelectorAll('[data-report-delete]').forEach(b=>b.onclick=()=>deleteEvent(b.dataset.reportDelete));document.querySelectorAll('[data-remove-assignment]').forEach(b=>b.onclick=()=>{const [code,id]=b.dataset.removeAssignment.split('|');removeAssignmentFromEvent(code,id)})}
function removeAssignmentFromEvent(code,id){let events=allEvents();let e=events[code];if(!e)return;let p=(e.players||[]).find(x=>x.id===id);if(!p)return;if(!confirm(`Remove ${p.name} from event ${code}? Streamer name stays in the system.`))return;e.players=e.players.filter(x=>x.id!==id);events[code]=e;saveEvents(events);if(code===currentEventCode){state=e;state.eventCode=code}render()}
function listNames(players){return players.length?`<ul>${players.map(p=>`<li>${esc(p.name)} <span class="small-muted">L${p.level} · ${fmt(p.money)}</span></li>`).join("")}</ul>`:'<div class="small-muted">None</div>'}
function copyResults(){navigator.clipboard.writeText(state.results.map(r=>`${r.name}\nGun: ${r.weapon.name}\nRubles: ${fmt(r.money)}\nEstimated Cost: ${fmt(r.total)}\nTwist: ${r.challenge}`).join("\n\n"))}
loadProfiles();state=loadEvent(currentEventCode);selectedProfileId=profiles[0]?.id||"";bind();render();
});