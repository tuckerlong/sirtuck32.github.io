function buySunGoat() {
	var curCost = Math.floor(1 * (goatHeroes + 1));
	var secCost = Math.floor(10 * Math.pow(1.2, goats));
	
	if(goatHeroes >= curCost && currency >= secCost) {
		console.log("in here");
		sunGoats = sunGoats + 1;
		currency -= secCost;
		goatHeroes = goatHeroes - curCost;
		
		document.getElementById("currency").innerHTML = prettify(currency);
		document.getElementById("goatHeroes").innerHTML = prettify(goatHeroes);
		document.getElementById("sunGoats").innerHTML = prettify(sunGoats);
		
		updateCost();
		calculateCurrency();
		
		document.getElementById("quest").style.visibility = "visible";
		
		var nextCost = Math.floor(1 * (goatHeroes + 1));
		var nextSecCost = Math.floor(10 * Math.pow(1.2, goats));
		document.getElementById("sunGoatCost").innerHTML = prettify(nextCost) + " Goat Hero(es), " + prettify(nextSecCost) + " money";
	};
}