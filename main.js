var quest = "inactive";
var spaceQuest = "inactive";
var size = 0;

var scienceGoatUpgradeOne = 0;

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

function createOneTimeButton(onclick, text, idName, varCost, div) {
	var button = document.createElement("div");
	button.className = "purchaseButton";
	button.id = idName;
	button.onclick = onclick;
	
	var name = document.createElement("div");
	name.className = "objName";
	name.innerHTML = text;
	button.appendChild(name);

	var br = document.createElement("br");
	button.appendChild(br);
	
	var price = document.createElement("div");
	price.className = "price";
	price.innerHTML = varCost
	button.appendChild(price);
	
	br = document.createElement("br");
	br.id = idName + "br";
	div.appendChild(br);
	div.appendChild(button);
	
	return button;
}

function addBreak(button) {
	var br = document.createElement("br");
	button.appendChild(br);
}

function addDescription(button, description) {
	var des = document.createElement("div");
	des.className = "description";
	des.innerHTML = description;
	button.appendChild(des);
}

function updateValues() {
	document.getElementById("currency").innerHTML = prettify(currency);
	
	var ele = document.getElementById("plots");
	if(ele !== null) ele.innerHTML = prettify(plots);
		
		ele = document.getElementById("plotSize");
		if(ele !== null) ele.innerHTML = prettify(plotSize);
	
	ele = document.getElementById("goats");
	if(ele !== null) ele.innerHTML = prettify(goats);
	
		ele = document.getElementById("goatModDescription");
		if(ele !== null) ele.innerHTML = prettify((goatMod + (0.1 * grass)));
	
	ele = document.getElementById("grass");
	if(ele !== null) ele.innerHTML = prettify(grass);

		ele = document.getElementById("grassGoatShow");
		if(ele !== null) ele.innerHTML = prettify(goats);
		
	ele = document.getElementById("bronzeGoats");
	if(ele !== null) ele.innerHTML = prettify(bronzeGoats);
	
		ele = document.getElementById("bronzeGoatModDescription");
		if(ele !== null) ele.innerHTML = prettify(bronzeGoatMod);
		
	ele = document.getElementById("silverGoats");
	if(ele !== null) ele.innerHTML = prettify(silverGoats);
	
		ele = document.getElementById("silverGoatModDescription");
		if(ele !== null) ele.innerHTML = prettify(silverGoatMod);	
		
	ele = document.getElementById("goldGoats");
	if(ele !== null) ele.innerHTML = prettify(goldGoats);
	
		ele = document.getElementById("goldGoatModDescription");
		if(ele !== null) ele.innerHTML = prettify(goldGoatMod);	
		
		
	ele = document.getElementById("scienceGoats");
	if(ele !== null) ele.innerHTML = prettify(scienceGoats);
	
	ele = document.getElementById("bionicGoats");
	if(ele !== null) ele.innerHTML = prettify(bionicGoats);
	
	ele = document.getElementById("electricity");
	if(ele !== null) ele.innerHTML = prettify(electricity);
	
	ele = document.getElementById("rockets");
	if(ele !== null) ele.innerHTML = prettify(rockets);
			
	//goatSpace = (plots * plotMod * plotSize) - goats - scienceGoats - bionicGoats;
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
	
	ele = document.getElementById("soothyGoats");
	if(ele !== null) ele.innerHTML = prettify(soothyGoats);
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
	
	nextCost = getBronzeGoatCost();
	ele = document.getElementById("bronzeGoatCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
	
	nextCost = getSilverGoatCost();
	ele = document.getElementById("silverGoatCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
	
	nextCost = getGoldGoatCost();
	ele = document.getElementById("goldGoatCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
	
	nextCost = getScienceGoatCost();
	ele = document.getElementById("scienceGoatCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
	
	nextCost = getBionicGoatCost();
	ele = document.getElementById("bionicGoatCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
	
	nextCost = getRocketCost();
	ele = document.getElementById("rocketCost");
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
	
	nextCost = getSoothyGoatCost();
	ele = document.getElementById("soothyGoatCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
}

function calculateCurrency() {
	/*
	 * 
	 *
	 * BASIC
	 *
	 *
	 */
	currencyInc = (goats * (goatMod + (0.1 * grass))) + (bronzeGoats * bronzeGoatMod) + (silverGoats * silverGoatMod) + (goldGoats * goldGoatMod) +
		(sunGoats * sunGoatCurrencyMod) + (bionicGoats * bionicGoatCurrencyMod);
	if(blessing === "active") currencyInc *= 2;
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
	
	electricityInc = (scienceGoats * scienceGoatMod) + (bionicGoats * bionicGoatElectricityMod) + (rockets * rocketMod);
	document.getElementById("electricityInc").innerHTML = prettify(electricityInc);
}

function startQuest() {
	quest = "active";
}

function startSpaceQuest() {
	spaceQuest = "active";
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
	//document.getElementById("quest").style.visibility = "hidden";
	
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
	var unlocks = {
		upgradeClickOne: upgradeClickOne,
		unlockBronzeGoats: unlockBronzeGoats,
		unlockSoothy: unlockSoothy
	}
	var save = { 
		currency: currency,
		plots: plots,
		plotSize: plotSize,
		goats: goats,
		grass: grass,
		bronzeGoats: bronzeGoats,
		silverGoats: silverGoats,
		goldGoats: goldGoats,
		
		scienceGoats: scienceGoats,
		electricity: electricity,
		bionicGoats: bionicGoats,
		rockets: rockets,
		scienceGoatUpgradeOne: scienceGoatUpgradeOne,
		
		goatHeroes: goatHeroes,
		god: god,
		favor: favor,
		sunGoats: sunGoats,
		soothyGoats: soothyGoats,
		
		unlockBronzeGoats: unlockBronzeGoats,
		silverGoatUnlock: silverGoatUnlock,
		goldGoatUnlock: goldGoatUnlock,
		goatHeroesUnlock: goatHeroesUnlock,
		
		upgradeClickOne: upgradeClickOne,
		upgradeBronzeMedal: upgradeBronzeMedal,
		silverMedalUnlock: silverMedalUnlock,
		upgradeSilverMedal: upgradeSilverMedal,
		goldMedalUnlock: goldMedalUnlock,
		upgradeGoldMedal: upgradeGoldMedal
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
		if(typeof savegame.bronzeGoats !== "undefined")
			bronzeGoats = savegame.bronzeGoats;	
		if(typeof savegame.silverGoats !== "undefined")
			silverGoats = savegame.silverGoats;	
		if(typeof savegame.goldGoats !== "undefined")
			goldGoats = savegame.goldGoats;	
			
		if(typeof savegame.scienceGoats !== "undefined")
			scienceGoats = savegame.scienceGoats;
		if(typeof savegame.electricity !== "undefined")
			electricity = savegame.electricity;
		if(typeof savegame.bionicGoats !== "undefined")
			bionicGoats = savegame.bionicGoats;	
		if(typeof savegame.rockets !== "undefined")
			rockets = savegame.rockets;	
		if(typeof savegame.scienceGoatUpgradeOne !== "undefined")
			scienceGoatUpgradeOne = savegame.scienceGoatUpgradeOne;	
			
		if(typeof savegame.goatHeroes !== "undefined")
			goatHeroes = savegame.goatHeroes;
		if(typeof savegame.god !== "undefined")
			god = savegame.god;
		if(typeof savegame.favor !== "undefined")
			favor = savegame.favor;
		if(typeof savegame.sunGoats !== "undefined")
			sunGoats = savegame.sunGoats;
		if(typeof savegame.soothyGoats !== "undefined")
			soothyGoats = savegame.soothyGoats;
		if(typeof savegame.unlockSoothy !== "undefined")
			unlockSoothy = savegame.unlockSoothy;
			
		if(typeof savegame.unlockBronzeGoats !== "undefined")
			unlockBronzeGoats = savegame.unlockBronzeGoats;
		if(typeof savegame.silverGoatUnlock !== "undefined")
			silverGoatUnlock = savegame.silverGoatUnlock;
		if(typeof savegame.goldGoatUnlock !== "undefined")
			goldGoatUnlock = savegame.goldGoatUnlock;
		if(typeof savegame.goatHeroesUnlock !== "undefined")
			goatHeroesUnlock = savegame.goatHeroesUnlock;
			
		if(typeof savegame.upgradeClickOne !== "undefined")
			upgradeClickOne = savegame.upgradeClickOne;
		if(typeof savegame.upgradeBronzeMedal !== "undefined")
			upgradeBronzeMedal = savegame.upgradeBronzeMedal;
		if(typeof savegame.silverMedalUnlock !== "undefined")
			silverMedalUnlock = savegame.silverMedalUnlock;
		if(typeof savegame.upgradeSilverMedal !== "undefined")
			upgradeSilverMedal = savegame.upgradeSilverMedal;
		if(typeof savegame.goldMedalUnlock !== "undefined")
			goldMedalUnlock = savegame.goldMedalUnlock;
		if(typeof savegame.upgradeGoldMedal !== "undefined")
			upgradeGoldMedal = savegame.upgradeGoldMedal;
			
		if(upgradeClickOne === 0) {
			button = createOneTimeButton(upgradeClick, "Upgrade Clicks!", "upgradeClicks", "100 money", document.getElementById("upgrades"));
			addBreak(button);
			addDescription(button, "A one time purchase that doubles the base rate of clicking production.");
		} else {
			clickMod *= 2;
		}	
			
		if((currency >= 25 && plots == 0) || plots >= 1) currencyBonusOne();
		
		if(plots >= 1) plotBonusOne();
		if(unlockBronzeGoats === 1 || (unlockBronzeGoats === 0 && goats >= 5)) goatBonusOne();
		if(silverGoatUnlock === 1 || (silverGoatUnlock === 0 && bronzeGoats >= 10)) unlockSilverGoats();
		if(goldGoatUnlock === 1 || (goldGoatUnlock === 0 && silverGoats >= 10)) unlockGoldGoats();
		if(goatHeroesUnlock === 1 || (goatHeroesUnlock === 0 && goats >= 10)) unlockGoatHeroes();
		if(plots >= 2) plotBonusTwo();
		
		if((electricity >= 25 && bionicGoats == 0) || bionicGoats >= 1) electricityBonusOne();
		
		if(rockets >= 1 || scienceGoats >= 10) scienceGoatBonusOne();
		if(scienceGoats >= 20 && scienceGoatUpgradeOne == 0) scienceGoatBonusTwo();
		if(rockets >= 1) rocketBonusOne();
		
		scienceGoatMod = 0.1 + (0.1 * scienceGoatUpgradeOne); 
		
		if(goatHeroes >= 1) goatHeroBonusOne();
		
		
		if(god === "GOATSEIDON") document.getElementById("godName1").innerHTML = god;
		else if(god === "GOMETER") document.getElementById("godName2").innerHTML = god;
		else if(god ==="GOPOLLO") {
			document.getElementById("godName3").innerHTML = god;
			document.getElementById("banner").style.display = "block";
		}
		
		if(unlockSoothy === 1) {
			document.getElementById("soothyUnlock").remove();
		
			var button = createButton(buySoothyGoat, "Soothy Goat", "soothyGoats", "<span id=\"soothyGoatCost\">0</span> money", document.getElementById("purchase"));
			addBreak(button);
			addDescription(button, "Increases the amount found during quest.");
		}
		
		for(i = 0; i < plots; i++)
			addPlotImg();

		if(upgradeBronzeMedal == 1) bronzeGoatMod *= 2;
		else if(upgradeBronzeMedal == 0 && bronzeGoats >= 5) bronzeGoatBonusOne();
		
		if(upgradeSilverMedal === 1) silverGoatMod *= 2;
		else if(silverMedalUnlock === 1 || (silverMedalUnlock === 0 && silverGoats >= 5)) unlockSilverMedal();
		
		if(upgradeGoldMedal === 1) goldGoatMod *= 2;
		else if(goldMedalUnlock === 1 || (goldMedalUnlock === 0 && goldGoats >= 5)) unlockGoldMedal();
		
		size = goats;
		resize();
		
		updateValues();
		updateCost();
		calculateCurrency();
	} else {
		button = createOneTimeButton(upgradeClick, "Upgrade Clicks!", "upgradeClicks", "100 money", document.getElementById("upgrades"));
		addBreak(button);
		addDescription(button, "A one time purchase that doubles the base rate of clicking production.");
	}
}

function showSpace() {
	document.getElementById("spaceQuest").style.display = "block";
	document.getElementById("heroicQuest").style.display = "none";
}

function showHeroic() {
	document.getElementById("spaceQuest").style.display = "none";
	document.getElementById("heroicQuest").style.display = "block";
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
	if(confirm("Are you sure you want to delete your save? You cannot get it back after this.") == true) {
		localStorage.removeItem("save");
	}
	
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
				if(rndm < 0.15) {
					rndm = Math.random();
					if(rndm < 0) {
						if(confirm("You found the statue of the Ancient God Goatseidon. Will you worship it?") == true) {
							god = "GOATSEIDON";
							document.getElementById("godName1").innerHTML = "GOATSEIDON";
							document.getElementById("god").style.display = "block";
							document.getElementById("goatseidon").style.display = "block";	
						}
					} else if(rndm < 0) {
						if(confirm("You found the statue of the Ancient God Gometer. Will you worship it?") == true) {
							god = "GOMETER";
							document.getElementById("godName2").innerHTML = "GOMETER";
							document.getElementById("god").style.display = "block";
							document.getElementById("gometer").style.display = "block";
						}
					} else {
						if(confirm("You found the statue of the Ancient God Gopollo. Will you worship it?") == true) {
							god = "GOPOLLO";
							document.getElementById("banner").style.display = "block";
							document.getElementById("godName3").innerHTML = "GOPOLLO";
							document.getElementById("god").style.display = "block";
							document.getElementById("gopollo").style.display = "block";
						}
					}
				} else {
					rndm = prettify(Math.floor(Math.random() * (100 + (100 * soothyGoats))) + 1 + (50 * soothyGoats)); 
					alert("You found " + rndm + " money. Keep questing and you might find something amazing!");
					currencyClick(rndm);
				}
			} else {
				rndm = prettify(Math.floor(Math.random() * (100 + (100 * soothyGoats))) + 1 + (50 * soothyGoats)); 
				alert("You found " + rndm + " money. Keep questing and you might find something amazing!");
				currencyClick(rndm);
			}
		}
	}
}, 500);

window.setInterval(function() {
	if(spaceQuest === "active") {
		document.getElementById("spaceQuestBar").value += (1 * rockets);
		document.getElementById("spaceProgress").innerHTML = prettify(document.getElementById("spaceQuestBar").value/document.getElementById("spaceQuestBar").max * 100) + "%";
		if(document.getElementById("spaceQuestBar").value >= document.getElementById("spaceQuestBar").max) {
			spaceQuest = "inactive";
			document.getElementById("spaceQuestBar").value = 0;
			document.getElementById("spaceProgress").innerHTML = "Finished"
			
			
			rndm = Math.random();
		}
	}
}, 500);

window.onresize = resize;

function resize() {
	var goatImgs = document.getElementsByClassName("baseGoatImg");
	var graphics = document.getElementById("graphics").getBoundingClientRect();
	
	var gPlots = Math.floor((graphics.right - graphics.left - 8)/200);
	var len = goatImgs.length;
	//console.log("Can hold " + gPlots + " plots. And found " + len + " goats.");
	for(i = len; i > 0; i--) {
		document.getElementsByClassName("baseGoatImg")[i-1].remove();
	}
	
	var maxGoatSpace = (plots * plotMod * plotSize);
	goatSpace = maxGoatSpace;
	goats = 0;
	for(i = 0; i < Math.max(len, size); i++) {
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
		
		//console.log(plotId + " " + maxGoatSpace + " " + goatSpace);
		document.getElementById("graphics").appendChild(img);
	}	
}