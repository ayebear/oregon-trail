// TODO: Support beginning store + all stores near forts and stuff
// Note: Weights can be computed from cost/item
	// 1 food == $4
	// 1 wheel == $20
	// 20/4 == 5
	// Someone wants 1 wheel for 5 food would be a fair deal
	// At a 0.5 unfairness value, this would equate to them wanting 10 food

/*
Mockup:
Matt's general store

Food: $5 x [ 3 ] = $15
Oxen: $30 x [ 3 ] = $90
...

-------------------------
Total: $105
(Buy)
*/

// Generic store state - Allows the player to purchase items with an intuitive GUI
// Takes a list of items with prices
// Triggers a "buy" function when user clicks the buy button
class StoreState extends ContinueState {
	constructor(options) {
		super(options.description, options.nextState, options.onContinue)
		this.options = options
		this.total = 0
	}

	display() {
		super.display()

		let store = $("<div/>").attr("id", "store")

		for (let item of this.options.items) {
			// let item = this.options.items[i]
			// Adjust price based on price function
			// item.adjustedPrice = invoke(this.options, "price", item.price) || item.price

			// Default quantity is 1 so you can spam click the buy button
			item.quantity = 1

			// Each item has a name, price, quantity input, and buy button
			let storeItem = $(`<p>${item.name}: $${item.price} x </p>`)
				.attr("class", "storeItem")
				.change(() => {this.update()})
			storeItem.append($("<input/>")
				.html(1)
				.attr("id", item.id)
				.attr("type", "number")
				.change(e => {
					// let id = $(e.target).prop("id")
					// let val = $(e.target).val()
					// this.options.items[id].quantity = val

					item.quantity = $(e.target).val()
					this.update()
				}))
			// storeItem.append($("<button/>").html("Buy").click(() => {this.buy(item, $(`#${item.id}`).val())}))
			store.append(storeItem)
		}

		store.append($("<hr/>"))
		store.append($("<h4/>").html(`Total: <span id="totalCost"></span>`))
		store.append($("<button/>").html("Buy").click(() => {this.buy()}))
		store.append($("<hr/>"))

		$("#description").append(store)
	}

	// Updates item costs and total cost
	update() {
		console.log("update()")

		this.total = 0
		$(".storeItem").each(item => {
			console.log(item)
			// this.total += item.val()
		})

		$("#totalCost").html(this.total)
	}

	// Note: options.buy needs to exist
	buy() {
		return invoke(this.options, "buy", this.total, this.options.items)
	}
}
