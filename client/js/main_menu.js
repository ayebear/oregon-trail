let continueItem = [{text: "Go back", onclick: () => {
	states.pop()
}}]

let continueState = new MenuState("continueState", continueItem)
let checkSuppliesState = new MenuState("checkSuppliesState", continueItem)
let mapState = new MenuState("mapState", continueItem)
let changePaceState = new MenuState("changePaceState", continueItem)
let changeFoodState = new MenuState("changeFoodState", continueItem)
let restState = new MenuState("restState", continueItem)
let tradeState = new MenuState("tradeState", continueItem)
let talkState = new MenuState("talkState", continueItem)
let shopState = new MenuState("shopState", continueItem)

let mainMenu = new MenuState("Welcome to Oregon Trail", [
	{text: "Continue on trail", next: continueState},
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
	{text: "Buy Supplies", next: shopState}
])
