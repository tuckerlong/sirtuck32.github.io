var goatHeroes = 0;
var sunGoats = 0;

function buyGoatHero() {
	var curCost = getGoatHeroCost();
	if(goats >= curCost) {
		goatHeroes = goatHeroes + 1;
		goats = goats - curCost;
				
		
		
		if(goatHeroes == 1) {
			document.getElementById("quest").style.visibility = "visible";
		}
		
		updateValues();
		updateCost();
		calculateCurrency();
	}
}

function getGoatHeroCost() {
	return Math.floor(2 * (goatHeroes + 1));
}

function buySunGoat() {
	var curCost = Math.floor(1 * (sunGoats + 1));
	var secCost = Math.floor(10 * Math.pow(1.2, sunGoats));
	
	if(goatHeroes >= curCost && currency >= secCost) {
		console.log("in here");
		sunGoats = sunGoats + 1;
		currency -= secCost;
		goatHeroes = goatHeroes - curCost;
		
		updateValues();
		updateCost();
		calculateCurrency();
		
		var nextCost = Math.floor(1 * (sunGoats + 1));
		var nextSecCost = Math.floor(10 * Math.pow(1.2, sunGoats));
		document.getElementById("sunGoatCost").innerHTML = prettify(nextCost) + " Goat Hero(es), " + prettify(nextSecCost) + " money";
	};
}