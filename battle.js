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