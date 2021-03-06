
// pace menu
let changePaceState = new MenuState("Choose the pace you will travel at:", [
	{text: "Grueling (100%)", onclick: () => { party.pace = "grueling"; states.pop() }},
	{text: "Strenuous (75%)", onclick: () => { party.pace = "strenuous"; states.pop() }},
	{text: "Steady (50%)", onclick: () => { party.pace = "steady"; states.pop() }},
	{text: "Cancel", onclick: () => { states.pop() }}
]);

// chaning food rations menu
let changeFoodState = new MenuState("The amount of food the people in your party eat each day can change. These amounts are: <br><br> <img src='./data/images/rationsPage2.png' width=640px height=250px", [
	{text: "Filling - Meals are large and generous", onclick: () => { party.rations = "filling"; states.pop() }},
	{text: "Meager - Meals are small, but adequate", onclick: () => { party.rations = "meager"; states.pop() }},
	{text: "Bare bones - Meals are very small; everyone stays hungry", onclick: () => { party.rations = "bareBones"; states.pop() }},
	{text: "Cancel", onclick: () => { states.pop() }}
]);

// checking supplies menu
function getSupplies() {
	return `<p> Oxen: ${party.supplies.oxen} </p>
	<p> Sets of Clothing: ${party.supplies.clothSets} </p>
	<p> Worms: ${party.supplies.worms} </p>
	<p> Pounds of Food: ${party.supplies.food.toFixed(1)} </p>
	<p> Wagon Wheels: ${party.supplies.wheels} </p>
	<p> Wagon Axles: ${party.supplies.axles} </p>
	<p> Wagon Tounges: ${party.supplies.tongues} </p>
	<p> Money Left: $${party.supplies.money.toFixed(2)} </p>`;
}

// checking party's members health
function getPartyHealth() {
	let healthString = "";
	for (let partyMember of party.members) {
		healthString += `<p>${partyMember.name}: ${partyMember.healthString()}</p>`;
	}
	return healthString;
}


// The main game menu, which can be returned to during travel
let gameMenu = new MenuState("What would you like to do?", [
	{text: "Continue On Trail", next: new TravelingState(), onclick: () => {locations.atShop = false}},
	{text: "Check Supplies", onclick: () => {
		states.push(new ContinueState(getSupplies()));
	}},
	{text: "Check Up On Everyone", onclick: () => {
		states.push(new ContinueState(getPartyHealth()));
	}},
	{text: "Change Pace", next: changePaceState},
	{text: "Change Food Rations", next: changeFoodState},
	{text: "Stop to Rest", next: RestState},
	{text: "Attempt to Trade", onclick: tradeCheck},
	{text: "Talk to People", onclick: () => {
		states.push(new ContinueState(randValue(conversations)));
	}},
	{text: "Buy Supplies", show: () => {
		return locations.canShop();
	}, onclick: () => {
		states.push(makeStore({
			description: locations.shopName
		}))
	}},
	{text: "Go Fishing", next: fishState, show: () => {
		return locations.atRiver();
	}},
	{text: "Replace a wagon part", onclick: () => {
		const description = getItemDescription(party.brokenPart, 1);
		party.supplies[party.brokenPart]--;
		party.brokenPart = undefined;
		states.push(new ContinueState(`You have replaced ${description}!`));
	},

	// Having the supplies to repair your wagon will cause this menu option to show
	show: () => {
		return !!(party.brokenPart && party.supplies[party.brokenPart] > 0)
	}}
]);
gameMenu.stateName = "gameMenu";
