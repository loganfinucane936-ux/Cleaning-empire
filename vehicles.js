// =========================
// CLEANING EMPIRE - VEHICLES SYSTEM
// =========================

let vehicles = {
    available: 1,
    fleet: [] // {city: "Tampa", type: "truck"}
};

// =========================
// BUY VEHICLE
// =========================
function buyTruck(){

let cost = 500;

if(money < cost){
log("❌ Not enough money for truck!");
return;
}

money -= cost;

vehicles.available++;

log("🚚 New cleaning truck purchased!");

updateUI();
}

// =========================
// ASSIGN TRUCK TO CITY
// =========================
function assignTruck(cityName){

if(vehicles.available <= 0){
log("❌ No trucks available!");
return;
}

if(!cities[cityName]){
log("❌ Invalid city!");
return;
}

// assign truck
vehicles.available--;

vehicles.fleet.push({
city: cityName,
type: "truck"
});

cities[cityName].trucks++;

log("🚚 Truck assigned to " + cityName);

updateUI();
}

// =========================
// RETURN TRUCK
// =========================
function returnTruck(cityName){

let index = vehicles.fleet.findIndex(t => t.city === cityName);

if(index === -1){
log("❌ No truck in this city!");
return;
}

vehicles.fleet.splice(index,1);

cities[cityName].trucks++;
vehicles.available++;

log("⬅️ Truck returned from " + cityName);

updateUI();
}

// =========================
// TRUCK EFFECTS (PASSIVE LOGIC)
// =========================
setInterval(()=>{

for(let t of vehicles.fleet){

let city = cities[t.city];

if(city && city.unlocked){

// trucks boost income + cleaning speed
money += city.income * 0.1;
city.clean += 1;

}

}

},1000);

// =========================
// TRUCK UPGRADE SYSTEM
// =========================
function upgradeTruckFleet(){

let cost = 1000;

if(money < cost){
log("❌ Not enough money!");
return;
}

money -= cost;

// improve all cities with trucks
vehicles.fleet.forEach(t=>{
if(cities[t.city]){
cities[t.city].income += 20;
}
});

log("⭐ Fleet upgraded!");

updateUI();
}

// =========================
// MAKE GLOBAL
// =========================
window.buyTruck = buyTruck;
window.assignTruck = assignTruck;
window.returnTruck = returnTruck;
window.upgradeTruckFleet = upgradeTruckFleet;
