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

		let store = $("<div/>").attr("id", "store").attr("class", "store")
		let table = $("<table/>")
		table.append("<tr><th>Item</th><th>Price</th><th>Quantity</th><th>Cost</th><th>You own</th></tr>")

		// Create store items
		for (let item of this.options.items) {
			// Set default quantity
			item.quantity = 0

			let storeItem = $("<tr/>").attr("id", item.id)

			storeItem.append(`<td>${item.name}</td>`)

			storeItem.append(`<td>$${item.price.toFixed(2)}</td>`)

			// Each item has a name, price, quantity input, and buy button
			$("<td/>").append($("<input/>")
				.val(item.quantity)
				.attr("type", "number")
				.attr("min", 0)
				.change(e => {
					item.quantity = parseInt($(e.target).val())
					this.update()
				})).appendTo(storeItem)

			storeItem.append(`<td>$<span id="itemPrice"></span></td>`)

			storeItem.append(`<td><span id="ownedQuantity"></span></td>`)

			table.append(storeItem)
		}
		table.appendTo(store)

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

			let current = invoke(this.options, "get", item.id) || 0
			$(`#${item.id} #ownedQuantity`).html(current)
		}

		$("#totalCost").html(this.total.toFixed(2))

		$("#currentMoney").html(party.supplies.money.toFixed(2))
	}

	clearQuantities() {
		for (let item of this.options.items) {
			item.quantity = 0
		}
		$(`#store input`).val(0)
	}

	// Note: options.buy needs to exist
	buy() {
		invoke(this.options, "buy", this.total, this.options.items)

		this.clearQuantities()

		this.update()
	}
}
