var currency = 0;
var currencyInc = 0;

var plots = 0;
var plotMod = 10;
var plotBaseCost = 25;
var plotRate = 1.1;

var goats = 0;
var goatMod = 0.4;
var goatBaseCost = 25;
var goatRate = 1.1;
var goatSpace = 0;

var grass = 1;
var plotSize = 1;

function currencyClick(number) {
	currency = currency + prettify(number);
	document.getElementById("currency").innerHTML = prettify(currency);
	
	if(currency >= 25 && document.getElementById("plots") === null) currencyBonusOne()
}

function currencyBonusOne() {
	button = createButton(buyPlot, "Plot", "plots", "<span id=\"plotCost\">0</span> money", document.getElementById("purchase"));
		addBreak(button);
		addDescription(button, "Increases the amount of goat space by 10 for each plot.");
	updateCost();
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
		addDescription(button, "Increases money production base by " + goatMod + " per/s for each goat.");
	
	createButton(buyGoatHero, "Goat Hero", "goatHeroes", "<span id=\"goatHeroCost\">0</span> goats", document.getElementById("purchase"));	
	
	button = createButton(upgradeGrass, "Grass", "grass", "<span id=\"grassCost\">0</span> money", document.getElementById("upgrades"));
		addBreak(button);
		addDescription(button, "Increases money production of base goats by <span id=\"grassGoatModShow\">0.1</span> per/s for each grass.");
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