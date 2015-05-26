var currency = 100;
var currencyInc = 0;
var cursors = 0;
var prestige = 0;
var plots = 0;
var plotShow = "hidden";

var goats = 0;
var goatSpace = 0;

var grass = 1;


function currencyClick(number) {
	currency = currency + number;
	document.getElementById("currency").innerHTML = prettify(currency);
	
	if(currency >= 25 && plotShow === "hidden") {
		plotShow = "visible";
		document.getElementById("land").style.visibility = plotShow;
		document.getElementById("plotText").style.visibility = plotShow;
	};
}

function buyPlot() {
	
	var curCost = Math.floor(25 * (plots + 1));
	if( currency >= curCost) {
		plots = plots + 1;
		goatSpace = goatSpace + 10;
		currency = currency - curCost;
		document.getElementById("currency").innerHTML = prettify(currency);
		document.getElementById("goatSpace").innerHTML = prettify(goatSpace);
		document.getElementById("plots").innerHTML = prettify(plots);
			
		document.getElementById("goat").style.visibility = plotShow;
		document.getElementById("goatText").style.visibility = plotShow;
		
		document.getElementById("grass").style.visibility = "visible";
	};
	
	var nextCost = Math.floor(25 * (plots + 1));
	document.getElementById("plotCost").innerHTML = prettify(nextCost);
}

function buyGoat() {
	var curCost = Math.floor(10 * (goats + 1));
	if( currency >= curCost && goatSpace >= 1) {
		goats = goats + 1;
		goatSpace = goatSpace - 1;
		currency = currency - curCost;
		document.getElementById("currency").innerHTML = prettify(currency);
		document.getElementById("goatSpace").innerHTML = prettify(goatSpace);
		document.getElementById("goats").innerHTML = prettify(goats);
		
		calculateCurrency();
	};
	
	var nextCost = Math.floor(10 * (goats + 1));
	document.getElementById("goatCost").innerHTML = prettify(nextCost);
}

function upgradeGrass() {
	var curCost = Math.floor(100 * grass);
	if( currency >= curCost) {
		grass = grass + 1;
		currency = currency - curCost;
		document.getElementById("currency").innerHTML = prettify(currency);
		
		calculateCurrency();
	};
	
	var nextCost = Math.floor(100 * grass);
	document.getElementById("grassCost").innerHTML = prettify(nextCost);
}

function calculateCurrency() {
	currencyInc = goats * (0.1 * grass);
	document.getElementById("currencyInc").innerHTML = prettify(currencyInc);
}

function prettify(input) {
	var output = Math.round(input * 1000000)/1000000;
	return output;
}


function startup() {
	document.getElementById("land").style.visibility = "hidden";
	document.getElementById("plotText").style.visibility = "hidden";
	
	document.getElementById("goat").style.visibility = "hidden";
	document.getElementById("goatText").style.visibility = "hidden";
	
	document.getElementById("grass").style.visibility = "hidden";
	
	load();
}


function save() {
	var save = { 
		currency: currency,
		plots: plots,
		goatSpace: goatSpace,
		plotShow: plotShow
	}
	localStorage.setItem("save", JSON.stringify(save));
}

function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	
	if( typeof savegame.currency !== "undefined")
		currency = savegame.currency;
	if( typeof savegame.plots !== "undefined")
		plots = savegame.plots;
	if( typeof savegame.goatSpace !== "undefined")
		goatSpace = savegame.goatSpace;
		
	if( typeof savegame.plotShow !== "undefined")
		plotShow = savegame.plotShow;
	
	document.getElementById("currency").innerHTML = prettify(currency);
	document.getElementById("plots").innerHTML = prettify(plots);
	document.getElementById("goatSpace").innerHTML = prettify(goatSpace);
	
	document.getElementById("land").style.visibility = plotShow;
	document.getElementById("plotText").style.visibility = plotShow;
	
	if(plots >= 1) {
		document.getElementById("goat").style.visibility = "visible";
		document.getElementById("goatText").style.visibility = "visible";
	};
	
	var nextCost = Math.floor(25 * (plots + 1));
	document.getElementById("plotCost").innerHTML = prettify(nextCost);
}

function deleteSave() {
	localStorage.removeItem("save")
}

window.setInterval(function() {
	currencyClick(goats/10);
}, 1000);

