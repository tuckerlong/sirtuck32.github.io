var currency = 0;
var currencyInc = 0;

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

var grass = 0;
var plotSize = 1;

function generateClick() {
	currencyClick(clickMod);
}

function currencyClick(number) {
	currency = currency + prettify(number);
	document.getElementById("currency").innerHTML = prettify(currency);
	
	if(currency >= 25 && document.getElementById("plots") === null) currencyBonusOne();
}

function currencyBonusOne() {
	button = createButton(buyPlot, "Plot", "plots", "<span id=\"plotCost\">0</span> money", document.getElementById("purchase"));
		addBreak(button);
		addDescription(button, "Increases the amount of goat space available by 10 for each plot.");
	updateCost();
}

function upgradeClick() {
	if(currency >= 100) {
		currency -= 100;
		clickMod *= 2;
		upgradeClickOne = 1;
		
		document.getElementById("upgradeClicks").remove();
		document.getElementById("upgradeClicksbr").remove();
		
		updateValues();
		updateCost();
		calculateCurrency();
	}
}

function buyPlot() {
	var curCost = getPlotCost();
	if(currency >= curCost) {
		plots = plots + 1;
		goatSpace = goatSpace + 10;
		currency = currency - curCost;
		
		addPlotImg();
		
		if(plots == 1) plotBonusOne();
		if(plots == 2) plotBonusTwo();
		
		updateValues();
		updateCost();
		calculateCurrency();
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

function plotBonusOne() {
	var button = createButton(buyGoat, "Goat", "goats", "<span id=\"goatCost\">0</span> money", document.getElementById("purchase"));
		addBreak(button);
		addDescription(button, "Increases money production by <span id=\"goatModDescription\">0.4</span> per/s for each goat.");
	
	button = createButton(upgradeGrass, "Grass", "grass", "<span id=\"grassCost\">0</span> money", document.getElementById("upgrades"));
		addBreak(button);
		addDescription(button, "Increases money production of base goats by 0.1 per/s for each grass.");
		addDescription(button, "You currently have <span id=\"grassGoatShow\">0</span> base goats.");
}

function plotBonusTwo() {
	button = createButton(buyScienceGoat, "Science Goat", "scienceGoats", "<span id=\"scienceGoatCost\">0</span> money", document.getElementById("purchase"));
		addBreak(button);
		addDescription(button, "Increases electricity production base by " + scienceGoatMod + " per/s for each science goat.");
}

function getPlotCost() {
	return Math.floor(25 * (plots + 1));
}

function buyGoat() {
	var curCost = getGoatCost();
	if(currency >= curCost && goatSpace >= 1) {
		goats = goats + 1;
		goatSpace = goatSpace - 1;
		currency = currency - curCost;
		
		if(goats == 5 && document.getElementById("bronzeGoats") === null) goatBonusOne();
		if(goats == 10 && document.getElementById("goatHeroes") === null) unlockGoatHeroes();
		
		var maxGoatSpace = (plots * plotMod * plotSize);
		var plotId = Math.max(Math.floor((maxGoatSpace - goatSpace -1)/10), 0);
		
		var graphics = document.getElementById("graphics").getBoundingClientRect();
		var gPlots = Math.floor((graphics.right - graphics.left - 8)/200);
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
		
		document.getElementById("graphics").appendChild(img);
		
		updateValues();
		updateCost();
		calculateCurrency();
	}
}

function getGoatCost() {
	return Math.floor(10 * Math.pow(1.2, goats));
}

function goatBonusOne() {
	unlockBronzeGoats = 1;
	button = createButton(buyBronzeGoat, "Bronze Goat", "bronzeGoats", "<span id=\"bronzeGoatCost\">0</span> money", document.getElementById("purchase"));
		addBreak(button);
		addDescription(button, "Increases money production by <span id=\"bronzeGoatModDescription\">1.2</span> per/s for each bronze goat.");
}

function buyBronzeGoat() {
	var curCost = getBronzeGoatCost();
	if(currency >= curCost && goatSpace >= 1) {
		bronzeGoats = bronzeGoats + 1;
		goatSpace = goatSpace - 1;
		currency = currency - curCost;
		
		if(bronzeGoats == 5 && document.getElementById("bronzeMedal") === null && upgradeBronzeMedal === 0) bronzeGoatBonusOne();
		if(bronzeGoats == 10 && document.getElementById("silverGoats") === null) unlockSilverGoats();
		
		updateValues();
		updateCost();
		calculateCurrency();
	}
}

function bronzeGoatBonusOne() {
	button = createOneTimeButton(buyBronzeMedal, "Bronze Medal", "bronzeMedal", "2000 money", document.getElementById("upgrades"));
	addBreak(button);
	addDescription(button, "A one time purchase that doubles the base rate of bronze goats money production.");
}

function getBronzeGoatCost() {
	return Math.floor(100 * Math.pow(1.2, bronzeGoats));
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

/*  Silver Goats
 *
 *
 *
 */
function unlockSilverGoats() {
	silverGoatUnlock = 1;
	button = createButton(buySilverGoat, "Silver Goat", "silverGoats", "<span id=\"silverGoatCost\">0</span> money", document.getElementById("purchase"));
	addBreak(button);
	addDescription(button, "Increases money production by <span id=\"silverGoatModDescription\">0</span> per/s for each silver goat.");
}

function buySilverGoat() {
	var curCost = getSilverGoatCost();
	if(currency >= curCost) {
		silverGoats += 1;
		currency -= curCost;
		
		if(silverGoats == 5 && document.getElementById("silverMedal") === null && silverMedalUnlock === 0) unlockSilverMedal();
		
		updateValues();
		updateCost();
		calculateCurrency();
	};
}

function getSilverGoatCost() {
	return Math.floor(1000 * Math.pow(1.2, silverGoats));
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
		upgradeBronzeMedal = 1;
		silverGoatMod *= 2;
		
		updateValues();
		updateCost();
		calculateCurrency();
		
		document.getElementById("silverMedal").remove();
		document.getElementById("silverMedalbr").remove();
	}
}