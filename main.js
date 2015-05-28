//bower install progressbar.js


var currency = 0;
var currencyInc = 0;
var cursors = 0;
var prestige = 0;

var grass = 1;

var quest = "inactive";

var createPlot = "false";

function currencyClick(number) {
	currency = currency + number;
	document.getElementById("currency").innerHTML = prettify(currency);
	
	if(currency >= 25 && document.getElementById("plots") === null) {
		createButton("land", buyPlot, "Plot", "plots", "<span id=\"plotCost\">0</span> money", document.getElementById("purchase"));
		updateCost();
	}
}

function createButton(id, onclick, text, varName, varCost, div) {
	var button = document.createElement("div");
	button.id = id;
	button.className = "purchaseButton";
	button.onclick = onclick;
	
	var name = document.createElement("div");
	name.className = "objName";
	name.innerHTML = text;
	button.appendChild(name);

	var count = document.createElement("div");
	count.className = "count";
	count.innerHTML = "<span id=\"" + varName + "\">0</span>"
	button.appendChild(count);

	var br = document.createElement("br");
	button.appendChild(br);
	
	var price = document.createElement("div");
	price.className = "price";
	price.innerHTML = varCost
	button.appendChild(price);
	
	br = document.createElement("br");
	div.appendChild(br);
	div.appendChild(button);
}

function updateCost() {
	var nextCost = getPlotCost();
	var ele = document.getElementById("plotCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
	
	nextCost = getGoatCost();
	ele = document.getElementById("goatCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
	
	nextCost = getGoatHeroCost();
	ele = document.getElementById("goatHeroCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
	
	/*nextCost = Math.floor(20 * (goatHeroes + 1));
	document.getElementById("goatHeroCost").innerHTML = prettify(nextCost);
	
	// SCIENCE
	nextCost = Math.floor(20 * (scienceGoats + 1));
	document.getElementById("scienceGoatCost").innerHTML = prettify(nextCost);
	
	nextCost = Math.floor(20 * (bionicGoats + 1));
	document.getElementById("bionicGoatCost").innerHTML = prettify(nextCost);*/
}

function updateValues() {
	document.getElementById("currency").innerHTML = prettify(currency);
	
	var ele = document.getElementById("plots");
	if(ele !== null) ele.innerHTML = prettify(plots);
	
	ele = document.getElementById("goats");
	if(ele !== null) ele.innerHTML = prettify(goats);
	
	ele = document.getElementById("goatHeroes");
	if(ele !== null) ele.innerHTML = prettify(goatHeroes);
		
	goatSpace = plots * plotMod - goats;
	document.getElementById("goatSpace").innerHTML = prettify(goatSpace);
	//document.getElementById("plots").innerHTML = prettify(plots);
	/*document.getElementById("goats").innerHTML = prettify(goats);
	document.getElementById("goatHeroes").innerHTML = prettify(goatHeroes);
	document.getElementById("sunGoats").innerHTML = prettify(sunGoats);
	
	// SCIENCE
	document.getElementById("scienceGoats").innerHTML = prettify(scienceGoats)
	document.getElementById("bionicGoats").innerHTML = prettify(bionicGoats)*/
}

function startQuest() {
	quest = "active";
}

function wanderAround(counter, img, left) {
	--counter;
	if (counter < 0)
	{
		// Done; remove it
		document.body.removeChild(img);
	}
	else
	{
		// Animate a bit more
		left += 10;
		img.style.left = left + "px";

		// Re-trigger ourselves
		window.setTimeout(function(){wanderAround(counter, img, left)}, 200);
	}
}

function upgradeGrass() {
	var curCost = Math.floor(100 * Math.pow(1.5, grass));
	if(currency >= curCost) {
		grass = grass + 1;
		currency = currency - curCost;
		document.getElementById("currency").innerHTML = prettify(currency);
		
		calculateCurrency();
	};
	
	var nextCost = Math.floor(100 * Math.pow(1.5, grass));
	document.getElementById("grassCost").innerHTML = prettify(nextCost);
}

function calculateCurrency() {
	currencyInc = goats * (goatMod * grass);
	document.getElementById("currencyInc").innerHTML = prettify(currencyInc);
	
	electricityInc = scienceGoats * scienceGoatMod;
	document.getElementById("electricityInc").innerHTML = prettify(electricityInc);
}

function prettify(input) {
	var output = Math.round(input * 10000000)/10000000;
	return output;
}


function startup() {
	// This doesn't work on ie?
	//document.getElementById("").addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
	
	document.getElementById("purchase").addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
	document.getElementById("quest").style.visibility = "hidden";
	
	document.getElementById("purchase").style.display = "block";	
	document.getElementById("upgrades").style.display = "none";
	document.getElementById("gopollo").style.display = "none";
	document.getElementById("goatseidon").style.display = "none";
	document.getElementById("gometer").style.display = "none";	
	// BASIC
	/*document.getElementById("goat").style.visibility = "hidden";
	document.getElementById("grass").style.visibility = "hidden";
	
	
	// GODS
	document.getElementById("goatHero").style.visibility = "hidden";
	document.getElementById("goatHeroText").style.visibility = "hidden";
	
	document.getElementById("quest").style.visibility = "hidden";
	
	document.getElementById("god").style.display = "none";
	document.getElementById("goatseidon").style.display = "none";
	document.getElementById("gometer").style.display = "none";
	
	document.getElementById("gopollo").style.display = "none";
		document.getElementById("sunGoatText").style.visibility = "hidden";
		
		
	// SCIENCE
	document.getElementById("electricityText").style.visibility = "hidden";
	document.getElementById("electricityVal").style.visibility = "hidden";
	
	document.getElementById("scienceGoat").style.visibility = "hidden";
	document.getElementById("scienceGoatText").style.visibility = "hidden";
	
	document.getElementById("bionicGoat").style.visibility = "hidden";
	document.getElementById("bionicGoatText").style.visibility = "hidden";*/
	
	
	load();
}


function save() {
	var save = { 
		currency: currency,
		plots: plots,
		goats: goats,
		goatHeroes: goatHeroes
	}
	localStorage.setItem("save", JSON.stringify(save));
}

function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	
	console.log(savegame);
	if(savegame !== null) {
		if(typeof savegame.currency !== "undefined")
			currency = savegame.currency;
		if(typeof savegame.plots !== "undefined")
			plots = savegame.plots;
		if(typeof savegame.goats !== "undefined")
			goats = savegame.goats;
		if(typeof savegame.goatHeroes !== "undefined")
			goatHeroes = savegame.goatHeroes;
			
		if((currency >= 25 && plots == 0) || plots >= 1)
			createButton("land", buyPlot, "Plot", "plots", "<span id=\"plotCost\">0</span> money", document.getElementById("purchase"));
		
		if(plots >= 1) {
			createButton("goat", buyGoat, "Goat", "goats", "<span id=\"goatCost\">0</span> money", document.getElementById("purchase"));
			createButton("goatHero", buyGoatHero, "Goat Hero", "goatHeroes", "<span id=\"goatHeroCost\">0</span> money", document.getElementById("purchase"));
		}
		
		if(goatHeroes == 1) {
			document.getElementById("quest").style.visibility = "visible";
		}
		
		updateValues();
		updateCost();
		calculateCurrency();
	}
}

function showUpgrades() {
	document.getElementById("purchase").style.display = "none";	
	document.getElementById("upgrades").style.display = "block";
	document.getElementById("gopollo").style.display = "none";
	document.getElementById("goatseidon").style.display = "none";
	document.getElementById("gometer").style.display = "none";
}

function showPurchase() {
	document.getElementById("purchase").style.display = "block";	
	document.getElementById("upgrades").style.display = "none";	
	document.getElementById("gopollo").style.display = "none";
	document.getElementById("goatseidon").style.display = "none";
	document.getElementById("gometer").style.display = "none";
}

function showGod() {
	document.getElementById("purchase").style.display = "none";	
	document.getElementById("upgrades").style.display = "none";
	document.getElementById("gopollo").style.display = "block";
	document.getElementById("goatseidon").style.display = "none";
	document.getElementById("gometer").style.display = "none";
}

function deleteSave() {
	localStorage.removeItem("save")
}

function praiseIt() {
	console.log("test");
	document.getElementById("land").style.display = "none";
}

window.setInterval(function() {
	currencyClick((goats * goatMod * grass));
	electricityClick((scienceGoats * scienceGoatMod ));
}, 1000);

window.setInterval(function() {
	if(quest === "active") {
		document.getElementById("questBar").value += (1 * goatHeroes);
		document.getElementById("progress").innerHTML = prettify(document.getElementById("questBar").value/document.getElementById("questBar").max * 100) + "%";
		if(document.getElementById("questBar").value >= document.getElementById("questBar").max) {
			quest = "inactive";
			document.getElementById("questBar").value = 0;
			document.getElementById("progress").innerHTML = "Finished"
			
			rndm = Math.random();
			
			if(rndm < 0.33) {
				if(confirm("You found the statue of the Ancient God Goatseidon. Will you worship it?") == true) {
					document.getElementById("godName").innerHTML = "GOATSEIDON"	
					document.getElementById("god").style.display = "block";
					document.getElementById("goatseidon").style.display = "block";		
				} else {
				
				}
			} else if(rndm >= 0.33 && rndm < 0.66) {
				if(confirm("You found the statue of the Ancient God Gometer. Will you worship it?") == true) {
					document.getElementById("godName").innerHTML = "GOMETER"
					document.getElementById("god").style.display = "block";
					document.getElementById("gometer").style.display = "block";
				} else {
				
				}
			} else {
				if(confirm("You found the statue of the Ancient God Gopollo. Will you worship it?") == true) {
					document.getElementById("godName").innerHTML = "GOPOLLO"
					document.getElementById("god").style.display = "block";
					document.getElementById("gopollo").style.display = "block";
					document.getElementById("sunGoatText").style.visibility = "visible";
				} else {
				
				}
			}
		}
	}
}, 500);

