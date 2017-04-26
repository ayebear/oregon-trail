let restState = new InputState("How many days would you like to rest?", "number", value => {
	let days = parseInt(value)
	return value >= 0 && value < 10
}, value => {
	party.members.forEach(member => {
		// TODO: Remove diseases here
		// Find out what other things happen when resting
		member.updateHealth(0.5)
	})

	// Increment days
	party.nextDay(value)

	// Go back
	states.pop()
})
