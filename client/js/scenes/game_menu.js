let acceptTradeState = new ContinueState("Bob was taken into slavery, you were given 3 pounds of rotten food.")

let declineTradeState = new ContinueState("Bob was happy that you decided to keep him.")

let changePaceState = new MenuState("Choose the pace you will travel at:", [
	{text: "Grueling (100%)", onclick: () => { party.pace = "grueling"; states.pop() }},
	{text: "Strenuous (75%)", onclick: () => { party.pace = "strenuous"; states.pop() }},
	{text: "Steady (50%)", onclick: () => { party.pace = "steady"; states.pop() }},
	{text: "Cancel", onclick: () => { states.pop() }}
]);

let changeFoodState = new MenuState("The amount of food the people in your party eat each day can change. These amounts are:", [
	{text: "Filling - Meals are large and generous", onclick: () => { party.rations = "filling"; states.pop() }},
	{text: "Meager - Meals are small, but adequate", onclick: () => { party.rations = "meager"; states.pop() }},
	{text: "Bare bones - Meals are very small; everyone stays hungry", onclick: () => { party.rations = "bareBones"; states.pop() }},
	{text: "Cancel", onclick: () => { states.pop() }}
]);

let tradeState = temporary(new QuestionState("Would you like to trade one of your party members for 3 pounds of food?", acceptTradeState, declineTradeState))

function getSupplies(){

	return `<p> Oxen: ${party.supplies.oxen} </p>
	<p> Sets of Clothing: ${party.supplies.clothSets} </p>
	<p> Pounds of Food: ${party.supplies.food.toFixed(1)} </p>
	<p> Wagon Wheels: ${party.supplies.wheels} </p>
	<p> Wagon Axles: ${party.supplies.axles} </p>
	<p> Wagon Tounges: ${party.supplies.clothSets} </p>
	<p> Money Left: $${party.supplies.money.toFixed(2)} </p>`;
}

function getPartyHealth(){
	let healthString = "";
	for (let partyMember of party.members){
		healthString += `<p>${partyMember.name}: ${partyMember.healthString()}</p>`;
	}
	return healthString
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
	{text: "Attempt to Trade", next: tradeState},
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
	}}
]);
gameMenu.stateName = "gameMenu";
