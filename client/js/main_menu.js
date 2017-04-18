let river = false
let shop = false

function backup(amount = 1) {
	return () => {
		for (let i = 0; i < amount; ++i) {
			states.pop()
		}
	}
}

let goBackItem = [{text: "Go back", onclick: backup()}]

let trailState = new MenuState("What shall you do?", [
	{text: "Go near river", onclick: () => {
		river = true
	}},
	{text: "Go near shop", onclick: () => {
		shop = true
	}},
	{text: "Go back to main menu", onclick: backup(2)}
])

let acceptTradeState = new ContinueState("Bob was taken into slavery, you were given 3 pounds of rotten food.", undefined, backup(2))
let declineTradeState = new ContinueState("Bob was happy that you decided to keep him.", undefined, backup(2))

let checkSuppliesState = new MenuState("checkSuppliesState", goBackItem)
let mapState = new MenuState("mapState", goBackItem)
let changePaceState = new MenuState("changePaceState", goBackItem)
let changeFoodState = new MenuState("changeFoodState", goBackItem)
let restState = new MenuState("restState", goBackItem)
let tradeState = new QuestionState("Would you like to trade one of your party members for 3 pounds of food?", acceptTradeState, declineTradeState)
let talkState = new MenuState("talkState", goBackItem)
let shopState = new MenuState("Welcome to the shop. What would you like?", goBackItem)
let fishState = new MenuState("You went fishing!", goBackItem)

let mainMenu = new MenuState("Welcome to Oregon Trail", [
	{text: "Continue on trail", next: new ContinueState("You are traveling along the trail...", trailState)},
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
