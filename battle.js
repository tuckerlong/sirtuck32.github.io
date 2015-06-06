var goatInfantryMod = 1;

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