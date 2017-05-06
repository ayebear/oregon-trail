let acceptTradeState = new ContinueState("Bob was taken into slavery, you were given 3 pounds of rotten food.")

let declineTradeState = new ContinueState("Bob was happy that you decided to keep him.")

let changePaceState = new MenuState("Choose the pace you will travel at:", [
	{text: "Grueling (100%)", onclick: () => { party.pace = "grueling"; states.pop() }},
	{text: "Strenuous (75%)", onclick: () => { party.pace = "strenuous"; states.pop() }},
	{text: "Steady (50%)", onclick: () => { party.pace = "steady"; states.pop() }},
	{text: "Cancel", onclick: () => { states.pop() }}
])

let changeFoodState = new MenuState("The amount of food the people in your party eat each day can change. These amounts are:", [
	{text: "Filling &mdash; Meals are large and generous", onclick: () => { party.rations = "filling"; states.pop() }},
	{text: "Meager &mdash; Meals are small, but adequate", onclick: () => { party.rations = "meager"; states.pop() }},
	{text: "Bare bones &mdash; Meals are very small; everyone stays hungry", onclick: () => { party.rations = "bareBones"; states.pop() }},
	{text: "Cancel", onclick: () => { states.pop() }}
])

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
		healthString += `<p> ${partyMember.name} : ${partyMember.healthString()} </p>`;
	}
	return healthString
}




// The main game menu, which can be returned to during travel
let gameMenu = new MenuState("What would you like to do?", [
	{text: "Continue on trail", next: new TravelingState()},
	{text: "Check Supplies", onclick: () => {
		states.push(new ContinueState(getSupplies()));
	}},
	{text: "Check up on everyone", onclick: () => {
		states.push(new ContinueState(getPartyHealth()));
	}},
	{text: "Change pace", next: changePaceState},
	{text: "Change food rations", next: changeFoodState},
	{text: "Stop to rest", next: restState},
	{text: "Attempt to trade", next: tradeState},
	{text: "Talk to people", onclick: () => {
		states.push(new ContinueState(randElem(conversations)))
	}},
	{text: "Buy Supplies", show: () => {
		return locations.atShop()
	}, onclick: () => {
		states.push(makeStore({
			description: "Fort __________"
		}))
	}},
	{text: "Go fishing", next: fishState, show: () => {
		//always show fishing for now
		return true;
	}}
])
