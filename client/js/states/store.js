// TODO: Support beginning store + all stores near forts and stuff
// Note: Weights can be computed from cost/item
	// 1 food == $4
	// 1 wheel == $20
	// 20/4 == 5
	// Someone wants 1 wheel for 5 food would be a fair deal
	// At a 0.5 unfairness value, this would equate to them wanting 10 food
// Having access to the array of item names and prices will be useful

/*
Items format:
[
	{name: "Food", price: 4}
	{name: "Wheel", price: 20}
]
*/

// Generic store state - Allows the player to purchase items with an intuitive GUI
// Takes a list of items with prices
class BaseStoreState extends ContinueState {
	constructor(options) {
		super(options.description, options.nextState, options.onContinue)
		this.options = options
	}

	display() {
		super.display()

		let store = $("<ul/>")

		for (let item of this.options.items) {
			// Each item has a name, price, quantity input, and buy button
			// Default quantity is 1 so you can spam click the buy button
			let storeItem = $("<li/>")
			storeItem.append($(`<p>${item.name}: $${item.price}</p>`))
			storeItem.append($("<input/>").html(1).attr("id", item.id))
			storeItem.append($("<button/>").html("Buy").click(() => {this.buy(item, $(`#${item.id}`).val())}))
			store.append(storeItem)
		}

		$("#description").append(store)
	}

	// Sub class must override this
	buy(item, amount) {}
}

// Specific store state for this game
class StoreState extends BaseStoreState {
	constructor(options) {
		options.items = options.items || [
			{id: "oxen", name: "Oxen", price: 60},
			{id: "clothSets", name: "Sets of clothing", price: 20},
			{id: "bullets", name: "Bullets", price: 5},
			{id: "wheels", name: "Wagon wheels", price: 50},
			{id: "axles", name: "Wagon axles", price: 50},
			{id: "tongues", name: "Wagon tongues", price: 50},
			{id: "food", name: "Pounds of food", price: 10}
		]
		super(options)
	}

	buy(item, amount) {
		// Subtract cost and add quantity of purchased item
		party.supplies.money -= item.price * amount
		party.supplies[item.id] += amount
	}
}
