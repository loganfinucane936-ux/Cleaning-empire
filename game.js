// =========================
// CLEANING EMPIRE CORE GAME
// =========================

// 💰 PLAYER DATA
let money = 0;
let selectedCity = null;

// 🌎 CITY DATA (MAP SYSTEM)
let cities = {
"Sarasota": { unlocked: true, income: 50, clean: 100, crews: 1, trucks: 1, level: 1 },
"Tampa": { unlocked: false, income: 120, clean: 80, crews: 0, trucks: 0, level: 1 },
"Orlando": { unlocked: false, income: 200, clean: 60, crews: 0, trucks: 0, level: 1 },
"Miami": { unlocked: false, income: 350, clean: 40, crews: 0, trucks: 0, level: 1 },
"Jacksonville": { unlocked: false, income: 500, clean: 30, crews: 0, trucks: 0, level: 1 }
};

// =========================
// SELECT CITY
// =========================
function selectCity(name){

if(!cities[name]) return;

if(!cities[name].unlocked){
log("🔒 City is locked!");
return;
}

selectedCity = name;

document.getElementById("cityName").innerText = name;

updatePanel();

log("📍 Entered " + name);
}

// =========================
// PANEL UPDATE
// =========================
function updatePanel(){

if(!selectedCity) return;

let c = cities[selectedCity];

document.getElementById("income").innerText = c.income;
document.getElementById("clean").innerText = c.clean;
document.getElementById("crews").innerText = c.crews;
document.getElementById("trucks").innerText = c.trucks;
}

// =========================
// CLEANING ACTION
// =========================
function sendCrew(){

if(!selectedCity) return;

let c = cities[selectedCity];

if(c.crews <= 0){
log("❌ No crews in this city!");
return;
}

c.clean += 5;
money += 10;

log("👷 Crew cleaned area in " + selectedCity);

updatePanel();
updateUI();
}

// =========================
// UPGRADE CITY
// =========================
function upgradeCity(){

if(!selectedCity) return;

let cost = cities[selectedCity].level * 200;

if(money < cost){
log("❌ Not enough money! Need $" + cost);
return;
}

money -= cost;

cities[selectedCity].level++;
cities[selectedCity].income += 25;

log("⬆️ Upgraded " + selectedCity + " (Level " + cities[selectedCity].level + ")");

updateUI();
updatePanel();
}

// =========================
// UNLOCK NEW CITY SYSTEM
// =========================
function unlockCities(){

for(let name in cities){

let c = cities[name];

if(!c.unlocked && money >= 500){

c.unlocked = true;
money -= 500;

log("🌎 Unlocked " + name);
break;
}

}

updateUI();
}

// =========================
// MAIN INCOME LOOP
// =========================
setInterval(()=>{

for(let name in cities){

let c = cities[name];

if(c.unlocked){

money += c.income;
}

}

updateUI();

},1000);

// =========================
// CLICK MAP CITY (LINK TO HTML)
// =========================
window.selectCity = selectCity;
window.sendCrew = sendCrew;
window.upgradeCity = upgradeCity;

// =========================
// UI UPDATE
// =========================
function updateUI(){

document.getElementById("money").innerText = "$" + Math.floor(money);

if(selectedCity) updatePanel();

updateCityVisuals();
}

// =========================
// MAP VISUAL LOCK UPDATE
// =========================
function updateCityVisuals(){

document.querySelectorAll(".city").forEach(el=>{

let name = el.innerText.split("\n")[0];

if(cities[name]){

if(cities[name].unlocked){
el.classList.remove("locked");
}else{
el.classList.add("locked");
}

}

});

}

// =========================
// LOG SYSTEM
// =========================
function log(msg){

let box = document.getElementById("log");

if(!box) return;

box.innerHTML = msg + "<br>" + box.innerHTML;

}

// =========================
// START GAME
// =========================
setInterval(()=>{
updateUI();
},500);

updateUI();
