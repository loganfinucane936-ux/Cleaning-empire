// =========================
// CLEANING EMPIRE - ACHIEVEMENTS
// =========================

let achievements = [
{ id:"first_money", name:"First Dollar", req: ()=> money >= 1, done:false },
{ id:"first_crew", name:"First Crew Hired", req: ()=> crews.available > 1, done:false },
{ id:"first_truck", name:"First Truck", req: ()=> vehicles.available > 1, done:false },
{ id:"first_contract", name:"First Contract", req: ()=> contracts.some(c=>c.active), done:false },
{ id:"hq_3", name:"HQ Level 3", req: ()=> hq.level >= 3, done:false },
{ id:"city_unlock", name:"City Explorer", req: ()=> Object.values(cities).filter(c=>c.unlocked).length >= 3, done:false },
{ id:"money_1k", name:"First $1,000", req: ()=> money >= 1000, done:false },
{ id:"money_10k", name:"Cleaning Business", req: ()=> money >= 10000, done:false },
{ id:"money_100k", name:"Cleaning Empire", req: ()=> money >= 100000, done:false },
{ id:"prestige_1", name:"First Prestige", req: ()=> prestige.points >= 1, done:false }
];

// generate extra filler achievements (to reach 50+)
for(let i=1;i<=40;i++){
achievements.push({
id:"gen_"+i,
name:"Milestone " + i,
req: ()=> money >= (i * 5000),
done:false
});
}

// =========================
// CHECK ACHIEVEMENTS
// =========================
function checkAchievements(){

let list = document.getElementById("achievementContainer");
if(!list) return;

list.innerHTML = "";

achievements.forEach(a=>{

if(!a.done && a.req()){
a.done = true;
log("🏆 Achievement Unlocked: " + a.name);
}

let div = document.createElement("div");
div.className = "achievement";

div.innerText =
(a.done ? "✅ " : "⬜ ") + a.name;

list.appendChild(div);

});

}

// =========================
// LOOP
// =========================
setInterval(()=>{

checkAchievements();

},2000);

// =========================
// GLOBAL
// =========================
window.checkAchievements = checkAchievements;
