// =========================
// CLEANING EMPIRE - UI POLISH LAYER
// =========================

// =========================
// MONEY POPUP EFFECT
// =========================
function moneyPopup(amount){

let popup = document.createElement("div");

popup.innerText = "+$" + amount;

popup.style.position = "absolute";
popup.style.left = Math.random() * 60 + 20 + "%";
popup.style.top = "50%";
popup.style.fontSize = "18px";
popup.style.color = "#1f8f4a";
popup.style.fontWeight = "bold";
popup.style.pointerEvents = "none";
popup.style.transition = "all 1s ease";
popup.style.opacity = "1";

document.body.appendChild(popup);

setTimeout(()=>{

popup.style.top = "30%";
popup.style.opacity = "0";

},50);

setTimeout(()=>{

popup.remove();

},1000);

}

// =========================
// HOOK INTO MONEY SYSTEM
// =========================
let originalMoneyAdd = money => money;

// override safe hook system
function addMoney(amount){

money += amount;

moneyPopup(amount);

updateUI();

}

// =========================
// BUTTON CLICK ANIMATION
// =========================
document.addEventListener("click",(e)=>{

if(e.target.tagName === "BUTTON"){

e.target.style.transform = "scale(0.95)";

setTimeout(()=>{

e.target.style.transform = "scale(1)";

},100);

}

});

// =========================
// CITY GLOW EFFECT
// =========================
function highlightCity(name){

document.querySelectorAll(".city").forEach(c=>{

if(c.innerText.includes(name)){
c.style.boxShadow = "0 0 15px #1f8f4a";
setTimeout(()=>{
c.style.boxShadow = "";
},800);
}

});

}

// =========================
// LOG ANIMATION ENHANCEMENT
// =========================
function fancyLog(msg){

let box = document.getElementById("log");

if(!box) return;

let line = document.createElement("div");

line.innerText = "➤ " + msg;

line.style.opacity = "0";
line.style.transition = "0.5s";

box.prepend(line);

setTimeout(()=>line.style.opacity="1",50);

}

// override old log if exists
if(typeof log !== "undefined"){
window.log = fancyLog;
}

// =========================
// SMOOTH NUMBER UPDATES
// =========================
function animateValue(id, end){

let el = document.getElementById(id);
if(!el) return;

let start = parseInt(el.innerText.replace(/\D/g,'')) || 0;
let current = start;

let step = (end - start) / 10;

let interval = setInterval(()=>{

current += step;

if((step > 0 && current >= end) || (step < 0 && current <= end)){
current = end;
clearInterval(interval);
}

el.innerText = Math.floor(current);

},20);

}

// =========================
// BACKGROUND AMBIENCE (optional feel)
// =========================
setInterval(()=>{

document.body.style.filter =
"brightness(" + (1 + Math.sin(Date.now()/3000)*0.02) + ")";

},200);

// =========================
// GLOBAL ACCESS
// =========================
window.moneyPopup = moneyPopup;
window.highlightCity = highlightCity;
window.addMoney = addMoney;
window.animateValue = animateValue;
