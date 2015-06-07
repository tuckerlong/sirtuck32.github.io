var armorSpike = {
	name: "Armor Spike",
	img: "armorSpike.png",
	desc: "Deals 1 damage per armor spike to the attacking enemy.",
	countId: "armorSpikeCount",
	count: 0
};

var items = [armorSpike];
var items_updated = items;

var firstItemAccess = true;

function addItem(item, amount) {
	if(items[items.indexOf(item)].count == 0)
		createItem(items.indexOf(item));
	items[items.indexOf(item)].count += amount;
}

function getItem(item) {
	return items[items.indexOf(item)];
}

function updateItems(item) {
	for(i = 0; i < items.length; i++) {
		if(typeof items_updated[i] !== "undefined") {
			items_updated[i].count = items[i].count;
		}
	}
	
	//if(items.length != items.length)
	//	refresh = true;
		
	items = items_updated;
}

function showItems() {
	if(firstItemAccess) { 
		populateItems();
		firstItemAccess = false;
	}

	document.getElementById("stats").style.display = "none";
	document.getElementById("options").style.display = "none";
	document.getElementById("items").style.display = "block";
}

function populateItems() {	
	for(i = 0; i < items.length; i++) {
		if(items[i].count > 0) {
			createItem(i);
		}
	}
}

function createItem(i) {
	var div = document.getElementById("items");
	var item = document.createElement("div");
	item.className = "item";
	
	itemImg = document.createElement("img");
	itemImg.className = "itemImg";
	itemImg.src = items[i].img;
	
	itemName = document.createElement("span");
	itemName.className = "itemName";
	itemName.innerHTML = items[i].name;
	
	itemCount = document.createElement("span");
	itemCount.id = items[i].countId;
	itemCount.className = "itemCount";
	itemCount.innerHTML = items[i].count;
	
	itemDesc = document.createElement("div");
	itemDesc.className = "itemDesc";
	itemDesc.innerHTML = items[i].desc;
	
	item.appendChild(itemImg);
	item.appendChild(itemName);
	item.appendChild(itemCount);
	item.appendChild(itemDesc);
	
	div.appendChild(item);
	addBreak(div);
}

/* MOVE TO MAIN.JS */
function showStats() {
	document.getElementById("stats").style.display = "block";
	document.getElementById("options").style.display = "none";
	document.getElementById("items").style.display = "none";
	document.getElementById("ascend").style.display = "none";
}

/* MOVE TO MAIN.JS */
function showOptions() {
	document.getElementById("stats").style.display = "none";
	document.getElementById("options").style.display = "block";
	document.getElementById("items").style.display = "none";
	document.getElementById("ascend").style.display = "none";
}

/* MOVE TO MAIN.JS */
function showAscend() {
	document.getElementById("stats").style.display = "none";
	document.getElementById("options").style.display = "none";
	document.getElementById("items").style.display = "none";
	document.getElementById("ascend").style.display = "block";
}