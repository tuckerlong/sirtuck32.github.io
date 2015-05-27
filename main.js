//bower install progressbar.js


var currency = 1000000;
var currencyInc = 0;
var cursors = 0;
var prestige = 0;
var plots = 0;
var plotShow = "hidden";

var goats = 60;
var goatMod = 0.4;
var goatSpace = 0;

var goatHeroes = 0;

var grass = 1;

var quest = "inactive";


function currencyClick(number) {
	currency = currency + number;
	document.getElementById("currency").innerHTML = prettify(currency);
	
	if(currency >= 25 && plotShow === "hidden") {
		plotShow = "visible";
		document.getElementById("land").style.visibility = plotShow;
		document.getElementById("plotText").style.visibility = plotShow;
	};
}

function buyPlot() {
	var curCost = Math.floor(25 * (plots + 1));
	if(currency >= curCost) {
		plots = plots + 1;
		goatSpace = goatSpace + 10;
		currency = currency - curCost;
		document.getElementById("currency").innerHTML = prettify(currency);
		document.getElementById("goatSpace").innerHTML = prettify(goatSpace);
		document.getElementById("plots").innerHTML = prettify(plots);
			
		document.getElementById("goat").style.visibility = plotShow;
		document.getElementById("goatText").style.visibility = plotShow;
		
		document.getElementById("goatHero").style.visibility = "visible";
		document.getElementById("goatHeroText").style.visibility = "visible";
		
		document.getElementById("grass").style.visibility = "visible";
		
		if(plots >= 2) {
			document.getElementById("scienceGoat").style.visibility = "visible";
			document.getElementById("scienceGoatText").style.visibility = "visible";
		}
	};
	
	var nextCost = Math.floor(25 * (plots + 1));
	document.getElementById("plotCost").innerHTML = prettify(nextCost);
}

function buyGoat() {
	var curCost = Math.floor(10 * Math.pow(1.2, goats));
	if(currency >= curCost && goatSpace >= 1) {
		goats = goats + 1;
		goatSpace = goatSpace - 1;
		currency = currency - curCost;
		document.getElementById("currency").innerHTML = prettify(currency);
		document.getElementById("goatSpace").innerHTML = prettify(goatSpace);
		document.getElementById("goats").innerHTML = prettify(goats);
		
		calculateCurrency();
		
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
	};
	
	var nextCost = Math.floor(10 * Math.pow(1.2, goats));
	document.getElementById("goatCost").innerHTML = prettify(nextCost);
}

function buyGoatHero() {
	var curCost = Math.floor(20 * (goatHeroes + 1));
	if(goats >= curCost) {
		goatHeroes = goatHeroes + 1;
		goatSpace = goatSpace + 10;
		goats = goats - curCost;
		document.getElementById("currency").innerHTML = prettify(currency);
		document.getElementById("goatHeroes").innerHTML = prettify(goatHeroes);
		document.getElementById("goatSpace").innerHTML = prettify(goatSpace);
		document.getElementById("goats").innerHTML = prettify(goats);
		
		var nextCost = Math.floor(10 * (goats + 1));
		document.getElementById("goatCost").innerHTML = prettify(nextCost);
		
		calculateCurrency();
		
		document.getElementById("quest").style.visibility = "visible";
	};
	
	var nextCost = Math.floor(20 * (goatHeroes + 1));
	document.getElementById("goatHeroCost").innerHTML = prettify(nextCost);
}

function updateCost() {
	var nextCost = Math.floor(10 * (goats + 1));
	document.getElementById("goatCost").innerHTML = prettify(nextCost);
	
	nextCost = Math.floor(20 * (goatHeroes + 1));
	document.getElementById("goatHeroCost").innerHTML = prettify(nextCost);
	
	// SCIENCE
	nextCost = Math.floor(20 * (scienceGoats + 1));
	document.getElementById("scienceGoatCost").innerHTML = prettify(nextCost);
	
	nextCost = Math.floor(20 * (bionicGoats + 1));
	document.getElementById("bionicGoatCost").innerHTML = prettify(nextCost);
}

function updateValues() {
	document.getElementById("currency").innerHTML = prettify(currency);
	document.getElementById("plots").innerHTML = prettify(plots);
	document.getElementById("goats").innerHTML = prettify(goats);
	document.getElementById("goatHeroes").innerHTML = prettify(goatHeroes);
	document.getElementById("sunGoats").innerHTML = prettify(sunGoats);
	
	// SCIENCE
	document.getElementById("scienceGoats").innerHTML = prettify(scienceGoats)
	document.getElementById("bionicGoats").innerHTML = prettify(bionicGoats)
}

function startQuest() {
	quest = "active";
}

function wanderAround(counter, img, left) {
	--counter;
	if (counter < 0)
	{
		// Done; remove it
		document.body.removeChild(img);
	}
	else
	{
		// Animate a bit more
		left += 10;
		img.style.left = left + "px";

		// Re-trigger ourselves
		window.setTimeout(function(){wanderAround(counter, img, left)}, 200);
	}
}

function upgradeGrass() {
	var curCost = Math.floor(100 * Math.pow(1.5, grass));
	if(currency >= curCost) {
		grass = grass + 1;
		currency = currency - curCost;
		document.getElementById("currency").innerHTML = prettify(currency);
		
		calculateCurrency();
	};
	
	var nextCost = Math.floor(100 * Math.pow(1.5, grass));
	document.getElementById("grassCost").innerHTML = prettify(nextCost);
}

function calculateCurrency() {
	currencyInc = goats * (goatMod * grass);
	document.getElementById("currencyInc").innerHTML = prettify(currencyInc);
	
	electricityInc = scienceGoats * scienceGoatMod;
	document.getElementById("electricityInc").innerHTML = prettify(electricityInc);
}

function prettify(input) {
	var output = Math.round(input * 1000000)/1000000;
	return output;
}


function startup() {
	document.getElementById("land").style.visibility = "hidden";
	document.getElementById("plotText").style.visibility = "hidden";
	
	document.getElementById("goat").style.visibility = "hidden";
	document.getElementById("goatText").style.visibility = "hidden";
	
	document.getElementById("grass").style.visibility = "hidden";
	
	
	// GODS
	document.getElementById("goatHero").style.visibility = "hidden";
	document.getElementById("goatHeroText").style.visibility = "hidden";
	
	document.getElementById("quest").style.visibility = "hidden";
	
	document.getElementById("god").style.display = "none";
	document.getElementById("goatseidon").style.display = "none";
	document.getElementById("gometer").style.display = "none";
	
	document.getElementById("gopollo").style.display = "none";
		document.getElementById("sunGoatText").style.visibility = "hidden";
		
		
	// SCIENCE
	document.getElementById("electricityText").style.visibility = "hidden";
	document.getElementById("electricityVal").style.visibility = "hidden";
	
	document.getElementById("scienceGoat").style.visibility = "hidden";
	document.getElementById("scienceGoatText").style.visibility = "hidden";
	
	document.getElementById("bionicGoat").style.visibility = "hidden";
	document.getElementById("bionicGoatText").style.visibility = "hidden";
	
	
	load();
}


function save() {
	var save = { 
		currency: currency,
		plots: plots,
		goatSpace: goatSpace,
		plotShow: plotShow
	}
	localStorage.setItem("save", JSON.stringify(save));
}

function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	
	if(typeof savegame.currency !== "undefined")
		currency = savegame.currency;
	if(typeof savegame.plots !== "undefined")
		plots = savegame.plots;
	if(typeof savegame.goatSpace !== "undefined")
		goatSpace = savegame.goatSpace;
		
	if(typeof savegame.plotShow !== "undefined")
		plotShow = savegame.plotShow;
	
	document.getElementById("currency").innerHTML = prettify(currency);
	document.getElementById("plots").innerHTML = prettify(plots);
	document.getElementById("goatSpace").innerHTML = prettify(goatSpace);
	
	document.getElementById("land").style.visibility = plotShow;
	document.getElementById("plotText").style.visibility = plotShow;
	
	if(plots >= 1) {
		document.getElementById("goat").style.visibility = "visible";
		document.getElementById("goatText").style.visibility = "visible";
		
		document.getElementById("goatHero").style.visibility = "visible";
		document.getElementById("goatHeroText").style.visibility = "visible";
	};
	
	var nextCost = Math.floor(25 * (plots + 1));
	document.getElementById("plotCost").innerHTML = prettify(nextCost);
}

function deleteSave() {
	localStorage.removeItem("save")
}

function praiseIt() {
	console.log("test");
	document.getElementById("land").style.display = "none";
}

window.setInterval(function() {
	currencyClick((goats * goatMod * grass));
	electricityClick((scienceGoats * scienceGoatMod ));
}, 1000);

window.setInterval(function() {
	if(quest === "active") {
		document.getElementById("questBar").value += (1 * goatHeroes);
		document.getElementById("progress").innerHTML = prettify(document.getElementById("questBar").value/document.getElementById("questBar").max * 100) + "%";
		if(document.getElementById("questBar").value >= document.getElementById("questBar").max) {
			quest = "inactive";
			document.getElementById("questBar").value = 0;
			document.getElementById("progress").innerHTML = "Finished"
			
			rndm = Math.random();
			
			if(rndm < 0.33) {
				if(confirm("You found the statue of the Ancient God Goatseidon. Will you worship it?") == true) {
					document.getElementById("godName").innerHTML = "GOATSEIDON"	
					document.getElementById("god").style.display = "block";
					document.getElementById("goatseidon").style.display = "block";		
				} else {
				
				}
			} else if(rndm >= 0.33 && rndm < 0.66) {
				if(confirm("You found the statue of the Ancient God Gometer. Will you worship it?") == true) {
					document.getElementById("godName").innerHTML = "GOMETER"
					document.getElementById("god").style.display = "block";
					document.getElementById("gometer").style.display = "block";
				} else {
				
				}
			} else {
				if(confirm("You found the statue of the Ancient God Gopollo. Will you worship it?") == true) {
					document.getElementById("godName").innerHTML = "GOPOLLO"
					document.getElementById("god").style.display = "block";
					document.getElementById("gopollo").style.display = "block";
					document.getElementById("sunGoatText").style.visibility = "visible";
				} else {
				
				}
			}
		}
	}
}, 500);

