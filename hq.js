// =========================
// CLEANING EMPIRE - HQ SYSTEM
// =========================

let hq = {
level: 1,
xp: 0,
xpNeeded: 100,
multiplier: 1
};

// =========================
// GAIN HQ XP
// =========================
function gainHQXP(amount){

hq.xp += amount;

if(hq.xp >= hq.xpNeeded){
levelUpHQ();
}

}

// =========================
// LEVEL UP HQ
// =========================
function levelUpHQ(){

hq.xp -= hq.xpNeeded;
hq.level++;
hq.xpNeeded = Math.floor(hq.xpNeeded * 1.5);

// increase global multiplier
hq.multiplier += 0.2;

log("🏢 HQ Upgraded to Level " + hq.level + "!");
log("⭐ Global multiplier increased!");

updateUI();

}

// =========================
// APPLY HQ BONUS
// =========================
function applyHQBonus(value){
return value * hq.multiplier;
}

// =========================
// HQ UPGRADE BUTTON
// =========================
function upgradeHQ(){

let cost = hq.level * 1000;

if(money < cost){
log("❌ Not enough money for HQ upgrade!");
return;
}

money -= cost;

gainHQXP(50);

log("🏢 HQ investment made!");

updateUI();

}

// =========================
// PASSIVE HQ GROWTH
// =========================
setInterval(()=>{

// HQ slowly gains XP from active contracts
if(typeof contracts !== "undefined"){

contracts.forEach(c=>{
if(c.active){
gainHQXP(1);
}
});

}

updateUI();

},2000);

// =========================
// BOOST CITY INCOME WITH HQ
// =========================
function getCityIncome(baseIncome){
return Math.floor(baseIncome * hq.multiplier);
}

// =========================
// MAKE GLOBAL
// =========================
window.upgradeHQ = upgradeHQ;
window.hq = hq;
window.applyHQBonus = applyHQBonus;
window.getCityIncome = getCityIncome;
