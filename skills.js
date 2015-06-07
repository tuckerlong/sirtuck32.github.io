var doubleStrength = {
	name: "Double Strength",
	barId: "doubleStrengthBar",
	overlayId: "doubleStrengthOverlay",
	desc: "Doubles army strength for 30s.",
	current: 0,
	max: 30,
	active: false,
	unlocked: false,
	onclick: function() {
	    if(!getSkill(doubleStrength).active) {
			getSkill(doubleStrength).active = true;
			armyStrengthMod *= 2;
			updateAll();
			
			var active = setInterval( function() {
				if(getSkill(doubleStrength).current == getSkill(doubleStrength).max) {
					getSkill(doubleStrength).active = false;
					armyStrengthMod /= 2;
					updateAll();
					document.getElementById("doubleStrengthBar").style.width = "0px";
					clearInterval(active);
					return;
				}
				getSkill(doubleStrength).current += 0.5;
				
				document.getElementById("doubleStrengthBar").style.width = "calc((100% - 1px) * " + (getSkill(doubleStrength).current/getSkill(doubleStrength).max) + ")";
			}, 500);
		}
	}
};

var testSkill = {
	name: "Test Skill",
	barId: "testBar",
	overlayId: "testOverlay",
	desc: "Doubles army strength for 30s.",
	current: 0,
	max: 300,
	active: false,
	unlocked: false,
	onclick: function() {
	    if(!getSkill(testSkill).active) {
			getSkill(testSkill).active = true;
			armyStrength *= 2;
			updateAll();
			
			var active = setInterval( function() {
				if(getSkill(testSkill).current == getSkill(testSkill).max) {
					getSkill(testSkill).active = false;
					armyStrength /= 2;
					updateAll();
					document.getElementById("testBar").style.width = "0px";
					clearInterval(active);
					return;
				}
				getSkill(testSkill).current += 0.5;
				
				document.getElementById("testBar").style.width = "calc((100% - 1px) * " + (getSkill(testSkill).current/getSkill(testSkill).max) + ")";
			}, 500);
		}
	}
};

var skills = [doubleStrength, testSkill];
var skills_updated = skills;

function getSkill(skill) {
	return skills[skills.indexOf(skill)];
}

function showSkills() {	
	for(i = 0; i < skills.length; i++) {
		if(skills[i].unlocked) {
			createSkill(i);
		}
	}
}

function createSkill(i) {
	div = document.getElementById("skills");
	
	skill = document.createElement("div");
	skill.className = "skill";
	skill.onclick = skills[i].onclick;
	
	skillName = document.createElement("div");
	skillName.className = "skillName";
	skillName.innerHTML = skills[i].name;
	
	skillBar = document.createElement("div");
	skillBar.id = skills[i].barId;
	skillBar.className = "skillBar";
	
	skillOverlay = document.createElement("div");
	skillOverlay.id = skills[i].overlayId;
	skillOverlay.className = "skillOverlay";
	
	skillDesc = document.createElement("div");
	skillDesc.className = "skillDesc";
	skillDesc.innerHTML = skills[i].desc;
	
	skill.appendChild(skillName);
	skill.appendChild(skillBar);
	skill.appendChild(skillOverlay);
	skill.appendChild(skillDesc);
	
	div.appendChild(skill);
	
	document.getElementById(skills[i].barId).style.width = "0px";
}

function buyDoubleStrength() {
	if(currency >= getUpgrade(doubleStrengthUpgrade).cost) {
		applyDoubleStrength();
		currency -= getUpgrade(doubleStrengthUpgrade).cost;
		addPurchasedUpgrade(doubleStrengthUpgrade);
		
		updateAll();
	}
}

function applyDoubleStrength() {
	getSkill(doubleStrength).unlocked = true;
	createSkill(skills.indexOf(doubleStrength));
}