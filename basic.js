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
		img.className = "plotImg";
		img.onload = "draw";
		img.width = 200;
		img.height = 200;
		//img.style.position = "absolute";
		//img.style.left = "50px";
		//img.style.top = "50px";
		//img.style.zIndex = 100;
		
		/*canvas = document.createElement("canvas");
		canvas.id = "canvas";
		canvas.width = 200;
		canvas.height = 200;
		canvas.style="border:1px solid #d3d3d3;";
		canvas.innerHTML = "Your browser does not support the HTML5 canvas tag.";*/
		
		
		document.getElementById("graphics").appendChild(img);
		//document.getElementById("graphics").appendChild(canvas);
		//var cxt = document.getElementById("canvas").getContext("2d");
		//cxt.drawImage(img,0,0, 200, 200);
		
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