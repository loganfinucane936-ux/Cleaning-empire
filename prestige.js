// =========================
// CLEANING EMPIRE - PRESTIGE SYSTEM
// =========================

let prestige = {
points: 0,
multiplier: 1
};

// =========================
// PRESTIGE RESET
// =========================
function prestigeReset(){

let earned = Math.floor(money / 10000);

if(earned <= 0){
log("❌ Not enough progress to prestige!");
return;
}

// gain prestige points
prestige.points += earned;

// permanent boost
prestige.multiplier = 1 + (prestige.points * 0.1);

// RESET GAME PROGRESS (keep prestige)
money = 0;

for(let city in cities){
cities[city].income = Math.max(10, cities[city].income / 2);
cities[city].clean = 100;
cities[city].crews = 0;
cities[city].trucks = 0;
cities[city].unlocked = city === "Sarasota";
}

crews.available = 1;
vehicles.available = 1;

contracts.forEach(c => c.active = false);

hq.level = 1;
hq.xp = 0;
hq.xpNeeded = 100;
hq.multiplier = 1;

log("⭐ PRESTIGE COMPLETE! You gained " + earned + " points!");

updateUI();
}

// =========================
// APPLY PRESTIGE BONUS
// =========================
function applyPrestige(value){
return value * prestige.multiplier;
}

// =========================
// PRESTIGE BUTTON
// =========================
function doPrestige(){
prestigeReset();
}

// =========================
// GLOBAL
// =========================
window.doPrestige = doPrestige;
window.prestige = prestige;
window.applyPrestige = applyPrestige;
