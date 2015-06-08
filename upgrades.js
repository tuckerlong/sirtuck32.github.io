var clickOne = {
	onclick: buyClickOne,
	onload: "applyClickOne",
	name: "Strong Clicks",
	description: "A one time purchase that doubles the base rate of clicking production.",
	unlockId: "Strong Clicks Count",
	unlock: "Click a total of 10 times to unlock. <span id=\"Strong Clicks Count\">10</span> left to go.",
	unlockFormula: "10 - clickCount",
	purchased: false,
	unlocked: false,
	showFormula: "clickCount >= 0",
	show: false,
	oneTime: true,
	cost: 20,
	costDescription: "20 money"
}

var clickTwo = {
	onclick: buyClickTwo,
	onload: "applyClickTwo",
	name: "Super Clicks",
	description: "A one time purchase that doubles the base rate of clicking production.",
	unlockId: "Super Clicks Count",
	unlock: "Click a total of 100 times to unlock. <span id=\"Super Clicks Count\">100</span> left to go.",
	unlockFormula: "100 - clickCount",
	purchased: false,
	unlocked: false,
	showFormula: "getUpgrade(clickOne).unlocked === true",
	show: false,
	oneTime: true,
	cost: 200,
	costDescription: "200 money"
}

var clickThree = {
	onclick: buyClickThree,
	onload: "applyClickThree",
	name: "Ultra Clicks",
	description: "A one time purchase that doubles the base rate of clicking production.",
	unlockId: "Ultra Clicks Count",
	unlock: "Click a total of 1000 times to unlock. <span id=\"Ultra Clicks Count\">1000</span> left to go.",
	unlockFormula: "1000 - clickCount",
	purchased: false,
	unlocked: false,
	showFormula: "getUpgrade(clickTwo).unlocked === true",
	show: false,
	oneTime: true,
	cost: 5000,
	costDescription: "5000 money"
}
	
var bronzeMedal = {
	onclick: buyBronzeMedal,
	onload: "applyBronzeMedal",
	name: "Bronze Medal",
	description: "A one time purchase that doubles the base rate of bronze goats money production.",
	unlockId: "Bronze Medal Bronze Goats Count",
	unlock: "Buy 5 bronze goats to unlock. <span id=\"Bronze Medal Bronze Goats Count\">0</span> left to go.",
	unlockFormula: "5 - getPurchase(bronzeGoat).count",
	purchased: false,
	unlocked: false,
	showFormula: "getPurchase(bronzeGoat).unlocked === true",
	show: false,
	oneTime: true,
	cost: 2000,
	costDescription: "2000 money"
}

var silverMedal = {
	onclick: buySilverMedal,
	onload: "applySilverMedal",
	name: "Silver Medal",
	description: "A one time purchase that doubles the base rate of silver goats money production.",
	unlockId: "Silver Medal Silver Goats Count",
	unlock: "Buy 5 silver goats to unlock. <span id=\"Silver Medal Silver Goats Count\">0</span> left to go.",
	unlockFormula: "5 - getPurchase(silverGoat).count",
	purchased: false,
	unlocked: false,
	showFormula: "getPurchase(silverGoat).unlocked === true",
	show: false,
	oneTime: true,
	cost: 10000,
	costDescription: "10000 money"
}

var goldMedal = {
	onclick: buyGoldMedal,
	onload: "applyGoldMedal",
	name: "Gold Medal",
	description: "A one time purchase that doubles the base rate of gold goats money production.",
	unlockId: "Gold Medal Gold Goats Count",
	unlock: "Buy 5 gold goats to unlock. <span id=\"Gold Medal Gold Goats Count\">0</span> left to go.",
	unlockFormula: "5 - getPurchase(goldGoat).count",
	purchased: false,
	unlocked: false,
	showFormula: "getPurchase(goldGoat).unlocked === true",
	show: false,
	oneTime: true,
	cost: 100000,
	costDescription: "100000 money"
}

var doubleStrengthUpgrade = {
	onclick: buyDoubleStrength,
	onload: "applyDoubleStrength",
	name: "Double Strength",
	description: "A one time purchase that unlocks the double strength skill.",
	unlockId: "Double Strength Silver Goats Count",
	unlock: "Buy 10 silver goats to unlock. <span id=\"Double Strength Silver Goats Count\">0</span> left to go.",
	unlockFormula: "10 - getPurchase(silverGoat).count",
	purchased: false,
	unlocked: false,
	showFormula: "getUpgrade(silverMedal).unlocked === true",
	show: false,
	oneTime: true,
	cost: 100000,
	costDescription: "100000 money"
}

var bandages = {
	onclick: buyBandages,
	onload: "applyBandages",
	name: "Bandages",
	description: "A one time purchase that doubles the amount of healing goat medics do.",
	unlockId: "Bandages Goat Medic Count",
	unlock: "Buy 5 goat medics to unlock. <span id=\"Bandages Goat Medic Count\">0</span> left to go.",
	unlockFormula: "5 - getPurchase(goatMedic).count",
	purchased: false,
	unlocked: false,
	showFormula: "getPurchase(goatMedic).unlocked === true",
	show: false,
	oneTime: true,
	cost: 10000,
	costDescription: "10000 money"
}

var upgrades = [clickOne, clickTwo, clickThree, bronzeMedal, silverMedal, goldMedal, doubleStrengthUpgrade, bandages];
var upgrades_updated = upgrades;

function showPurchasedUpgrades() {
	var test = document.getElementById("showUpgrades").checked;
	if(test === true) {
		for(i = 0; i < upgrades.length; i++) {
			if(upgrades[i].purchased === true) {
				addPurchasedUpgrade(upgrades[i]);
			}
		}
	} else {
		var x = document.getElementsByClassName("purchasedUpgrade");
		for(i = x.length; i > 0; i--)
			document.getElementsByClassName("purchasedUpgrade")[i-1].remove();
	}
}

function addPurchasedUpgrade(upgrade) {
	var x = upgrades[upgrades.indexOf(upgrade)];
	var test = document.getElementById("showUpgrades").checked;
	
	if(document.getElementById(x.name) !== null) document.getElementById(x.name).remove();
	
	x.purchased = true;
	if(test === true) {
		var up = document.createElement("div");
		up.className = "purchasedUpgrade";
		up.innerHTML = x.name;
		
		addDescription(up, x.description);
		
		document.getElementById("purchasedUpgrades").appendChild(up);
	}
}

function addNextUpgrade(upgrade) {
	upgrades[upgrade].show = true;
	var up = document.createElement("div");
	up.id = upgrades[upgrade].name;
	up.className = "nextUpgrade";
	up.innerHTML = upgrades[upgrade].unlock;
	
	document.getElementById("nextUpgrades").appendChild(up);
}

function addUpgrade(upgrade) {
	var x = upgrades[upgrade];
	x.unlocked = true;
	if(document.getElementById(x.name) !== null) document.getElementById(x.name).remove();

	if(x.oneTime === true) {
		var button = createOneTimeButton(upgrades_updated[upgrade].onclick, x.name, x.name, x.costDescription, document.getElementById("availableUpgrades"));
		addBreak(button);
		addDescription(button, x.description);
	}
}

function updateUpgrades() {
	for(i = 0; i < upgrades.length; i++) {
		if(typeof upgrades_updated[i] !== "undefined") {
			upgrades_updated[i].purchased = upgrades[i].purchased;
			upgrades_updated[i].unlocked = upgrades[i].unlocked;
			upgrades_updated[i].show = upgrades[i].show;
		}
	}
	
	if(upgrades.length != upgrades_updated.length)
		refresh = true;
	upgrades = upgrades_updated;
}

function checkUpgrades() {
	for(i = 0; i < upgrades.length; i++) {
		if(eval(upgrades[i].showFormula) && upgrades[i].show === false) addNextUpgrade(i);
		if(eval(upgrades[i].unlockFormula) <= 0 && upgrades[i].unlocked === false) addUpgrade(i);
	}
}

function getUpgrade(upgrade) {
	return upgrades[upgrades.indexOf(upgrade)];
}

function clearUpgrades() {
	for(i = 0; i < upgrades.length; i++) {
		upgrades[i].count = 0;
		upgrades[i].purchased = false;
		upgrades[i].unlocked = false;
		upgrades[i].show = false;
	}
}
