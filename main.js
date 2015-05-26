var cookies = 0;
var cursors = 0;
var prestige = 0;


function cookieClick(number) {
	cookies = cookies + number;
	document.getElementById("cookies").innerHTML = prettify(cookies);
}

function buyCursor() {
	var cursorCost = Math.floor(10 * Math.pow(1.1, cursors));
	if( cookies >= cursorCost) {
		cursors = cursors + 1;
		cookies = cookies - cursorCost;
		document.getElementById("cookies").innerHTML = prettify(cookies);
		document.getElementById("cursors").innerHTML = prettify(cursors);
	};
	var nextCost = Math.floor(10 * Math.pow(1.1, cursors));
	document.getElementById("cursorCost").innerHTML = prettify(nextCost);
}

function prettify(input) {
	var output = Math.round(input * 1000000)/1000000;
	return output;
}



function save() {
	var save = { 
		cookies: cookies,
		cursors: cursors,
		prestige: prestige
	}
	localStorage.setItem("save", JSON.stringify(save));
}

function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	
	if( typeof savegame.cookies !== "undefined")
		cookies = savegame.cookies;
	
	if( typeof savegame.cursors !== "undefined")
		cursors = savegame.cursors;
	
	document.getElementById("cookies").innerHTML = prettify(cookies);
	document.getElementById("cursors").innerHTML = prettify(cursors);
}

function remove() {
	localStorage.removeItem("save")
}

window.setInterval(function() {
	cookieClick(cursors);
}, 1000);

window.setInterval(function() {
	save();
}, 5000);