// Generates a new store state with correct description and prices based on location
function makeStore(options) {
	// Setup store items
	options.items = [
		{id: "oxen", name: "Oxen", price: 20},
		{id: "clothSets", name: "Sets of clothing", price: 10},
		{id: "worms", name: "Worms", price: 0.1},
		{id: "wheels", name: "Wagon wheels", price: 10},
		{id: "axles", name: "Wagon axles", price: 10},
		{id: "tongues", name: "Wagon tongues", price: 10},
		{id: "food", name: "Pounds of food", price: 0.2}
	]

	// Define buy function
	options.buy = (total, items) => {
		if (total <= party.supplies.money) {
			// Subtract total cost and add items to supplies
			party.supplies.money -= total
			for (let name in items) {
				let item = items[name]
				party.supplies[item.id] += item.quantity
			}
		}
	}

	// Adjust prices
	for (let item of options.items) {
		item.price += (0.25 * locations.fortsPassed * item.price)
	}

	return new StoreState(options)
}
