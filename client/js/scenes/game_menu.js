let acceptTradeState = new ContinueState("Bob was taken into slavery, you were given 3 pounds of rotten food.")

let declineTradeState = new ContinueState("Bob was happy that you decided to keep him.")

let changePaceState = new MenuState("Choose the pace you will travel at:", [
	{text: "Grueling (100%)", onclick: () => { party.pace = 3; states.pop() }},
	{text: "Strenuous (75%)", onclick: () => { party.pace = 2; states.pop() }},
	{text: "Steady (50%)", onclick: () => { party.pace = 1; states.pop() }},
	{text: "Cancel", onclick: () => { states.pop() }}
])

let changeFoodState = new ContinueState("Choose the food ration size:")

let tradeState = temporary(new QuestionState("Would you like to trade one of your party members for 3 pounds of food?", acceptTradeState, declineTradeState))

/*
TODO: Allow player to enter number of bullets to use, then based on location
	and some RNG, show a result on how much food was collected.
*/
let huntState = new ContinueState("You went hunting!")



// The main game menu, which can be returned to during travel
let gameMenu = new MenuState("What would you like to do?", [
	{text: "Continue on trail", next: new TravelingState()},
	{text: "Change pace", next: changePaceState},
	{text: "Change food rations", next: changeFoodState},
	{text: "Stop to rest", next: restState},
	{text: "Attempt to trade", next: tradeState},
	{text: "Talk to people", onclick: () => {
		states.push(new ContinueState(randElem(conversations)))
	}},
	{text: "Buy Supplies", next: storeState, show: () => {
		// TODO: Only show if near a shop/fort
		// TODO: Update prices based on distance traveled
		return false
	}},
	{text: "Go Hunting", next: huntState, show: () => {
		// Only show if in the wild (not near a fort or landmark)
		return false
	}}
])
