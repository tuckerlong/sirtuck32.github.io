var god = "";
var blessing = "inactive";

var favor = 0;
var favorInc = 0;

var goatHeroes = 0;

var sunGoats = 0;
var sunGoatCurrencyMod = 1.0;
var sunGoatFavorMod = 1.0;

function favorClick(number) {
	favor += prettify(number);
	document.getElementById("favor").innerHTML = prettify(favor);
}

function buyGoatHero() {
	var curCost = getGoatHeroCost();
	if(goats >= curCost) {
		goatHeroes = goatHeroes + 1;
		goats = goats - curCost;
		
		if(goatHeroes == 1) {
			document.getElementById("heroTab").style.display = "block";
		}
		

		var goatImgs = document.getElementsByClassName("baseGoatImg");
		var len = goatImgs.length;
		for(i = len; i > len - curCost; i--) {
			document.getElementsByClassName("baseGoatImg")[i-1].remove();
		}
		
		updateValues();
		updateCost();
		calculateCurrency();
	}
}

function getGoatHeroCost() {
	return Math.floor(2 * Math.pow(1.1, goatHeroes));
}

function buySunGoat() {
	var curCost = getSunGoatCostOne();
	var secCost = getSunGoatCostTwo();
	
	if(goatHeroes >= curCost && favor >= secCost) {
		sunGoats = sunGoats + 1;
		favor -= secCost;
		goatHeroes = goatHeroes - curCost;
		
		updateValues();
		updateCost();
		calculateCurrency();
	};
}

function getSunGoatCostOne() {
	return Math.floor(1 * (sunGoats + 1));
}

function getSunGoatCostTwo() {
	return Math.floor(10 * Math.pow(1.2, sunGoats));
}

function praiseIt() {
	favor += 1;
	
	updateValues();
}

function buyBlessing() {
	if(favor >= 1000 && blessing === "inactive") {
		favor -= 1000;
		blessing = "active";
		updateValues();
		updateCost();
		calculateCurrency();
	}
}

window.setInterval(function() {
	if(blessing === "active") {
		document.getElementById("blessingBar").value += 1;
		if(document.getElementById("blessingBar").value >= document.getElementById("blessingBar").max) {
			blessing = "inactive";
			document.getElementById("blessingBar").value = 0;
			calculateCurrency();
		}
	}
}, 500);