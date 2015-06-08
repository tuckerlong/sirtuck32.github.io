var goatInfantryMod = 1;
var goatMedicMod = 1;

/*  Goat Infantry
 *
 *
 *
 */
function buyGoatInfantry() {
	var curCost = getPurchase(goatInfantry).getCost();
	if(currency >= curCost && goatSpace >= 1) {
		getPurchase(goatInfantry).count += 1;
		goatSpace -= 1;
		armyStrength += 1;
		currency -= curCost;
		
		updateAll();
	}
}

/*  Goat Medic
 *
 *
 *
 */
function buyGoatMedic() {
	var curCost = getPurchase(goatMedic).getCost();
	if(currency >= curCost && goatSpace >= 1) {
		getPurchase(goatMedic).count += 1;
		goatSpace -= 1;
		currency -= curCost;
		
		updateAll();
	}
}

/*  Goat Medic
 *
 *
 *
 */
function buyBandages() {
	var curCost = getUpgrade(bandages).cost;
	if(currency >= curCost) {
		currency -= curCost;
		applyBandages();
		addPurchasedUpgrade(bandages);
		
		updateAll();
	}
}

function applyBandages() {
	goatMedicMod *= 2;
}


function setupBattle() {
	document.getElementById("armyHealth").innerHTML = armyHealth + "/" + armyMaxHealth;
}

function autoBattle() {
	auto = !auto;
	if(auto) {
		document.getElementById("autoBattleButton").style.backgroundColor = "DarkSeaGreen";
		battle();
	} else
		document.getElementById("autoBattleButton").style.backgroundColor = "white";
}

function autoAdvance() {
	advance = !advance;
	if(advance) {
		document.getElementById("autoAdvanceButton").style.backgroundColor = "DeepSkyBlue";
	} else
		document.getElementById("autoAdvanceButton").style.backgroundColor = "white";
}

function backLevel() {
	inBattle = false;
	enemyLevel = Math.max(1, enemyLevel - 1);
	updateEnemy();
}

function advanceLevel() {
	inBattle = false;
	enemyLevel = Math.min(lastCleared, enemyLevel + 1);
	updateEnemy();
}

function updateEnemy() {
	enemyLevel = Math.max(enemyLevel, 1);
	enemyHealth = (100 + 20 * enemyLevel);
	enemyMaxHealth = enemyHealth;
	enemyDefense = enemyLevel;
	enemyStrength = 10 + (5 * enemyLevel);

	document.getElementById("enemyName").innerHTML = "Enemy Level " + enemyLevel;
	document.getElementById("enemyDefense").innerHTML = enemyDefense;
	document.getElementById("enemyStrength").innerHTML = enemyStrength;
	
	document.getElementById("enemyHealth").style.width = "calc((50% - 9px))";
	document.getElementById("enemyHp").innerHTML = enemyHealth + "/" + enemyMaxHealth;
}

function recharge() {
	var charge = setInterval(function() {
		if(!inBattle) {
			setTimeout( function() {document.getElementById("recharge").style.width = "0px";}, 500);
			document.getElementById("playerHealth").style.width = "calc((50% - 9px))";
			if(auto) setTimeout( function() {battle()}, 3000);
			clearInterval(charge);
			return;
		}
		armyHealth += 5;
		if(armyHealth >= armyMaxHealth) {
			armyHealth = armyMaxHealth;
			inBattle = false;
		}
		document.getElementById("recharge").style.width = "calc((100% - 9px) * " + (armyHealth/armyMaxHealth) + ")";
		document.getElementById("armyHealth").innerHTML = armyHealth + "/" + armyMaxHealth;
	}, 500);
}

function battle() {
	if(!inBattle) {
		inBattle = true;
		armyHealth = Math.min(armyMaxHealth, armyHealth + (getPurchase(goatMedic).count * goatMedicMod));
		document.getElementById("playerHealth").style.width = "calc((50% - 9px) * " + (armyHealth/armyMaxHealth) + ")";
		document.getElementById("armyHealth").innerHTML = armyHealth + "/" + armyMaxHealth;
		//document.getElementById("playerHealth").style.width =  (document.getElementById("playerOverlay").clientWidth/2) + "px";
		
		end = false;
		dead = false;

		var fight = setInterval(function () {
			if(!inBattle) {
				clearInterval(fight);
				return;
			}
			
			if(end && !dead) {
				inBattle = false;
				lastCleared = Math.max(enemyLevel, lastCleared);
				if(advance) enemyLevel += 1;
				updateEnemy();
				if(auto) setTimeout( function() {battle()}, 3000);
				clearInterval(fight);
				return;
			}
			
			if(dead) {
				enemyLevel -= 1;
				updateEnemy();
				inBattle = true;
				recharge();
				clearInterval(fight);
				return;
			}
			
			
			enemyHealth -= Math.max(((armyStrength * armyStrengthMod) - enemyDefense), 0);
			enemyHealth -= getItem(armorSpike).count;
			
			if(enemyHealth <= 0) {
				enemyHealth = 0;
				var amount = (100 * enemyLevel);
				currency += amount;
				document.getElementById("battleRewards").innerHTML = amount + " money";
				end = true;
			}
			document.getElementById("enemyHealth").style.width = "calc((50% - 9px) * " + (enemyHealth/enemyMaxHealth) + ")";
			document.getElementById("enemyHp").innerHTML = enemyHealth + "/" + enemyMaxHealth;
			
			armyHealth -= Math.max((enemyStrength - armyDefense), 0);
			
			if(armyHealth <= 0) {
				armyHealth = 0;
				document.getElementById("battleRewards").innerHTML = "-";
				dead = true;
			}
			document.getElementById("playerHealth").style.width = "calc((50% - 9px) * " + (armyHealth/armyMaxHealth) + ")";
			document.getElementById("armyHealth").innerHTML = armyHealth + "/" + armyMaxHealth;
		}, 1000);
	}
}
