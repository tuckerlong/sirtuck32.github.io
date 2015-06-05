var currency = 0;
var currencyInc = 0;

var clickCount = 0;
var clickMod = 1;
var upgradeClickOne = 0;

var plots = 0;
var plotMod = 10;
var plotBaseCost = 25;
var plotRate = 1.1;

var goats = 0;
var goatMod = 0.4;
var goatBaseCost = 25;
var goatRate = 1.1;
var goatSpace = 0;

var unlockBronzeGoats = 0;
var bronzeGoats = 0;
var bronzeGoatMod = 1.2;

var upgradeBronzeMedal = 0;

var silverGoatUnlock = 0;
var silverGoats = 0;
var silverGoatMod = 4.8;

var silverMedalUnlock = 0;
var upgradeSilverMedal = 0;

var goldGoatUnlock = 0;
var goldGoats = 0;
var goldGoatMod = 10;

var goldMedalUnlock = 0;
var upgradeGoldMedal = 0;

var grass = 0;
var plotSize = 1;

/*  Clicks
 *
 *
 *
 */
 function generateClick() {
	clickCount += 1;
	currencyClick(clickMod);
	updateAll();
}

function currencyClick(number) {
	currency = currency + prettify(number);
	document.getElementById("currency").innerHTML = prettify(currency);
	//updateAll();
}

function buyClickOne() {
	if(currency >= clickOne.cost) {
		applyClickOne();
		currency -= clickOne.cost;
		addPurchasedUpgrade(clickOne.index);
		
		updateAll();
	}
}

function applyClickOne() {
	clickMod *= 2;
}

function buyClickTwo() {
	if(currency >= clickTwo.cost) {
		applyClickTwo();
		currency -= clickTwo.cost;
		addPurchasedUpgrade(clickTwo.index);
		
		updateAll();
	}
}

function applyClickTwo() {
	clickMod *= 2;
}

function buyClickThree() {
	if(currency >= clickThree.cost) {
		applyClickThree();
		currency -= clickThree.cost;
		addPurchasedUpgrade(clickThree.index);
		
		updateAll();
	}
}

function applyClickThree() {
	clickMod *= 2;
}

/*  Plots
 *
 *
 *
 */
function buyPlot() {
	var curCost = getPurchase(plot).getCost();
	if(currency >= curCost) {
		getPurchase(plot).count += 1;
		goatSpace = goatSpace + 10;
		currency = currency - curCost;
		
		updateAll();
	}
}

/*  Goats
 *
 *
 *
 */
function buyGoat() {
	var curCost = getPurchase(goat).getCost();
	if(currency >= curCost && goatSpace >= 1) {
		getPurchase(goat).count += 1;
		goatSpace = goatSpace - 1;
		currency = currency - curCost;

		updateAll();
	}
}

/*  Bronze Goats
 *
 *
 *
 */
function buyBronzeGoat() {
	var curCost = getPurchase(bronzeGoat).getCost();
	if(currency >= curCost && goatSpace >= 1) {
		getPurchase(bronzeGoat).count += 1;
		goatSpace = goatSpace - 1;
		currency = currency - curCost;
		
		updateAll();
	}
}

/*  Silver Goats
 *
 *
 *
 */
function buySilverGoat() {
	var curCost = getPurchase(silverGoat).getCost();
	if(currency >= curCost && goatSpace >= 1) {
		getPurchase(silverGoat).count += 1;
		goatSpace -= 1;
		currency -= curCost;
		
		updateAll();
	}
}













function addPlotImg() {
	img = document.createElement("img");
	img.src = "basePlot.png";
	img.className = "plotImg";
	img.onload = "draw";
	img.width = 200;
	img.height = 200;
	
	document.getElementById("graphics").appendChild(img);
}


function buyBronzeMedal() {
	if(currency >= 2000) {
		currency -= 2000;
		upgradeBronzeMedal = 1;
		bronzeGoatMod *= 2;
		
		updateValues();
		updateCost();
		calculateCurrency();
		
		document.getElementById("bronzeMedal").remove();
		document.getElementById("bronzeMedalbr").remove();
	}
}

function upgradeGrass() {
	var curCost = getGrassCost();
	if(currency >= curCost) {
		grass = grass + 1;
		currency = currency - curCost;
		
		updateValues();
		updateCost();
		calculateCurrency();
	};
}

function getGrassCost() {
	return Math.floor(100 * Math.pow(1.5, grass));
}

function upgradePlot() {
	var curCost = getLargerPlotCost();
	if(currency >= curCost) {
		plotSize = plotSize + 1;
		currency = currency - curCost;
		
		updateValues();
		updateCost();
		calculateCurrency();
	};
}

function getLargerPlotCost() {
	return Math.floor(500 * Math.pow(1.5, plotSize));
}


/*  Silver Medal
 *
 *
 *
 */
function unlockSilverMedal() {
	silverMedalUnlock = 1;
	
	button = createOneTimeButton(buySilverMedal, "Silver Medal", "silverMedal", "10000 money", document.getElementById("upgrades"));
	addBreak(button);
	addDescription(button, "A one time purchase that doubles the base rate of silver goats money production.");
}

function buySilverMedal() {
	if(currency >= 10000) {
		currency -= 10000;
		upgradeSilverMedal = 1;
		silverGoatMod *= 2;
		
		updateValues();
		updateCost();
		calculateCurrency();
		
		document.getElementById("silverMedal").remove();
		document.getElementById("silverMedalbr").remove();
	}
}

/*  Gold Goats
 *
 *
 *
 */
 function unlockGoldGoats() {
 	goldGoatUnlock = 1;
	button = createButton(buyGoldGoat, "Gold Goat", "goldGoats", "<span id=\"goldGoatCost\">0</span> money", document.getElementById("purchase"));
	addBreak(button);
	addDescription(button, "Increases money production by <span id=\"goldGoatModDescription\">0</span> per/s for each gold goat.");
 }
 
 function buyGoldGoat() {
 	var curCost = getGoldGoatCost();
	if(currency >= curCost && goatSpace >= 1) {
		goldGoats += 1;
		goatSpace -= 1;
		currency -= curCost;
		
		if(goldGoats == 5 && document.getElementById("goldMedal") === null && goldMedalUnlock === 0) unlockGoldMedal();
		//if(silverGoats == 10 && document.getElementById("goldGoats") === null && goldGoatUnlock === 0) unlockGoldGoats();
		
		updateValues();
		updateCost();
		calculateCurrency();
	};
 }
 
 function getGoldGoatCost() {
 	return Math.floor(10000 * Math.pow(1.2, goldGoats));
 }
 
 /*  Gold Medal
 *
 *
 *
 */
function unlockGoldMedal() {
	goldMedalUnlock = 1;
	
	button = createOneTimeButton(buyGoldMedal, "Gold Medal", "goldMedal", "100000 money", document.getElementById("upgrades"));
	addBreak(button);
	addDescription(button, "A one time purchase that doubles the base rate of gold goats money production.");
}

function buyGoldMedal() {
	if(currency >= 100000) {
		currency -= 100000;
		upgradeGoldMedal = 1;
		goldGoatMod *= 2;
		
		updateValues();
		updateCost();
		calculateCurrency();
		
		document.getElementById("goldMedal").remove();
		document.getElementById("goldMedalbr").remove();
	}
}
