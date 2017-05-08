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

		// TODO: Table layout:
		// Item | Price | Amount to buy | Cost | You own
		// Food | $10   | ______5______ | $50  | 3

		let store = $("<div/>").attr("id", "store").attr("class", "store")

		// Create store items
		for (let item of this.options.items) {
			// Set default quantity
			item.quantity = 0

			// Each item has a name, price, quantity input, and buy button
			let storeItem = $("<div/>").attr("id", item.id)
			storeItem.append($(`<span>${item.name}: $${item.price.toFixed(2)} x </span>`))
			storeItem.append($("<input/>")
				.val(item.quantity)
				.attr("id", item.id)
				.attr("type", "number")
				.attr("min", 0)
				.change(e => {
					item.quantity = parseInt($(e.target).val())
					this.update()
				}))
			storeItem.append($(`<span> = $<span id="itemPrice"></span></span>`))
			store.append(storeItem)
		}

		// Create totals information and buy button at the bottom
		store.append($("<hr/>"))
		store.append($("<h4/>").html(`Your money: $<span id="currentMoney"></span>`))
		store.append($("<h4/>").html(`Total: $<span id="totalCost"></span>`))
		store.append($("<button/>").html("Buy").click(() => {this.buy()}))
		store.append($("<hr/>"))

		$("#content").append(store)

		this.update()
	}

	// Updates item costs and total cost
	update() {
		this.total = 0

		for (let item of this.options.items) {
			let itemPrice = item.quantity * item.price
			$(`#${item.id} #itemPrice`).html(itemPrice.toFixed(2))
			this.total += itemPrice
		}

		$("#totalCost").html(this.total.toFixed(2))

		$("#currentMoney").html(party.supplies.money.toFixed(2))
	}

	// Note: options.buy needs to exist
	buy() {
		invoke(this.options, "buy", this.total, this.options.items)

		this.update()
	}
}
