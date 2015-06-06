var electricity = 0;
var electricityInc = 0;

var scienceGoats = 0;
var scienceGoatMod = 0.1;

var bionicGoats = 0;
var bionicGoatCurrencyMod = 0.6;
var bionicGoatElectricityMod = 0.1;

var rockets = 0;
var rocketMod = -1.0;

function electricityClick(number) {
	electricity += prettify(number);
	electricity = Math.max(electricity, 0);
	document.getElementById("electricity").innerHTML = prettify(electricity);
	
}

function buyScienceGoat() {
	var curCost = getPurchase(scienceGoat).getCost();
	if(currency >= curCost && goatSpace >= 1) {
		getPurchase(scienceGoat).count += 1;
		goatSpace = goatSpace - 1;
		currency -= curCost;

		updateAll();
	}
}

function buyScienceGoatUpgradeOne() {
	if(currency >= 5000) {
		currency -= 5000;
		scienceGoatMod *= 2;
		scienceGoatUpgradeOne = 1;
		
		updateValues();
		updateCost();
		calculateCurrency();
		
		document.getElementById("smarterGoats").remove();
		document.getElementById("smarterGoatsbr").remove();
	}
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