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

		for (let item of this.options.items) {
			// let item = this.options.items[i]
			// Adjust price based on price function
			// item.adjustedPrice = invoke(this.options, "price", item.price) || item.price

			// Default quantity is 1 so you can spam click the buy button
			item.quantity = 1

			// Each item has a name, price, quantity input, and buy button
			let storeItem = $("<div/>").attr("id", item.id)
			storeItem.append($(`<span>${item.name}: $${item.price} x </span>`))
			storeItem.append($("<input/>")
				.val(item.quantity)
				.attr("id", item.id)
				.attr("type", "number")
				.attr("min", 0)
				.change(e => {
					item.quantity = $(e.target).val()
					this.update()
				}))
			// storeItem.append($("<button/>").html("Buy").click(() => {this.buy(item, $(`#${item.id}`).val())}))
			storeItem.append($(`<span> = $<span id="itemPrice"></span></span>`))
			store.append(storeItem)
		}

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
			$(`#${item.id} #itemPrice`).html(itemPrice)
			this.total += itemPrice
		}

		$("#totalCost").html(this.total)

		$("#currentMoney").html(party.supplies.money)
	}

	// Note: options.buy needs to exist
	buy() {
		invoke(this.options, "buy", this.total, this.options.items)

		this.update()
	}
}
