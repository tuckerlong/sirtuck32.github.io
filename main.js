var currency = 100000;
var currencyInc = 0;

var quest = "inactive";

function createButton(onclick, text, varName, varCost, div) {
	var button = document.createElement("div");
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
	
	return button;
}

function updateValues() {
	document.getElementById("currency").innerHTML = prettify(currency);
	
	var ele = document.getElementById("plots");
	if(ele !== null) ele.innerHTML = prettify(plots);
		
		ele = document.getElementById("plotSize");
		if(ele !== null) ele.innerHTML = prettify(plotSize);
	
	ele = document.getElementById("goats");
	if(ele !== null) ele.innerHTML = prettify(goats);
	
	ele = document.getElementById("grass");
	if(ele !== null) ele.innerHTML = prettify(grass);

		ele = document.getElementById("grassGoatShow");
		if(ele !== null) ele.innerHTML = prettify(goats);
		
		ele = document.getElementById("grassGoatModShow");
		if(ele !== null) ele.innerHTML = prettify(goatMod);
			
	goatSpace = (plots * plotMod * plotSize) - goats;
	document.getElementById("goatSpace").innerHTML = prettify(goatSpace);

	/*
	 * 
	 *
	 * GODS EXPANSION
	 *
	 *
	 */
	ele = document.getElementById("favor");
	if(ele !== null) ele.innerHTML = prettify(favor);
	
	ele = document.getElementById("goatHeroes");
	if(ele !== null) ele.innerHTML = prettify(goatHeroes);
	
	ele = document.getElementById("sunGoats");
	if(ele !== null) ele.innerHTML = prettify(sunGoats);

		ele = document.getElementById("sunGoatCostOneShow");
		if(ele !== null) ele.innerHTML = prettify(goatHeroes);
}

function updateCost() {
	/*
	 * 
	 *
	 * BASIC
	 *
	 *
	 */
	var nextCost = getPlotCost();
	var ele = document.getElementById("plotCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
	
	nextCost = getLargerPlotCost();
	ele = document.getElementById("plotUpgradeCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
	
	nextCost = getGoatCost();
	ele = document.getElementById("goatCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
	
	nextCost = getGrassCost();
	ele = document.getElementById("grassCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
	
	/*
	 * 
	 *
	 * GODS EXPANSION
	 *
	 *
	 */
	nextCost = getGoatHeroCost();
	ele = document.getElementById("goatHeroCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
	
	nextCost = getSunGoatCostOne();
	var nextSecCost = getSunGoatCostTwo()
	ele = document.getElementById("sunGoatCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost) + " Goat Hero(es), " + prettify(nextSecCost) + " favor";
}

function calculateCurrency() {
	/*
	 * 
	 *
	 * BASIC
	 *
	 *
	 */
	currencyInc = (goats * goatMod * grass) + (sunGoats * sunGoatCurrencyMod);
	document.getElementById("currencyInc").innerHTML = prettify(currencyInc);
	
	/*
	 * 
	 *
	 * GODS EXPANSION
	 *
	 *
	 */
	favorInc = (sunGoats * sunGoatFavorMod);
	document.getElementById("favorInc").innerHTML = prettify(favorInc);
	
	electricityInc = scienceGoats * scienceGoatMod;
	document.getElementById("electricityInc").innerHTML = prettify(electricityInc);
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


function prettify(input) {
	var output = Math.round(input * 10000000)/10000000;
	return output;
}


function startup() {
	// This doesn't work on ie?
	//document.getElementById("").addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
	
	document.getElementById("tabs").addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
	document.getElementById("purchase").addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
	document.getElementById("upgrades").addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
	document.getElementById("quest").style.visibility = "hidden";
	
	document.getElementById("purchase").style.display = "block";	
	document.getElementById("upgrades").style.display = "none";
	document.getElementById("gopollo").style.display = "none";
	document.getElementById("goatseidon").style.display = "none";
	document.getElementById("gometer").style.display = "none";	
	
	
	
	/*
	 * 
	 *
	 * GODS EXPANSION
	 *
	 *
	 */
	document.getElementById("gopollo").addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
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
		plotSize: plotSize,
		goats: goats,
		grass: grass,
		goatHeroes: goatHeroes,
		god: god,
		favor: favor,
		sunGoats: sunGoats
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
		if(typeof savegame.plotSize !== "undefined")
			plotSize = savegame.plotSize;
		if(typeof savegame.goats !== "undefined")
			goats = savegame.goats;
		if(typeof savegame.grass !== "undefined")
			grass = savegame.grass;
		if(typeof savegame.goatHeroes !== "undefined")
			goatHeroes = savegame.goatHeroes;
		if(typeof savegame.god !== "undefined")
			god = savegame.god;
		if(typeof savegame.favor !== "undefined")
			favor = savegame.favor;
		if(typeof savegame.sunGoats !== "undefined")
			sunGoats = savegame.sunGoats;
			
		if((currency >= 25 && plots == 0) || plots >= 1)
			createButton(buyPlot, "Plot", "plots", "<span id=\"plotCost\">0</span> money", document.getElementById("purchase"));
		
		if(plots >= 1) plotBonusOne();
		if(plots >= 2) plotBonusTwo();
		
		if(goatHeroes >= 1) document.getElementById("quest").style.visibility = "visible";
		
		
		if(god === "GOATSEIDON") document.getElementById("godName1").innerHTML = god;
		else if(god === "GOMETER") document.getElementById("godName2").innerHTML = god;
		else if(god ==="GOPOLLO") document.getElementById("godName3").innerHTML = god;
		
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
	if(god ==="GOPOLLO")
		document.getElementById("gopollo").style.display = "block";
	else if(god === "GOATSEIDON")
		document.getElementById("goatseidon").style.display = "block";
	else if(god === "GOMETER")
		document.getElementById("gometer").style.display = "block";
	else{
		document.getElementById("gopollo").style.display = "none";
		document.getElementById("goatseidon").style.display = "none";
		document.getElementById("gometer").style.display = "none";
	}
}

/*
 * Provided by: http://stackoverflow.com/questions/3387427/remove-element-by-id
 *
 */
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

/*
 * Provided by: http://stackoverflow.com/questions/3387427/remove-element-by-id
 *
 */
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function deleteSave() {
	localStorage.removeItem("save")
}

window.setInterval(function() {
	currencyClick(currencyInc);
	electricityClick(electricityInc);
	favorClick(favorInc);
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
			if(god === "") {
				if(rndm < 0.25) {
					rndm = Math.random();
					if(rndm < 0.33) {
						if(confirm("You found the statue of the Ancient God Goatseidon. Will you worship it?") == true) {
							god = "GOATSEIDON";
							document.getElementById("godName").innerHTML = god;
							document.getElementById("god").style.display = "block";
							document.getElementById("goatseidon").style.display = "block";	
						}
					} else if(rndm >= 0.33 && rndm < 0.66) {
						if(confirm("You found the statue of the Ancient God Gometer. Will you worship it?") == true) {
							god = "GOMETER";
							document.getElementById("godName").innerHTML = god;
							document.getElementById("god").style.display = "block";
							document.getElementById("gometer").style.display = "block";
						}
					} else {
						if(confirm("You found the statue of the Ancient God Gopollo. Will you worship it?") == true) {
							god = "GOPOLLO";
							document.getElementById("godName").innerHTML = god;
							document.getElementById("god").style.display = "block";
							document.getElementById("gopollo").style.display = "block";
						}
					}
				} else {
					rndm = prettify(Math.floor(Math.random() * 100)); 
					alert("You found " + rndm + " money. Keep questing and you might find something amazing!");
					currencyClick(rndm);
				}
			} else {
				rndm = prettify(Math.floor(Math.random() * 100)); 
				alert("You found " + rndm + " money. Keep questing and you might find something amazing!");
				currencyClick(rndm);
			}
		}
	}
}, 500);

window.onresize = resize;

function resize() {
	var goatImgs = document.getElementsByClassName("baseGoatImg");
	var graphics = document.getElementById("graphics").getBoundingClientRect();
	
	var gPlots = Math.floor((graphics.right - graphics.left - 8)/200);
	var len = goatImgs.length;
	console.log("Can hold " + gPlots + " plots. And found " + len + " goats.");
	for(i = len; i > 0; i--) {
		document.getElementsByClassName("baseGoatImg")[i-1].remove();
	}
	
	var maxGoatSpace = (plots * plotMod * plotSize);
	goatSpace += len;
	goats -= len;
	for(i = 0; i < len; i++) {
		goats += 1;
		goatSpace -= 1;
		var plotId = Math.max(Math.floor((maxGoatSpace - goatSpace - 1)/10), 0);
		var rect = document.getElementsByClassName("plotImg")[plotId].getBoundingClientRect();
		
		img = document.createElement("img");
		img.src = "baseGoat.png";
		img.style.position = "absolute";
		img.className = "baseGoatImg";
		var leftMod = (200 * Math.floor(plotId%gPlots)) + 40 + (50 * Math.floor((Math.floor(goats-1)%10)%3));
		var topMod = Math.max((210 * Math.floor(plotId/gPlots)), 5) + (50 * Math.floor((Math.floor(goats-1)%10)/3)) - (5 * Math.max((Math.floor(plotId/gPlots)-1),0));
		img.style.left = (leftMod + "px");
		img.style.top = topMod + "px";
		img.style.zIndex = 100;
		
		console.log(plotId);
		document.getElementById("graphics").appendChild(img);
	}


	
	
	
	
	
	
	
}