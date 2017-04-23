// Store state - Allows the player to purchase items with an intuitive GUI
class BaseStoreState extends ContinueState {
	constructor(description, nextState) {
		super()
		this.description = description
		this.nextState = nextState
	}

	onPush() {
		console.log("Skipping store")

		states.push(this.nextState)
	}
}

class StoreState extends BaseStoreState {

}
