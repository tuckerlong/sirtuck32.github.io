var plotPack = {
	name: "Plot Pack",
	purchased: false,
	onload: function() {
		getPurchase(plot).purchased = true;
		getPurchase(plot).count = 10;
	}
}

var ascension = [plotPack]
var ascension_updated = ascension;

var goatSouls = 0;
var s;

function startupAscension() {
	s = JSON.parse(localStorage.getItem("save"));

	if(s !== null) {
		if(typeof s.goatSouls !== "undefined")
			goatSouls = s.goatSouls;
		if(typeof s.ascension !== "undefined")
			ascension = s.ascension;
		document.getElementById("goatSouls").innerHTML = goatSouls;
	}
	
	updateAscensions();
}

function updateAscensions() {
	for(i = 0; i < ascension.length; i++) {
		if(typeof ascension_updated[i] !== "undefined") {
			ascension_updated[i].purchased = ascension[i].purchased;
		}
	}
	
	ascension = ascension_updated;
}

function buyPlotPack() {
	console.log("Bought Plot Pack");
	ascension[ascension.indexOf(plotPack)].purchased = true;
}

function confirmAscend() {
	if(confirm("Are you sure you want to ascend?") == true) {
		if(s !== null) {
			s.goatSouls = goatSouls;
			s.ascension = ascension;
			localStorage.setItem("save", JSON.stringify(s));
		}
		window.location = "index.html";
	}
}