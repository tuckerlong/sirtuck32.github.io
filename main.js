var quest = "inactive";
var spaceQuest = "inactive";
var size = 0;
var scienceGoatUpgradeOne = 0;
var auto = 0;
var armyStrength = 0;
var armyDefense = 0;
var armyHealth = 100;
var armyMaxHealth = 100;
var enemyHealth = 0;
var enemyMaxHealth = 0;
var enemyDefense = 0;
var enemyStrength = 0;
var enemyLevel = 1;
var end = false;
var dead = false;
var inBattle = false;
var lastCleared = 1;

var refresh = false;
var advance = false;

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
	//div.appendChild(br);
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
	//div.appendChild(br);
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

function updateAll() {
	checkPurchases();
	checkUpgrades();
	updateValues();
	updateCost();
	calculateCurrency();
}

function updateValues() {
	document.getElementById("currency").innerHTML = prettify(currency).toFixed(0).toLocaleString();
	document.getElementById("electricity").innerHTML = prettify(electricity);
	document.getElementById("goatSpace").innerHTML = prettify(goatSpace);
	document.getElementById("armyStrength").innerHTML = prettify(armyStrength);
	
	var ele;
	for(i = 0; i < purchases.length; i++) {
		ele = document.getElementById(purchases[i].val);
		if(ele !== null) ele.innerHTML = prettify(purchases[i].count);
	}
		
	for(i = 0; i < purchases.length; i++) {
		if(purchases[i].show === true) {
			ele = document.getElementById(purchases[i].unlockId);
			if(ele !== null) ele.innerHTML = prettify(eval(purchases[i].unlockFormula));
		}
	}
	
	for(i = 0; i < purchases.length; i++) {
		if(purchases[i].unlocked === true) {
			ele = document.getElementById(purchases[i].descriptionId);
			if(ele !== null) ele.innerHTML = prettify(eval(purchases[i].descriptionFormula));
		}
	}
	
	for(i = 0; i < upgrades.length; i++) {
		if(upgrades[i].show === true && upgrades[i].unlocked !== true) {
			ele = document.getElementById(upgrades[i].unlockId);
			if(ele !== null) ele.innerHTML = prettify(eval(upgrades[i].unlockFormula));
		}
	}
	
	for(i = 0; i < items.length; i++) {
		ele = document.getElementById(items[i].countId);
		if(ele !== null) ele.innerHTML = prettify(items[i].count);
	}

	/*
	 * 
	 *
	 * GODS EXPANSION
	 *
	 *
	 */
	/*ele = document.getElementById("favor");
	if(ele !== null) ele.innerHTML = prettify(favor);
	
	ele = document.getElementById("goatHeroes");
	if(ele !== null) ele.innerHTML = prettify(goatHeroes);
	
	ele = document.getElementById("sunGoats");
	if(ele !== null) ele.innerHTML = prettify(sunGoats);

		ele = document.getElementById("sunGoatCostOneShow");
		if(ele !== null) ele.innerHTML = prettify(goatHeroes);
	
	ele = document.getElementById("soothyGoats");
	if(ele !== null) ele.innerHTML = prettify(soothyGoats);*/
}

function updateCost() {
	var nextCost, ele;
	
	for(i = 0; i < purchases.length; i++) {
		nextCost = purchases[i].getCost();
		ele = document.getElementById(purchases[i].costId);
		if(ele !== null) ele.innerHTML = prettify(nextCost);
	}
	
	/*
	 * 
	 *
	 * GODS EXPANSION
	 *
	 *
	 */
	/*nextCost = getGoatHeroCost();
	ele = document.getElementById("goatHeroCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);
	
	nextCost = getSunGoatCostOne();
	var nextSecCost = getSunGoatCostTwo()
	ele = document.getElementById("sunGoatCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost) + " Goat Hero(es), " + prettify(nextSecCost) + " favor";
	
	nextCost = getSoothyGoatCost();
	ele = document.getElementById("soothyGoatCost");
	if(ele !== null) ele.innerHTML = prettify(nextCost);*/
}

function calculateCurrency() {
	/*
	 * 
	 *
	 * BASIC
	 *
	 *
	 */
	currencyInc = (getPurchase(goat).count * (goatMod + (0.1 * grass))) + (getPurchase(bronzeGoat).count * bronzeGoatMod) + (getPurchase(silverGoat).count * silverGoatMod) + (getPurchase(goldGoat).count * goldGoatMod); // +
		//(sunGoats * sunGoatCurrencyMod) + (bionicGoats * bionicGoatCurrencyMod);
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
	
	electricityInc = (getPurchase(scienceGoat).count * scienceGoatMod);// + (bionicGoats * bionicGoatElectricityMod) + (rockets * rocketMod);
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
	document.getElementById("battle").addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
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
	
	load();
}

function save() {
	var save = { 
		currency: currency,
		electricity: electricity,
		purchases: purchases,
		upgrades: upgrades,
		items: items,
		clickCount: clickCount,
		lastCleared: lastCleared
	}
	localStorage.setItem("save", JSON.stringify(save));
}

function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));

	if(savegame !== null) {
		if(typeof savegame.currency !== "undefined")
			currency = savegame.currency;		
		if(typeof savegame.electricity !== "undefined")
			electricity = savegame.electricity;	
			
		if(typeof savegame.purchases !== "undefined")
			purchases = savegame.purchases;
			
		updatePurchases();
		checkPurchases();
		
		for(i = 0; i < purchases.length; i++) {
			if(purchases[i].unlocked === true) addPurchase(purchases[i]);
			else if(purchases[i].show === true) addNextPurchase(purchases[i]);
		}
			
		if(typeof savegame.upgrades !== "undefined")
			upgrades = savegame.upgrades;
		if(typeof savegame.clickCount !== "undefined")
			clickCount = savegame.clickCount;
			
		updateUpgrades();
		checkUpgrades();
			
		for(i = 0; i < upgrades.length; i++) {
			if(upgrades[i].purchased === true) window[upgrades[i].onload]();
			else if(upgrades[i].unlocked === true) addUpgrade(i);
			else if(upgrades[i].show === true) addNextUpgrade(i);
		}

		if(typeof savegame.items !== "undefined")
			items = savegame.items;
		
		goatSpace = (getPurchase(plot).count * plotMod) - getPurchase(goat).count - getPurchase(bronzeGoat).count;
		armyStrength = (getPurchase(goatInfantry).count * goatInfantryMod);
		
		if(typeof savegame.lastCleared !== "undefined")
			lastCleared = savegame.lastCleared;	
		
		enemyLevel = lastCleared;
		
		if(getPurchase(goatHero).count > 0) {
			goatHeroBonusOne();
		}
	}
	
	
	updateItems();
	updatePurchases();
	updateUpgrades();
	updateAll();
	setupBattle();
	updateEnemy();
	
	showStats();
	
	if(refresh) {
		save();
		window.location.reload();
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
		window.location.reload();
	}
	
}

window.setInterval(function() {
	currencyClick(currencyInc);
	electricityClick(electricityInc);
	favorClick(favorInc);
}, 1000);

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

function fade(element) {
	var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

/* Auto Save
 * Time - 10s
 */
window.setInterval(function() {
	ele = document.getElementById("autoSaveIndicator");
	ele.style.opacity = 1;
	ele.style.filter = 'alpha(opacity=' + 100 + ")";
	ele.style.display = "inline-block";
	fade(ele);
	save();
}, 10000);

window.onresize = resize;

function resize() {
	/*var goatImgs = document.getElementsByClassName("baseGoatImg");
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
	}	*/
}