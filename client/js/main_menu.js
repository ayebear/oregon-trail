let river = false
let shop = false

// TODO: Support popping multiple times in the state stack
// Or, have "temporary" states that pop themselves when they are re-entered
// Or, pop the temporary states immediately before pushing new states onto the stack
function backup(amount = 1) {
	return () => {
		for (let i = 0; i < amount; ++i) {
			states.pop()
		}
	}
}

let goBackItem = [{text: "Go back", onclick: backup()}]


let acceptTradeState = new ContinueState("Bob was taken into slavery, you were given 3 pounds of rotten food.", undefined, backup(2))

let declineTradeState = new ContinueState("Bob was happy that you decided to keep him.", undefined, backup(2))

let checkSuppliesState = new MenuState("checkSuppliesState", goBackItem)

let mapState = new MenuState("mapState", goBackItem)

let changePaceState = new MenuState("Choose the pace you will travel at:", [
	{text: "Grueling (100%)", onclick: () => { party.pace = 3; states.pop() }},
	{text: "Strenuous (75%)", onclick: () => { party.pace = 2; states.pop() }},
	{text: "Steady (50%)", onclick: () => { party.pace = 1; states.pop() }},
	{text: "Cancel", onclick: () => { states.pop() }}
])

let changeFoodState = new MenuState("changeFoodState", goBackItem)

let restState = new MenuState("restState", goBackItem)

let tradeState = new QuestionState("Would you like to trade one of your party members for 3 pounds of food?", acceptTradeState, declineTradeState)

let talkState = new InputState("Say something", "text", value => {
	return value != "invalid"
}, value => {
	states.push(new ContinueState(`Susan says ${value} too.`, undefined, backup(2)))
});

let shopState = new MenuState("Welcome to the shop. What would you like?", goBackItem)

let fishState = new MenuState("You went fishing!", goBackItem)

let mainMenu = new MenuState("Welcome to Oregon Trail", [
	{text: "Continue on trail", next: new TravelingState()},
	{text: "Check supplies", next: checkSuppliesState},
	{text: "Look at map", next: mapState},
	{text: "Change pace", next: changePaceState},
	{text: "Change food rations", next: changeFoodState},
	{text: "Stop to rest", next: restState, onclick: () => {
		// This shows that custom callbacks work as well - most of the time you'll want to simply switch states though
		console.log("Stopped and rested")
	}},
	{text: "Attempt to trade", next: tradeState},
	{text: "Talk to people", next: talkState},
	{text: "Buy Supplies", next: shopState, show: () => {
		// TODO: Based on current location, you'd lookup in some table what things are there, such as a river
		return shop
	}},
	{text: "Go Fishing", next: fishState, show: () => {
		return river
	}}
])
