const weaponPool = [
  { name: "MP-133 Shotgun", minLevel: 1, cost: 25000, style: "Budget chaos", ammo: "12/70 buckshot or slugs", note: "Close range pain. Push buildings." },
  { name: "TOZ-106", minLevel: 1, cost: 12000, style: "Punishment pick", ammo: "20/70 buckshot", note: "Tiny shotgun. Big comedy." },
  { name: "Mosin Infantry", minLevel: 1, cost: 45000, style: "Classic pain", ammo: "7.62x54R basic", note: "One good shot changes the raid." },
  { name: "SKS", minLevel: 1, cost: 35000, style: "Early wipe reliable", ammo: "7.62x39 PS or best available", note: "Simple, cheap, effective." },
  { name: "VPO-136", minLevel: 1, cost: 38000, style: "Semi-auto AK", ammo: "7.62x39 best available", note: "Make every shot count." },
  { name: "PP-19 Klin/Kedr", minLevel: 5, cost: 32000, style: "Leg meta gremlin", ammo: "9x18 best available", note: "Aim low. Laugh often." },
  { name: "MP5", minLevel: 10, cost: 65000, style: "Streamer smooth", ammo: "9x19 best available", note: "Clean recoil for quick fights." },
  { name: "AKS-74U", minLevel: 10, cost: 55000, style: "Compact Customs fighter", ammo: "5.45x39 best available", note: "Great for dorms and tight pushes." },
  { name: "OP-SKS", minLevel: 15, cost: 60000, style: "Scoped budget hunter", ammo: "7.62x39 best available", note: "Take a cheap optic if allowed." },
  { name: "AKM", minLevel: 15, cost: 85000, style: "Hard-hitting bruiser", ammo: "7.62x39 best available", note: "Loud, angry, effective." },
  { name: "M4A1", minLevel: 15, cost: 95000, style: "NATO classic", ammo: "5.56 best available", note: "Run it stock or lightly kitted." },
  { name: "RFB", minLevel: 20, cost: 110000, style: "Budget 7.62 NATO", ammo: "7.62x51 best available", note: "Semi-auto puncher." },
  { name: "G36", minLevel: 20, cost: 100000, style: "Reliable 5.56", ammo: "5.56 best available", note: "Good mid-tier event gun." },
  { name: "MPX", minLevel: 23, cost: 120000, style: "Fancy SMG", ammo: "9x19 best available", note: "Stylish and controllable." },
  { name: "SR-2M Veresk", minLevel: 26, cost: 140000, style: "Boss melter", ammo: "9x21 best available", note: "Fast, nasty, close range." },
  { name: "RD-704", minLevel: 30, cost: 185000, style: "Meta-ish AK beast", ammo: "7.62x39 best available", note: "Let the viewers judge the build." },
  { name: "MCX .300 Blackout", minLevel: 30, cost: 175000, style: "CajunVeteran special", ammo: ".300 BLK best available", note: "Streamer can mod it any way they want, but it must stay an MCX." },
  { name: "SA-58", minLevel: 37, cost: 210000, style: "Recoil rodeo", ammo: "7.62x51 best available", note: "Hold on tight." },
  { name: "RSASS", minLevel: 42, cost: 260000, style: "High roller marksman", ammo: "7.62x51 best available", note: "No excuses now." },
];
const armorPool = [
  { name: "No armor", minLevel: 1, cost: 0 }, { name: "PACA or soft armor", minLevel: 1, cost: 25000 }, { name: "Class 3 armor", minLevel: 10, cost: 45000 }, { name: "Class 4 armor", minLevel: 15, cost: 85000 }, { name: "Class 5 armor", minLevel: 30, cost: 140000 }, { name: "Best armor available", minLevel: 42, cost: 220000 }
];
const helmetPool = [
  { name: "No helmet", minLevel: 1, cost: 0 }, { name: "Basic helmet", minLevel: 10, cost: 25000 }, { name: "Class 4 helmet", minLevel: 15, cost: 60000 }, { name: "Helmet with face shield if available", minLevel: 30, cost: 120000 }
];
const rigPool = [{ name: "No rig", cost: 0 }, { name: "Scav vest", cost: 10000 }, { name: "Bank robber rig", cost: 15000 }, { name: "Any small rig", cost: 25000 }, { name: "Any armored rig", cost: 70000 }, { name: "Biggest ugly rig in stash", cost: 45000 }];
const backpackPool = [{ name: "No backpack", cost: 0 }, { name: "Sling", cost: 8000 }, { name: "T-Bag", cost: 12000 }, { name: "Day Pack", cost: 18000 }, { name: "Berkut/Scav BP", cost: 30000 }, { name: "Biggest backpack available", cost: 65000 }];
const challengePool = ["Must push first gunshot heard", "No looting until first kill", "One teammate calls all extracts", "If you find food, you must eat it immediately", "First locked door found becomes the squad objective", "Boss hunt if boss spawns", "Only one mag loaded at a time", "Grenades must be thrown dramatically", "Everyone must use voicelines before fighting", "If SilverFoxJonesy says stairs, squad rotates stairs"];
const defaultState = { eventName: "CajunVeteran Raid Roulette", mapName: "Customs", timeOfDay: "Day", players: [{ id: crypto.randomUUID(), name: "CajunVeteran", level: 30, money: 550000, ready: true }, { id: crypto.randomUUID(), name: "SilverFoxJonesy", level: 15, money: 250000, ready: false }], results: [], lastRolledAt: "", squadRule: pickRandom(challengePool) };
let state = loadState();
let selectedViewerId = state.players[0]?.id || "";
function saveState(){ localStorage.setItem("cvRaidRoulette", JSON.stringify(state)); }
function loadState(){ try { return JSON.parse(localStorage.getItem("cvRaidRoulette")) || defaultState; } catch { return defaultState; } }
function pickRandom(items){ return items[Math.floor(Math.random()*items.length)]; }
function money(value){ return new Intl.NumberFormat("en-US").format(Number(value || 0)); }
function allowedByLevelAndMoney(list, level, budget){ return list.filter(item => item.minLevel <= Number(level || 1) && item.cost <= Number(budget || 0)); }
function allowedGear(list, budget, currentTotal=0){ return list.filter(item => item.cost + currentTotal <= Number(budget || 0)); }
function allReady(){ return state.players.length > 0 && state.players.every(p => p.ready && p.name && Number(p.level) > 0 && Number(p.money) > 0); }
function generateLoadout(player){
  const level = Number(player.level || 1); const budget = Number(player.money || 0);
  const weaponOptions = allowedByLevelAndMoney(weaponPool, level, budget);
  if(!weaponOptions.length){ return { id: crypto.randomUUID(), error: true, name: player.name || "Unnamed Raider", level, money: budget, message: "Not enough money for an available weapon. Admin may need to lower gear rules or player needs more budget." }; }
  const weapon = pickRandom(weaponOptions); let totalCost = weapon.cost;
  const armor = pickRandom(allowedGear(armorPool.filter(a => a.minLevel <= level), budget, totalCost)) || armorPool[0]; totalCost += armor.cost;
  const helmet = pickRandom(allowedGear(helmetPool.filter(h => h.minLevel <= level), budget, totalCost)) || helmetPool[0]; totalCost += helmet.cost;
  const rig = pickRandom(allowedGear(rigPool, budget, totalCost)) || rigPool[0]; totalCost += rig.cost;
  const backpack = pickRandom(allowedGear(backpackPool, budget, totalCost)) || backpackPool[0]; totalCost += backpack.cost;
  return { id: crypto.randomUUID(), name: player.name || "Unnamed Raider", level, money: budget, weapon, armor, helmet, rig, backpack, totalCost, challenge: pickRandom(challengePool) };
}
function setView(name){ document.querySelectorAll(".view").forEach(v=>v.classList.remove("active-view")); document.getElementById(`${name}View`).classList.add("active-view"); document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active", t.dataset.view===name)); render(); }
function render(){
  document.getElementById("heroTitle").textContent = state.eventName;
  document.getElementById("eventName").value = state.eventName;
  document.getElementById("mapName").value = state.mapName;
  document.getElementById("dayBtn").classList.toggle("active-choice", state.timeOfDay === "Day");
  document.getElementById("nightBtn").classList.toggle("active-choice", state.timeOfDay === "Night");
  const readyBox = document.getElementById("readyBox"); readyBox.className = `status-box ${allReady()?"ready":"waiting"}`; readyBox.innerHTML = `<strong>${allReady()?"Everyone is ready":"Waiting on players"}</strong><span>Random button is locked until every streamer has a name, level, money, and ready status.</span>`;
  document.getElementById("randomBtn").disabled = !allReady(); document.getElementById("rerollBtn").disabled = !allReady();
  renderPlayers(); renderViewer(); renderDashboard(); saveState();
}
function renderPlayers(){
  const wrap = document.getElementById("playersList"); wrap.innerHTML = "";
  state.players.forEach((p, index)=>{
    const div = document.createElement("div"); div.className = `player-card ${p.ready?"ready-player":""}`;
    div.innerHTML = `<div class="player-top"><div><span class="${p.ready?"ready-dot":"warn-dot"}">${p.ready?"●":"●"}</span> <strong>Player ${index+1}</strong></div>${state.players.length>1?`<button class="remove-btn" data-remove="${p.id}">Remove</button>`:""}</div><label>Streamer name<input data-field="name" data-id="${p.id}" value="${escapeHtml(p.name)}"></label><div class="two-col"><label>Level<input type="number" min="1" max="79" data-field="level" data-id="${p.id}" value="${p.level}"></label><label>Money / Budget<input type="number" min="0" data-field="money" data-id="${p.id}" value="${p.money}"></label></div><button class="ready-btn ${p.ready?"is-ready":""}" data-ready="${p.id}">${p.ready?"Ready - Green":"Mark Ready"}</button>`;
    wrap.appendChild(div);
  });
}
function renderViewer(){
  const select = document.getElementById("viewerSelect"); select.innerHTML = state.players.map(p=>`<option value="${p.id}" ${p.id===selectedViewerId?"selected":""}>${escapeHtml(p.name || "Unnamed Raider")}</option>`).join("");
  const p = state.players.find(x=>x.id===selectedViewerId) || state.players[0]; if(!p) return;
  selectedViewerId = p.id;
  const status = document.getElementById("viewerStatus"); status.className = `viewer-status ${p.ready?"green":""}`; status.innerHTML = `<strong>Status</strong><br>${p.ready?"Ready for Random":"Not Ready Yet"}`;
  document.getElementById("viewerForm").innerHTML = `<label>Streamer name<input data-field="name" data-id="${p.id}" value="${escapeHtml(p.name)}"></label><div class="two-col"><label>Your Level<input type="number" min="1" max="79" data-field="level" data-id="${p.id}" value="${p.level}"></label><label>Money Available for Kit<input type="number" min="0" data-field="money" data-id="${p.id}" value="${p.money}"></label></div><button class="primary" data-submit-ready="${p.id}">Submit and Mark Ready</button>`;
}
function renderDashboard(){
  document.getElementById("dashTitle").textContent = `${state.mapName} - ${state.timeOfDay} Raid`;
  document.getElementById("squadRule").textContent = `Squad Rule: ${state.squadRule}`;
  document.getElementById("rolledTime").textContent = state.lastRolledAt ? `Last rolled at ${state.lastRolledAt}` : "";
  document.getElementById("copyBtn").disabled = state.results.length === 0;
  const area = document.getElementById("resultsArea");
  if(!state.results.length){ area.className = "results-empty"; area.innerHTML = "No random loadouts yet. Admin must wait until everyone is green, then click <strong>Randomize Loadouts</strong>."; return; }
  area.className = "results-grid";
  area.innerHTML = state.results.map((r,i)=> r.error ? `<article class="result-card"><div class="result-top"><div><div class="muted">Level ${r.level} Raider · Budget ${money(r.money)} RUB</div><h2>${escapeHtml(r.name)}</h2></div><div class="badge">#${i+1}</div></div><div class="error-box"><strong>Cannot Build Loadout</strong><br>${escapeHtml(r.message)}</div></article>` : `<article class="result-card"><div class="result-top"><div><div class="muted">Level ${r.level} Raider · Budget ${money(r.money)} RUB</div><h2>${escapeHtml(r.name)}</h2></div><div class="badge">#${i+1}</div></div><div class="weapon-box"><div class="muted">Assigned Gun</div><h3>${escapeHtml(r.weapon.name)}</h3><div>${escapeHtml(r.weapon.style)} · ${escapeHtml(r.weapon.ammo)}</div><p class="muted">${escapeHtml(r.weapon.note)}</p><strong class="yellow">Rule: You may mod it however you want, but it must stay this gun.</strong></div><div class="gear-grid"><div class="gear-item"><span class="muted">Armor</span><br><strong>${escapeHtml(r.armor.name)}</strong></div><div class="gear-item"><span class="muted">Helmet</span><br><strong>${escapeHtml(r.helmet.name)}</strong></div><div class="gear-item"><span class="muted">Rig</span><br><strong>${escapeHtml(r.rig.name)}</strong></div><div class="gear-item"><span class="muted">Backpack</span><br><strong>${escapeHtml(r.backpack.name)}</strong></div></div><div class="cost-box"><span class="muted">Estimated Kit Cost</span><br><strong>${money(r.totalCost)} RUB</strong></div><div class="challenge-box"><span class="muted">Personal Challenge</span><br><strong>${escapeHtml(r.challenge)}</strong></div></article>`).join("");
}
function updatePlayer(id, field, value){
  state.players = state.players.map(p =>
    p.id === id
      ? { ...p, [field]: field === "name" ? value : Number(value) }
      : p
  );
  saveState();
  updateReadyControlsOnly();
}
function updateReadyControlsOnly(){
  const ready = allReady();
  const readyBox = document.getElementById("readyBox");
  if (readyBox) {
    readyBox.className = `status-box ${ready ? "ready" : "waiting"}`;
    readyBox.innerHTML = `<strong>${ready ? "Everyone is ready" : "Waiting on players"}</strong><span>Random button is locked until every streamer has a name, level, money, and ready status.</span>`;
  }
  const randomBtn = document.getElementById("randomBtn");
  if (randomBtn) randomBtn.disabled = !ready;
  const rerollBtn = document.getElementById("rerollBtn");
  if (rerollBtn) rerollBtn.disabled = !ready;
}

function escapeHtml(value){ return String(value ?? "").replace(/[&<>'"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch])); }
document.addEventListener("click", e=>{
  const target = e.target;
  if(target.matches(".tab")) setView(target.dataset.view);
  if(target.id === "dayBtn"){ state.timeOfDay = "Day"; render(); }
  if(target.id === "nightBtn"){ state.timeOfDay = "Night"; render(); }
  if(target.id === "addPlayerBtn"){ state.players.push({ id: crypto.randomUUID(), name: "", level: 1, money: 100000, ready: false }); render(); }
  if(target.dataset.remove){ state.players = state.players.filter(p=>p.id !== target.dataset.remove); selectedViewerId = state.players[0]?.id || ""; render(); }
  if(target.dataset.ready){ state.players = state.players.map(p=>p.id===target.dataset.ready ? { ...p, ready: !p.ready } : p); render(); }
  if(target.dataset.submitReady){ state.players = state.players.map(p=>p.id===target.dataset.submitReady ? { ...p, ready: Boolean(p.name && p.level && p.money) } : p); render(); }
  if(target.id === "randomBtn" || target.id === "rerollBtn"){ if(!allReady()) return; state.results = state.players.map(generateLoadout); state.lastRolledAt = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); setView("dashboard"); }
  if(target.id === "dashAdminBtn") setView("admin");
  if(target.id === "copyBtn") copyResults();
});
document.addEventListener("input", e=>{
  const t = e.target;
  if (t.id === "eventName") {
    state.eventName = t.value;
    const heroTitle = document.getElementById("heroTitle");
    if (heroTitle) heroTitle.textContent = state.eventName;
    saveState();
  }
  if (t.dataset.field) {
    updatePlayer(t.dataset.id, t.dataset.field, t.value);
  }
});
document.addEventListener("change", e=>{ const t=e.target; if(t.id === "mapName"){ state.mapName=t.value; render(); } if(t.id === "viewerSelect"){ selectedViewerId=t.value; render(); } });
function copyResults(){
  const text = `${state.eventName}\nMap: ${state.mapName} - ${state.timeOfDay}\nRolled: ${state.lastRolledAt || "Not rolled yet"}\n\n${state.results.map(r => r.error ? `${r.name} - ERROR: ${r.message}` : `${r.name} - Level ${r.level} - Budget ${money(r.money)} RUB\nWeapon: ${r.weapon.name}\nAmmo: ${r.weapon.ammo}\nArmor: ${r.armor.name}\nHelmet: ${r.helmet.name}\nRig: ${r.rig.name}\nBackpack: ${r.backpack.name}\nEstimated Cost: ${money(r.totalCost)} RUB\nChallenge: ${r.challenge}\nRule: Streamer may mod the weapon any way they want, but must run the assigned gun.`).join("\n\n")}`;
  navigator.clipboard.writeText(text);
}
render();
