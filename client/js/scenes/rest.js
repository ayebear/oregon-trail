let restState = new InputState({
	description: "How many days would you like to rest?",
	type: "number",
	min: 0,
	max: 9,
	value: 0,
	valid: value => {
		let days = parseInt(value)
		return days >= 0 && days < 10
	},
	onSubmit: value => {
		let days = parseInt(value)
		party.members.forEach(member => {
			// TODO: Remove diseases here
			// Find out what other things happen when resting
			member.updateHealth(0.5)
		})

		// Increment days
		party.nextDay(days)

		// Go back
		states.pop()
	}
})
