function rest(days, callback) {
	let summary = `Your party rested for ${days} days.`
	party.members.forEach(member => {
		// TODO: Remove diseases here
		// Find out what other things happen when resting
		member.updateHealth(0.5)
	})

	// Increment days
	party.nextDay(days)

	// Call custom callback
	if (callback) {
		callback(days)
	}

	// Show a summary of what happened
	states.push(new ContinueState(summary))
}

class RestState extends InputState {
	constructor(callback) {
		super({
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
				if (days > 0) {
					rest(days, callback)
				} else {
					states.pop()
				}
			}
		})

		// This will always be a temporary state, since the continue state above will pop back to it
		this.temporary = true
	}
}
