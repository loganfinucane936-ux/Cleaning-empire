// =========================
// CLEANING EMPIRE - CONTRACTS SYSTEM
// =========================

let contracts = [
{
name: "Small Home Cleaning",
type: "basic",
income: 25,
reqCrews: 1,
reqTrucks: 0,
active: false
},
{
name: "HOA Neighborhood Contract",
type: "hoa",
income: 150,
reqCrews: 2,
reqTrucks: 1,
active: false
},
{
name: "School District Cleaning",
type: "school",
income: 500,
reqCrews: 4,
reqTrucks: 2,
active: false
},
{
name: "Shopping Center Contract",
type: "commercial",
income: 1200,
reqCrews: 6,
reqTrucks: 3,
active: false
},
{
name: "Hospital Cleaning Contract",
type: "advanced",
income: 2500,
reqCrews: 8,
reqTrucks: 4,
active: false
}
];

// =========================
// SHOW CONTRACTS (UI HOOK)
// =========================
function renderContracts(){

let container = document.getElementById("contractsContainer");
if(!container) return;

container.innerHTML = "";

contracts.forEach((c, index)=>{

let div = document.createElement("div");

div.className = "contract";

div.innerHTML = `
<h3>${c.name}</h3>
<p>💰 Income: $${c.income}/sec</p>
<p>👷 Crews Needed: ${c.reqCrews}</p>
<p>🚚 Trucks Needed: ${c.reqTrucks}</p>
<p>Status: ${c.active ? "🟢 Active" : "🔴 Inactive"}</p>
<button onclick="activateContract(${index})">
${c.active ? "Active" : "Activate"}
</button>
`;

container.appendChild(div);

});

}

// =========================
// ACTIVATE CONTRACT
// =========================
function activateContract(i){

let c = contracts[i];

if(c.active){
log("⚠️ Contract already active!");
return;
}

// check requirements
if(crews.available + getTotalAssignedCrews() < c.reqCrews){
log("❌ Not enough crews!");
return;
}

if(vehicles.available + getTotalTrucks() < c.reqTrucks){
log("❌ Not enough trucks!");
return;
}

// activate
c.active = true;

log("📄 Contract activated: " + c.name);

renderContracts();
}

// =========================
// GET TOTAL ASSIGNED CREWS
// =========================
function getTotalAssignedCrews(){

let total = 0;

for(let city in cities){
total += cities[city].crews;
}

return total;
}

// =========================
// GET TOTAL TRUCKS
// =========================
function getTotalTrucks(){

let total = 0;

for(let city in cities){
total += cities[city].trucks;
}

return total;
}

// =========================
// CONTRACT INCOME LOOP
// =========================
setInterval(()=>{

contracts.forEach(c=>{

if(c.active){

money += c.income;

}

});

updateUI();

},1000);

// =========================
// AUTO UPDATE UI HOOK
// =========================
setInterval(()=>{

renderContracts();

},2000);

// =========================
// GLOBAL ACCESS
// =========================
window.activateContract = activateContract;
window.renderContracts = renderContracts;
