// Store state - Allows the player to purchase items with an intuitive GUI
class StoreState {
	constructor(description, nextState) {
		this.description = description
		this.nextState = nextState
	}

	onPush() {
		console.log("Skipping store")

		states.push(this.nextState)
	}
}
