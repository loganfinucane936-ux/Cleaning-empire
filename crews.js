// =========================
// CLEANING EMPIRE - CREWS SYSTEM
// =========================

let crews = {
    available: 1,
    assigned: {} // cityName -> number of crews
};

// =========================
// CREATE CREW
// =========================
function hireCrew(){

let cost = 200;

if(money < cost){
log("❌ Not enough money to hire crew!");
return;
}

money -= cost;
crews.available++;

log("👷 New crew hired!");

updateUI();
}

// =========================
// ASSIGN CREW TO CITY
// =========================
function assignCrew(cityName){

if(!cities[cityName]){
log("❌ Invalid city!");
return;
}

if(crews.available <= 0){
log("❌ No available crews!");
return;
}

// subtract from available
crews.available--;

// assign
if(!crews.assigned[cityName]){
crews.assigned[cityName] = 0;
}

crews.assigned[cityName]++;

cities[cityName].crews++;

log("📍 Crew assigned to " + cityName);

updateUI();
}

// =========================
// REMOVE CREW FROM CITY
// =========================
function removeCrew(cityName){

if(!crews.assigned[cityName] || crews.assigned[cityName] <= 0){
log("❌ No crews in this city!");
return;
}

crews.assigned[cityName]--;
cities[cityName].crews--;
crews.available++;

log("⬅️ Crew returned from " + cityName);

updateUI();
}

// =========================
// CREW PASSIVE EFFECTS
// =========================
setInterval(()=>{

for(let city in cities){

if(cities[city].unlocked){

let crewCount = cities[city].crews;

// each crew increases cleaning + income efficiency
if(crewCount > 0){

cities[city].clean += crewCount * 1.5;
money += crewCount * 2;

}

}

}

},1000);

// =========================
// UPGRADE CREWS
// =========================
function upgradeCrewEfficiency(){

let cost = 500;

if(money < cost){
log("❌ Not enough money!");
return;
}

money -= cost;

// increase global efficiency
for(let city in cities){
cities[city].income += 5;
}

log("⭐ Crew efficiency upgraded!");

updateUI();
}

// =========================
// MAKE FUNCTIONS GLOBAL
// =========================
window.hireCrew = hireCrew;
window.assignCrew = assignCrew;
window.removeCrew = removeCrew;
window.upgradeCrewEfficiency = upgradeCrewEfficiency;
