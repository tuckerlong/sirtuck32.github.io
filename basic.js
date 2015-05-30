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
	
	if(currency >= 25 && document.getElementById("plots") === null) {
		createButton(buyPlot, "Plot", "plots", "<span id=\"plotCost\">0</span> money", document.getElementById("purchase"));
		updateCost();
	}
}

function buyPlot() {
	var curCost = getPlotCost();
	if(currency >= curCost) {
		plots = plots + 1;
		goatSpace = goatSpace + 10;
		currency = currency - curCost;
		
		img = document.createElement("img");
		img.src = "basePlot.png";
		//img.style.position = "absolute";
		//img.style.left = "50px";
		//img.style.top = "50px";
		img.style.zIndex = 100;
		document.getElementById("graphics").appendChild(img);
		
		if(plots == 1) plotBonusOne();
		if(plots == 2) plotBonusTwo();
		
		updateValues();
		updateCost();
		calculateCurrency();
	}
}

function plotBonusOne() {
	createButton(buyGoat, "Goat", "goats", "<span id=\"goatCost\">0</span> money", document.getElementById("purchase"));
	createButton(buyGoatHero, "Goat Hero", "goatHeroes", "<span id=\"goatHeroCost\">0</span> goats", document.getElementById("purchase"));			
	var button = createButton(upgradeGrass, "Grass", "grass", "<span id=\"grassCost\">0</span> money", document.getElementById("upgrades"));
	
	var br = document.createElement("br");
	button.appendChild(br);
	
	var des = document.createElement("div");
	des.className = "description";
	des.innerHTML = "Increases money production of base goats by <span id=\"grassGoatModShow\">0.1</span> per/s for each grass.";
	button.appendChild(des);
	
	des = document.createElement("div");
	des.className = "description";
	des.innerHTML = "You currently have <span id=\"grassGoatShow\">0</span> base goats."
	button.appendChild(des);
}

function plotBonusTwo() {
	createButton(buyScienceGoat, "Science Goat", "scienceGoats", "<span id=\"scienceGoatCost\">0</span> money", document.getElementById("purchase"));
	var button = createButton(upgradePlot, "Larger Plots", "plotSize", "<span id=\"plotUpgradeCost\">0</span> money", document.getElementById("upgrades"));
	
	var br = document.createElement("br");
	button.appendChild(br);
	
	var des = document.createElement("div");
	des.className = "description";
	des.innerHTML = "Increases the amount of goat space each plot provides by 10.";
	button.appendChild(des);
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
		
		img = document.createElement("img");
		img.src = "goat.png";
		img.style.position = "absolute";
		img.style.left = "50px";
		img.style.top = "50px";
		img.style.width = "50px";  // Make these match the image...
		img.style.height = "50px";
		img.style.zIndex = 100;
		
		document.body.appendChild(img);
		window.setTimeout(function(){wanderAround(100, img, 50)}, 200);
		
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