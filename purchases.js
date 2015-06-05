var plot = {
	onclick: buyPlot,
	name: "Plot",
	val: "plots",
	descriptionId: null,
	description: "Increases the amount of goat space available by 10 for each plot.",
	descriptionFormula: null,
	unlockId: "Plot Clicks Count",
	unlock: "Click a total of 10 times to unlock. <span id=\"Plot Clicks Count\">0</span> left to go.",
	unlockFormula: "10 - clickCount",
	unlocked: false,
	showFormula: "clickCount == 0",
	show: false,
	costId: "plotCost",
	getCost: function() { return Math.floor(25 * (getPurchase(plot).count + 1)); },
	cost: "<span id=\"plotCost\">0</span> money",
	count: 0
}

var goat = {
	onclick: buyGoat,
	name: "Goat",
	val: "goats",
	descriptionId: "goatModDescription",
	description: "Increases money production by <span id=\"goatModDescription\">0.0</span> per/s for each goat.",
	descriptionFormula: "goatMod",
	unlockId: "Goat Plots Count",
	unlock: "Buy 1 plot to unlock. <span id=\"Goat Plots Count\">0</span> left to go.",
	unlockFormula: "1 - getPurchase(plot).count",
	unlocked: false,
	showFormula: "getPurchase(plot).unlocked === true",
	show: false,
	costId: "goatCost",
	getCost: function() { return Math.floor(5 * (getPurchase(goat).count + 1)); },
	cost: "<span id=\"goatCost\">0</span> money",
	count: 0
}

var bronzeGoat = {
	onclick: buyBronzeGoat,
	name: "Bronze Goat",
	val: "bronzeGoats",
	descriptionId: "bronzeGoatModDescription",
	description: "Increases money production by <span id=\"bronzeGoatModDescription\">0.0</span> per/s for each goat.",
	descriptionFormula: "bronzeGoatMod",
	unlockId: "Bronze Goat Goats Count",
	unlock: "Buy 5 goats to unlock. <span id=\"Bronze Goat Goats Count\">0</span> left to go.",
	unlockFormula: "5 - getPurchase(goat).count",
	unlocked: false,
	showFormula: "getPurchase(goat).unlocked === true",
	show: false,
	costId: "bronzeGoatCost",
	getCost: function() { return Math.floor(100 * (getPurchase(bronzeGoat).count + 1)); },
	cost: "<span id=\"bronzeGoatCost\">0</span> money",
	count: 0
}

var silverGoat = {
	onclick: buySilverGoat,
	name: "Silver Goat",
	val: "silverGoats",
	descriptionId: "silverGoatModDescription",
	description: "Increases money production by <span id=\"silverGoatModDescription\">0.0</span> per/s for each goat.",
	descriptionFormula: "silverGoatMod",
	unlockId: "Silver Goat Bronze Goats Count",
	unlock: "Buy 10 bronze goats to unlock. <span id=\"Silver Goat Bronze Goats Count\">0</span> left to go.",
	unlockFormula: "10 - getPurchase(bronzeGoat).count",
	unlocked: false,
	showFormula: "getPurchase(bronzeGoat).unlocked === true",
	show: false,
	costId: "silverGoatCost",
	getCost: function() { return Math.floor(500 * (getPurchase(silverGoat).count + 1)); },
	cost: "<span id=\"silverGoatCost\">0</span> money",
	count: 0
}

var goatHero = {
	onclick: buySilverGoat,
	name: "Goat Hero",
	val: "goatHeroes",
	descriptionId: "goatHeroModDescription",
	description: "Increases money production by <span id=\"goatHeroModDescription\">0.0</span> per/s for each goat.",
	descriptionFormula: "goatHeroMod",
	unlockId: "Goat Hero Goats Count",
	unlock: "Buy 20 goats to unlock. <span id=\"Goat Hero Goats Count\">0</span> left to go.",
	unlockFormula: "20 - getPurchase(goat).count",
	unlocked: false,
	showFormula: "getPurchase(bronzeGoat).unlocked === true",
	show: false,
	costId: "goatHeroCost",
	getCost: function() { return Math.floor(2 * (getPurchase(goatHero).count + 1)); },
	cost: "<span id=\"goatHeroCost\">0</span> goats",
	count: 0
}


var purchases = [plot, goat, bronzeGoat, silverGoat, goatHero]
var purchases_updated = purchases;

function addPurchase(purchase) {
	var x = purchases[purchases.indexOf(purchase)];
	x.unlocked = true;
	if(document.getElementById(x.name) !== null) document.getElementById(x.name).remove();

	var button = createButton(purchases_updated[purchases.indexOf(purchase)].onclick, x.name, x.val, x.cost, document.getElementById("availablePurchase"));
	addBreak(button);
	addDescription(button, x.description);
}

function addNextPurchase(purchase) {
	var x = purchases[purchases.indexOf(purchase)];
	var pur = document.createElement("div");
	
	x.show = true;
	
	pur.id = x.name;
	pur.className = "nextPurchase";
	pur.innerHTML = x.unlock;
	
	document.getElementById("nextPurchase").appendChild(pur);
}

function updatePurchases() {
	for(i = 0; i < purchases.length; i++) {
		purchases_updated[i].count = purchases[i].count;
		purchases_updated[i].unlocked = purchases[i].unlocked;
		purchases_updated[i].show = purchases[i].show;
	}
	purchases = purchases_updated;
}

function checkPurchases() {
	for(i = 0; i < purchases.length; i++) {
		if(eval(purchases[i].showFormula) && purchases[i].show === false) addNextPurchase(purchases[i]);
		if(eval(purchases[i].unlockFormula) <= 0 && purchases[i].unlocked === false) addPurchase(purchases[i]);
	}
}

function getPurchase(purchase) {
	return purchases[purchases.indexOf(purchase)];
}