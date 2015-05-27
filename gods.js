var sunGoats = 0;

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