class PartyEntryState {
	constructor(nextState) {
		this.nextState = nextState
	}

	display() {
		// 5 input boxes + Submit button
		// Submit button should push nextState
	}

	onPush() {
		// TODO: Remove this once interface is complete
		party.members = ["Leader", "Cory", "Eric", "Tez", "Quang"]
		console.log("Set party members automatically, skipping PartyEntryState")

		states.push(this.nextState)
	}
}
