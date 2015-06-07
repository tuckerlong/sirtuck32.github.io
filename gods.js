var god = "";
var blessing = "inactive";

var favor = 0;
var favorInc = 0;

var goatHeroesUnlock = 0;
var goatHeroes = 0;
var goatHeroMod = 0;

var sunGoats = 0;
var sunGoatCurrencyMod = 1.0;
var sunGoatFavorMod = 1.0;

var soothyGoats = 0;
var unlockSoothy = 0;

function favorClick(number) {
	favor += prettify(number);
	document.getElementById("favor").innerHTML = prettify(favor);
}

function unlockGoatHeroes() {
	goatHeroesUnlock = 1;
	button = createButton(buyGoatHero, "Goat Hero", "goatHeroes", "<span id=\"goatHeroCost\">0</span> goats", document.getElementById("purchase"));
	addBreak(button);
	addDescription(button, "Allows you to go on heroic goat quest. Each goat hero increases quest completion speed.");
}

function buyGoatHero() {
	var curCost = getPurchase(goatHero).getCost();
	if(currency >= curCost && goatSpace >= 1) {
		getPurchase(goatHero).count += 1;
		goatSpace = goatSpace - 1;
		currency -= curCost;
		
		if(getPurchase(goatHero).count == 1) goatHeroBonusOne();

		updateAll();
	}
}

function goatHeroBonusOne() {
	document.getElementById("questTabs").style.display = "block";
	document.getElementById("heroTab").style.display = "block";
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

function buySoothyGoat() {
	var curCost = getSoothyGoatCost();
	if(currency >= curCost) {
		soothyGoats += 1;
		currency -= curCost;
		
		updateValues();
		updateCost();
		calculateCurrency();
	}
}

function unlockSoothyGoat() {
	if(favor >= 10000) {
		unlockSoothy = 1;
		favor -= 10;
		
		var button = createButton(buySoothyGoat, "Soothy Goat", "soothyGoats", "<span id=\"soothyGoatCost\">0</span> money", document.getElementById("purchase"));
		addBreak(button);
		addDescription(button, "Increases the amount found during quest.");
		
		updateValues();
		updateCost();
		calculateCurrency();
		
		document.getElementById("soothyUnlock").remove();
	}
}

function getSoothyGoatCost() {
	return Math.floor(2000 * Math.pow(1.2, soothyGoats));
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



function finishQuest() {
	rndm = Math.random();
	if(rndm < 1.5) {
		document.getElementById("heroicQuestReward").innerHTML = "<img src=\"armorSpike.png\" class=\"rewardIcon\" title=\"Armor Spike\">";
		addItem(armorSpike, 1);
		updateAll();
	} else {
		rndm = prettify(Math.floor(Math.random() * (100 + (100 * soothyGoats))) + 1 + (50 * soothyGoats)); 
		document.getElementById("heroicQuestReward").innerHTML = rndm + " money";
		currencyClick(rndm);
	}
}

window.setInterval(function() {
	if(quest === "active") {
		document.getElementById("questBar").value += (1 * getPurchase(goatHero).count);
		document.getElementById("progress").innerHTML = prettify(document.getElementById("questBar").value/document.getElementById("questBar").max * 100) + "%";
		if(document.getElementById("questBar").value >= document.getElementById("questBar").max) {
			quest = "inactive";
			document.getElementById("questBar").value = 0;
			document.getElementById("progress").innerHTML = "Finished"
			
			
			rndm = Math.random();
			if(god === "") {
				if(rndm < 0.15) {
					rndm = Math.random();
					if(rndm < 0) {
						if(confirm("You found the statue of the Ancient God Goatseidon. Will you worship it?") == true) {
							god = "GOATSEIDON";
							document.getElementById("godName1").innerHTML = "GOATSEIDON";
							document.getElementById("god").style.display = "block";
							document.getElementById("goatseidon").style.display = "block";	
						}
					} else if(rndm < 0) {
						if(confirm("You found the statue of the Ancient God Gometer. Will you worship it?") == true) {
							god = "GOMETER";
							document.getElementById("godName2").innerHTML = "GOMETER";
							document.getElementById("god").style.display = "block";
							document.getElementById("gometer").style.display = "block";
						}
					} else {
						if(confirm("You found the statue of the Ancient God Gopollo. Will you worship it?") == true) {
							god = "GOPOLLO";
							document.getElementById("banner").style.display = "block";
							document.getElementById("godName3").innerHTML = "GOPOLLO";
							document.getElementById("god").style.display = "block";
							document.getElementById("gopollo").style.display = "block";
						}
					}
				} else {
					finishQuest();
				}
			} else {
				finishQuest();
			}
		}
	}
}, 500);


