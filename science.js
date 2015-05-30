var electricity = 0;
var electricityInc = 0;

var scienceGoats = 0;
var scienceGoatMod = 0.1;

var bionicGoats = 0;

function electricityClick(number) {
	electricity += prettify(number);
	document.getElementById("electricity").innerHTML = prettify(electricity);
	
	if(electricity >= 25) {
		document.getElementById("bionicGoat").style.visibility = "visible";
		document.getElementById("bionicGoatText").style.visibility = "visible";
	};
}

function buyScienceGoat() {
	var curCost = Math.floor(20 * (scienceGoats + 1));
	
	if(currency >= curCost) {
		scienceGoats = scienceGoats + 1;
		currency -= curCost;
		
		updateValues();
		updateCost();
		calculateCurrency();
	};
}

function buyBionicGoat() {
	var curCost = Math.floor(20 * (bionicGoats + 1));
	
	if(electricity >= curCost) {
		bionicGoats = bionicGoats + 1;
		electricity -= curCost;
		
		updateValues();
		updateCost();
		calculateCurrency();
	};
}