let continueItem = [{text: "Go back", onclick: () => {
	states.pop()
}}]

let continueState = new Menu("continueState", continueItem)
let checkSuppliesState = new Menu("checkSuppliesState", continueItem)
let mapState = new Menu("mapState", continueItem)
let changePaceState = new Menu("changePaceState", continueItem)
let changeFoodState = new Menu("changeFoodState", continueItem)
let restState = new Menu("restState", continueItem)
let tradeState = new Menu("tradeState", continueItem)
let talkState = new Menu("talkState", continueItem)
let shopState = new Menu("shopState", continueItem)

let mainMenu = new Menu("Welcome to Oregon Trail", [
	{text: "Continue on trail", next: continueState},
	{text: "Check supplies", next: checkSuppliesState, onclick: () => {
		console.log("Check supplies clicked")
	}},
	{text: "Look at map", next: mapState},
	{text: "Change pace", next: changePaceState},
	{text: "Change food rations", next: changeFoodState},
	{text: "Stop to rest", next: restState},
	{text: "Attempt to trade", next: tradeState},
	{text: "Talk to people", next: talkState},
	{text: "Buy Supplies", next: shopState}
])
