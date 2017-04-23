let acceptTradeState = new ContinueState("Bob was taken into slavery, you were given 3 pounds of rotten food.")

let declineTradeState = new ContinueState("Bob was happy that you decided to keep him.")

let changePaceState = new MenuState("Choose the pace you will travel at:", [
	{text: "Grueling (100%)", onclick: () => { party.pace = 3; states.pop() }},
	{text: "Strenuous (75%)", onclick: () => { party.pace = 2; states.pop() }},
	{text: "Steady (50%)", onclick: () => { party.pace = 1; states.pop() }},
	{text: "Cancel", onclick: () => { states.pop() }}
])

let changeFoodState = new ContinueState("Choose the food ration size:")

let restState = new ContinueState("How many days would you like to rest?")

let tradeState = new QuestionState("Would you like to trade one of your party members for 3 pounds of food?", acceptTradeState, declineTradeState)
tradeState.temporary = true

let talkState = new InputState("Say something", "text", value => {
	return value != "invalid"
}, value => {
	states.push(new ContinueState(`Susan says ${value} too.`))
})
talkState.temporary = true

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
	{text: "Stop to rest", next: restState, onclick: () => {
		// This shows that custom callbacks work as well - most of the time you'll want to simply switch states though
		console.log("Stopped and rested")
	}},
	{text: "Attempt to trade", next: tradeState},
	{text: "Talk to people", next: talkState},
	{text: "Buy Supplies", next: shopState, show: () => {
		// TODO: Only show if near a shop/fort
		return false
	}},
	{text: "Go Hunting", next: huntState, show: () => {
		// Only show if in the wild (not near a fort or landmark)
		return false
	}}
])
