class PartyEntryState {
	constructor(nextState) {
		this.nextState = nextState
	}

	display() {
		// Description + 5 input boxes + Submit button
		// Submit button should push nextState, if all names are filled in
		// Note: Original game would generate random names if you didn't fill them all in - could hardcode a default name for each position
	}

	onPush() {
		// TODO: Remove this once interface is complete
		party.members = ["Leader", "Cory", "Eric", "Tez", "Quang"]
		console.log("Set party members automatically, skipping PartyEntryState")

		states.push(this.nextState)
	}
}
