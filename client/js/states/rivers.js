class RiverState extends MenuState {
	constructor(width, depth, canFerry, canIndian) {
		super();
		this.width = width;
		this.depth = depth;
		this.updateDescription();
		this.choices = [
			{
				text: "Attempt to ford the river", onclick: () => {
					this.fordingOption();
				}
			},
			{
				text: "Attempt to chaulk the river", onclick: () => {
					this.chaulkingOption(); // << this is done before ^^
				}
			},
			{
				text: "Rest", next: RestState, args: [days => {
					console.log('Rested for', days, 'days.');

					// Lower river depth based on how many days went by
					this.depth -= days;

					// Deep rivers should not fall below 5 feet, even after resting
					if (depth >= 5 && this.depth < 5) {
						this.depth = 5;
					}

					console.log(`Depth is now ${this.depth}`);
				}]
			},
			{
				text: "Learn about the options", onclick: () => {
					states.push(new ContinueState("Fording: making your oxens swim across the river. Not advised for depths greater than 3 feet <br><br> Chaulking: Seal and Float your wagon across the river <br><br> Ferry/Indian: Safest way across a river <br><br> Rest: Rest and see if the river depth will change enough for you to pass"));
				}
			},
			{
				show: canFerry, text: "Hire a ferry for $50", /*next: ferryState,*/ onclick: () => {
					this.ferryOption();
				}
			},
			{
				show: canIndian, text: "Hire an Indian for 3 sets of clothing", /*next: ferryState,*/ onclick: () => {
					this.indianOption();
				}
			}
		];
	}

	updateDescription() {
		this.description = `Weather: cool. <br><br>River width: ${this.width} feet. <br><br>River depth: ${this.depth} feet deep`;
	}

	onEnter() {1
		this.updateDescription()
	}

	failed() {
		// Get random item to lose
		// Will only use an item with more than 0 quantity
		let item = randNonZeroKey(party.supplies);

		if (item) {
			// Lose up to all but one
			let lost = rand(1, party.supplies[item]);
			party.supplies[item] -= lost;

			// Show result to user, using plural/singular tense
			let plural = (lost === 1 ? 0 : 1)
			let description = itemNames[item][plural]
			let result = (plural ? `${lost} ${description}` : description)
			states.push(new ContinueState(`You crossed the river, but lost ${result}!`, undefined, () => states.pop("gameMenu")));
		} else {
			// Player has nothing to lose!
			this.successCrossing();
		}
	}

	successCrossing() {
		states.push(new ContinueState("You have safely crossed the river!", undefined, () => states.pop("gameMenu")));
	}

	ferryOption(){
		if (party.supplies.money >= 50) {
			party.supplies.money -= 50;
			states.push(new ContinueState("You took the ferry for 50 dollars", undefined, () => states.pop("gameMenu")));
		} else {
			states.push(new ContinueState("You do not have enough money to take the ferry"));
		}
	}

	indianOption(){
		if (party.supplies.clothSets >= 3) {
			party.supplies.clothSets -= 3;
			states.push(new ContinueState("You gave the Indian 3 Sets of Clothing for Help crossing the river", undefined, () => states.pop("gameMenu")));
		} else {
			states.push(new ContinueState("You don't have enough Clothes to give the Indian"));
		}
	}

	fordingOption() {
		let x = this.width; // need to update later depending on river actual depth
		let y = this.depth;

		if(x >= 5){ // water depth is too high
			this.failed();
		}
		else if (x <= 1.5){ // water depth is relatively low making it easy
			this.successCrossing();
		}
		else if ( x > 1.5 && x < 3){
			let random = Math.floor(Math.random() * 100);
			if(random <= 90){ // 90% chance of success since less water
				this.successCrossing();
			}
			else{
				this.failed();
			}
		}
		else if ( x >= 3 && x < 5){
			let random = Math.floor(Math.random() * 100);
			if(random <= 75){ // 75 % chance of success
				this.successCrossing();
			}
			else{
				this.failed();
			}
		}
	}

	chaulkingOption(){
		let random = Math.floor(Math.random() * 100);
		if(random <= 70){ // 55 % chance of success
			this.successCrossing();
		}
		else{
			this.failed();
		}
	}
}
