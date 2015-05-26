var currency = 0;
var cursors = 0;
var prestige = 0;
var plots = 0;
var plotShow = "hidden";

var goatSpace = 0;


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
	var plotCost = Math.floor(25 * (plots + 1));
	if( currency >= plotCost) {
		plots = plots + 1;
		goatSpace += 10;
		currency = currency - plotCost;
		document.getElementById("currency").innerHTML = prettify(currency);
		document.getElementById("goatSpace").innerHTML = prettify(goatSpace);
		document.getElementById("plots").innerHTML = prettify(plots);
	};
	var nextCost = Math.floor(25 * (plots + 1));
	document.getElementById("plotCost").innerHTML = prettify(nextCost);
}

function buyCursor() {
	var cursorCost = Math.floor(10 * Math.pow(1.1, cursors));
	if( currency >= cursorCost) {
		cursors = cursors + 1;
		currency = currency - cursorCost;
		document.getElementById("currency").innerHTML = prettify(currency);
		document.getElementById("plots").innerHTML = prettify(plots);
	};
	var nextCost = Math.floor(10 * Math.pow(1.1, cursors));
	document.getElementById("plotCost").innerHTML = prettify(nextCost);
}

function prettify(input) {
	var output = Math.round(input * 1000000)/1000000;
	return output;
}


function startup() {
	document.getElementById("land").style.visibility = "hidden";
	document.getElementById("plotText").style.visibility = "hidden";
	load();
}


function save() {
	var save = { 
		currency: currency,
		cursors: cursors,
		plotShow: plotShow
	}
	localStorage.setItem("save", JSON.stringify(save));
}

function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	
	if( typeof savegame.currency !== "undefined")
		currency = savegame.currency;
	
	if( typeof savegame.cursors !== "undefined")
		cursors = savegame.cursors;
		
	if( typeof savegame.plotShow !== "undefined")
		plotShow = savegame.plotShow;
	
	document.getElementById("currency").innerHTML = prettify(currency);
	
	document.getElementById("land").style.visibility = plotShow;
	document.getElementById("plotText").style.visibility = plotShow;
}

function deleteSave() {
	localStorage.removeItem("save")
}

window.setInterval(function() {
	currencyClick(cursors);
}, 1000);

