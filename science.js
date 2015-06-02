var electricity = 0;
var electricityInc = 0;

var scienceGoats = 0;
var scienceGoatMod = 0.1;

var bionicGoats = 0;
var bionicGoatCurrencyMod = 0.8;
var bionicGoatElectricityMod = 0.8;

var rockets = 0;
var rocketMod = -1.0;

function electricityClick(number) {
	electricity += prettify(number);
	electricity = Math.max(electricity, 0);
	document.getElementById("electricity").innerHTML = prettify(electricity);
	
	if(electricity >= 25 && document.getElementById("bionicGoats") === null) electricityBonusOne();
}

function electricityBonusOne() {
	var button = createButton(buyBionicGoat, "Bionic Goat", "bionicGoats", "<span id=\"bionicGoatCost\">0</span> electricity", document.getElementById("purchase"));
		addBreak(button);
		addDescription(button, "Increases money production base by " + bionicGoatCurrencyMod + " per/s and electricity base production by  " + 
			bionicGoatElectricityMod + " per/s for each bionic goat.");
}

function buyScienceGoat() {
	var curCost = getScienceGoatCost();
	
	if(currency >= curCost && goatSpace >= 1) {
		scienceGoats += 1;
		goatSpace -= 1;
		currency -= curCost;
		
		if(scienceGoats == 10) scienceGoatBonusOne();
		
		updateValues();
		updateCost();
		calculateCurrency();
	};
}

function scienceGoatBonusOne() {
	button = createButton(buyRocket, "Rockets", "rockets", "<span id=\"rocketCost\">0</span> electricity", document.getElementById("upgrades"));
		addBreak(button);
		addDescription(button, "Increases the amount of rockets you have by 1.");
		addDescription(button, "Rockets allow for space travel but drain electricity by 1 per/s for each rocket.");
}

function getScienceGoatCost() {
	return Math.floor(20 * (scienceGoats + 1));
}

function buyBionicGoat() {
	var curCost = getBionicGoatCost();
	
	if(electricity >= curCost && goatSpace >= 1) {
		bionicGoats = bionicGoats + 1;
		goatSpace -= 1;
		electricity -= curCost;
		
		updateValues();
		updateCost();
		calculateCurrency();
	};
}

function getBionicGoatCost() {
	return Math.floor(20 * (bionicGoats + 1));
}

function buyRocket() {
	var curCost = getRocketCost();
	
	if(electricity >= curCost) {
		rockets += 1;
		electricity -= curCost;
		
		rocketBonusOne();
		
		updateValues();
		updateCost();
		calculateCurrency();
	}
}

function rocketBonusOne() {
	document.getElementById("questTabs").style.display = "block";
	document.getElementById("spaceTab").style.display = "block";
}

function getRocketCost() {
	return Math.floor(100 * Math.pow(1.1, rockets));
}