var currency = 100000;
var currencyInc = 0;

var clickCount = 0;
var clickMod = 1;

var plotMod = 10;
var plotBaseCost = 25;
var plotRate = 1.1;

var goats = 0;
var goatMod = 0.4;
var goatBaseCost = 25;
var goatRate = 1.1;
var goatSpace = 0;

var bronzeGoatMod = 1.2;
var silverGoatMod = 4.8;
var goldGoatMod = 10;

var grass = 0;
var plotSize = 1;

/*  Clicks
 *
 *
 *
 */
 function generateClick() {
	clickCount += 1;
	currencyClick(clickMod);
	updateAll();
}

function currencyClick(number) {
	currency = currency + prettify(number);
	document.getElementById("currency").innerHTML = prettify(currency).toFixed(0).toLocaleString();
	//updateAll();
}

function buyClickOne() {
	if(currency >= getUpgrade(clickOne).cost) {
		applyClickOne();
		currency -= getUpgrade(clickOne).cost;
		addPurchasedUpgrade(clickOne);
		
		updateAll();
	}
}

function applyClickOne() {
	clickMod *= 2;
}

function buyClickTwo() {
	if(currency >= getUpgrade(clickTwo).cost) {
		applyClickTwo();
		currency -= getUpgrade(clickTwo).cost;
		addPurchasedUpgrade(clickTwo);
		
		updateAll();
	}
}

function applyClickTwo() {
	clickMod *= 2;
}

function buyClickThree() {
	if(currency >= getUpgrade(clickThree).cost) {
		applyClickThree();
		currency -= getUpgrade(clickThree).cost;
		addPurchasedUpgrade(clickThree);
		
		updateAll();
	}
}

function applyClickThree() {
	clickMod *= 2;
}

/*  Plots
 *
 *
 *
 */
function buyPlot() {
	var curCost = getPurchase(plot).getCost();
	if(currency >= curCost) {
		getPurchase(plot).count += 1;
		goatSpace = goatSpace + 10;
		currency = currency - curCost;
		
		updateAll();
	}
}

/*  Goats
 *
 *
 *
 */
function buyGoat() {
	var curCost = getPurchase(goat).getCost();
	if(currency >= curCost && goatSpace >= 1) {
		getPurchase(goat).count += 1;
		goatSpace = goatSpace - 1;
		currency = currency - curCost;

		updateAll();
	}
}

/*  Bronze Goats
 *
 *
 *
 */
function buyBronzeGoat() {
	var curCost = getPurchase(bronzeGoat).getCost();
	if(currency >= curCost && goatSpace >= 1) {
		getPurchase(bronzeGoat).count += 1;
		goatSpace = goatSpace - 1;
		currency = currency - curCost;
		
		updateAll();
	}
}

/*  Bronze Medal
 *
 *
 *
 */
function buyBronzeMedal() {
	if(currency >= getUpgrade(bronzeMedal).cost) {
		applyBronzeMedal();
		currency -= getUpgrade(bronzeMedal).cost;
		addPurchasedUpgrade(bronzeMedal);
		
		updateAll();
	}
}

function applyBronzeMedal() {
	bronzeGoatMod *= 2;
}

/*  Silver Goats
 *
 *
 *
 */
function buySilverGoat() {
	var curCost = getPurchase(silverGoat).getCost();
	if(currency >= curCost && goatSpace >= 1) {
		getPurchase(silverGoat).count += 1;
		goatSpace -= 1;
		currency -= curCost;
		
		updateAll();
	}
}

/*  Silver Medal
 *
 *
 *
 */
function buySilverMedal() {
	if(currency >= getUpgrade(silverMedal).cost) {
		applySilverMedal();
		currency -= getUpgrade(silverMedal).cost;
		addPurchasedUpgrade(silverMedal);
		
		updateAll();
	}
}

function applySilverMedal() {
	silverGoatMod *= 2;
}

/*  Gold Goats
 *
 *
 *
 */ 
function buyGoldGoat() {
	var curCost = getPurchase(goldGoat).getCost();
	if(currency >= curCost && goatSpace >= 1) {
		getPurchase(goldGoat).count += 1;
		goatSpace -= 1;
		currency -= curCost;
		
		updateAll();
	}
}

/*  Gold Medal
 *
 *
 *
 */
function buyGoldMedal() {
	if(currency >= getUpgrade(goldMedal).cost) {
		applyGoldMedal();
		currency -= getUpgrade(goldMedal).cost;
		addPurchasedUpgrade(goldMedal);
		
		updateAll();
	}
}

function applyGoldMedal() {
	goldGoatMod *= 2;
}






 

