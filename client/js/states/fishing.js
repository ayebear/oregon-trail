function fishing(worms) {
	// still a very low chance of getting 1 lb of fish even if no bait is used
	let fishCaught = (Math.floor(Math.random() * worms) + Math.floor(Math.random() + Math.random()) * 2);
	// updates supplies
	party.supplies.food += fishCaught;
	party.supplies.worms -= worms;
	states.push(new ContinueState("You've caught " + fishCaught + " pounds of fish! \n You have " + party.supplies.worms + " worms left!"))
}

let fishState = temporary(new InputState({
	description: "How many worms would you like to use?",
	type: "number",
	min: 0,
	max: 99,
	value: 0,
	valid: value => {
		// will not let user continue unless worms enter is less than their current supply
		let worms = parseInt(value);
		return (worms >= 0 && worms <= party.supplies.worms)
	},
	onSubmit: value => {
		let worms = parseInt(value);
		fishing(worms);
	}}
	)
);
