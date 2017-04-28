function fishing(worms){
	var newWorms = party.supplies.worms - worms;
	// still a very low chance of getting 1 lb of fish even if no bait is used
	var fishCaught = (Math.floor((Math.random() * worms))) + (Math.floor(Math.random() + Math.random()));
	// updates supplies
	party.supplies.food += fishCaught;
	party.supplies.worms = newWorms;
	let caught = "Youve caught " + fishCaught + " pounds of fish! \n You have " + party.supplies.worms + " worms left!";
	states.push(new ContinueState(caught))

}
let fishState = temporary(new InputState({
	description: "How many worms would you like to sacrifice",
	type: "number",
	min: 0,
	max: 99,
	value: 0,
	valid: value => {
		// will not let user continue unless worms enter is less than their current supply
		let worms = parseInt(value)
		return (worms >= 0 && worms <= party.supplies.worms)
	},
	onSubmit: value => {
		let worms = parseInt(value)
		fishing(worms);
	}
}

)
)
