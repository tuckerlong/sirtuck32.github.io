var plots = 0;
var plotMod = 10;
var plotBaseCost = 25;
var plotRate = 1.1;

var goats = 0;
var goatMod = 0.4;
var goatBaseCost = 25;
var goatRate = 1.1;
var goatSpace = 0;

function buyPlot() {
	var curCost = getPlotCost();
	if(currency >= curCost) {
		plots = plots + 1;
		goatSpace = goatSpace + 10;
		currency = currency - curCost;
		
		if(plots == 1) {
			createButton("goat", buyGoat, "Goat", "goats", "<span id=\"goatCost\">0</span> money", document.getElementById("purchase"));
			createButton("goatHero", buyGoatHero, "Goat Hero", "goatHeroes", "<span id=\"goatHeroCost\">0</span> goats", document.getElementById("purchase"));
		}
		
		if(plots == 2)
			createButton("scienceGoat", buyScienceGoat, "Science Goat", "scienceGoats", "<span id=\"scienceGoatCost\">0</span> money", document.getElementById("purchase"));
			
		updateValues();
		updateCost();
		calculateCurrency();
	}
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