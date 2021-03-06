function fishing(worms) {
	// still a very low chance of getting 1-2 lb of fish even if no bait is used

	let fishCaught = ((Math.floor(Math.random() * worms) + Math.floor(Math.random() + Math.random()) * 2) * (Math.floor(Math.random() * 3) + 1));
	// updates supplies
	party.supplies.food += fishCaught;
	party.supplies.worms -= worms;

	// fishing takes a day which means you also lose food
	party.nextDay();
	party.decrementRestFood(1);

	states.push(new ContinueState("You've caught " + fishCaught + " pounds of fish! <br> You have " + party.supplies.worms + " worms left! <br><br> <img src='./data/images/fishingGif2.gif' width=543px height=307px />"))
}

// asks user how much worms theyd like to use for fishing
let fishState = temporary(new InputState({
	description: "How many would you like to use?",
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
