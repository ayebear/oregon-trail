function rest(days, callback) {
	let summary = `<h4> Your party rested for ${days} days. </h4>`
	party.members.forEach(member => {
		if (member.hasDisease()) {
			let value = rand(days, 100);
			if (value > 85) {
				let diseaseCured = member.removeRandomDisease();
				summary += `<h4> ${member.name} no longer has ${diseaseCured} </h4>`;
			}
		}
		member.updateHealth(.005);
	});
	weather.updateWeather(days);

	// Increment days
	party.nextDay(days);

	// Decrement food
	party.decrementRestFood(2);

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
				}
				else {
					states.pop()
				}
			}
		})

		// This will always be a temporary state, since the continue state above will pop back to it
		this.temporary = true
	}
}
