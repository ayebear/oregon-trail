let acceptTradeState = new ContinueState("Bob was taken into slavery, you were given 3 pounds of rotten food.")

let declineTradeState = new ContinueState("Bob was happy that you decided to keep him.")

let changePaceState = new MenuState("Choose the pace you will travel at:", [
	{text: "Grueling (100%)", onclick: () => { party.pace = "grueling"; states.pop() }},
	{text: "Strenuous (75%)", onclick: () => { party.pace = "strenuous"; states.pop() }},
	{text: "Steady (50%)", onclick: () => { party.pace = "steady"; states.pop() }},
	{text: "Cancel", onclick: () => { states.pop() }}
])

let changeFoodState = new MenuState("The amount of food the people in your party eat each day can change. These amounts are:", [
	{text: "1. Filling - meals are large and generous", onclick: () => { party.rations = "filling"; states.pop() }},
	{text: "2. Meager - meals are small, but adequate", onclick: () => { party.rations = "meager"; states.pop() }},
	{text: "3. Bare bones - meals are very small; everyone stays hungry", onclick: () => { party.rations = "bareBones"; states.pop() }},
	{text: "Cancel", onclick: () => { states.pop() }}
])

let tradeState = temporary(new QuestionState("Would you like to trade one of your party members for 3 pounds of food?", acceptTradeState, declineTradeState))

let shopState = new ContinueState("Welcome to the shop. What would you like?")

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
	{text: "Buy Supplies", next: shopState, show: () => {
		// TODO: Only show if near a shop/fort
		return false
	}},
	{text: "Go Hunting", next: huntState, show: () => {
		// Only show if in the wild (not near a fort or landmark)
		return false
	}}
])
