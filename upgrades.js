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
	show: false,
	oneTime: true,
	cost: 20,
	costDescription: "20 money",
	index: 0
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
	show: false,
	oneTime: true,
	cost: 200,
	costDescription: "200 money",
	index: 1
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
	show: false,
	oneTime: true,
	cost: 5000,
	costDescription: "5000 money",
	index: 2
}
	
var bronzeMedal = {
	onclick: buyBronzeMedal,
	onload: "buyBronzeMedal",
	name: "Bronze Medal",
	description: "A one time purchase that doubles the base rate of bronze goats money production.",
	unlockId: "Bronze Medal Bronze Goats Count",
	unlock: "Buy 5 bronze goats to unlock. <span id=\"Bronze Medal Bronze Goats Count\">0</span> left to go.",
	unlockFormula: "5 - purchases[bronzeGoat.index].count",
	purchased: false,
	unlocked: false,
	show: false,
	oneTime: true,
	cost: 1000,
	costDescription: "1000 money",
	index: 3
}

var silverMedal = {
	onclick: buySilverMedal,
	onload: "buySilverMedal",
	name: "Silver Medal",
	description: "A one time purchase that doubles the base rate of silver goats money production.",
	unlockId: "Silver Medal Silver Goats Count",
	unlock: "Buy 5 silver goats to unlock. <span id=\"Silver Medal Silver Goats Count\">0</span> left to go.",
	unlockFormula: "5 - purchases[silverGoat.index].count",
	purchased: false,
	unlocked: false,
	show: false,
	oneTime: true,
	cost: 2000,
	costDescription: "2000 money",
	index: 4
}

var upgrades = [clickOne, clickTwo, clickThree, bronzeMedal, silverMedal];
var upgrades_updated = upgrades;

function showPurchasedUpgrades() {
	var test = document.getElementById("showUpgrades").checked;
	if(test === true) {
		for(i = 0; i < upgrades.length; i++) {
			if(upgrades[i].purchased === true) {
				addPurchasedUpgrade(i);
			}
		}
	} else {
		var x = document.getElementsByClassName("purchasedUpgrade");
		for(i = x.length; i > 0; i--)
			document.getElementsByClassName("purchasedUpgrade")[i-1].remove();
	}
}

function addPurchasedUpgrade(upgrade) {
	var x = upgrades[upgrade];
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