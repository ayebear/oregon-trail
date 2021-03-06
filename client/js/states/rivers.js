
// river crossing menu
class RiverState extends MenuState {
	constructor(depth, width, canFerry, canIndian) {
		super();
		this.width = width;
		this.depth = depth;
		this.originalDepth = depth;
		this.originalWidth = width;
		this.updateDescription();
		this.gifAddress = `<br><br> <img src='./data/images/riverCross${locations.riversPassed}.gif' width=543px height=307px/>`;
		this.choices = [
			{	// forcing oxens to swim acrossing the river
				text: "Attempt to ford the river", onclick: () => {
					this.fordingOption();
				}
			},
			{	// floating wagon across
				text: "Attempt to caulk the river", onclick: () => {
					this.chaulkingOption();
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
			},
			{
				text: "Rest", next: RestState, args: [days => {
					// Lower river depth based on how many days went by
					this.depth -= days;

					// Deep rivers should not fall below 5 feet, even after resting
					if (this.originalDepth >= 5 && this.depth < 5) {
						this.depth = 5;
					}
				}]
			},
			{
				text: "Learn about the options", onclick: () => {
					states.push(new ContinueState("Fording: making your oxens swim across the river. Not advised for depths greater than 3 feet <br><br> Caulking: Seal and Float your wagon across the river <br><br> Ferry/Indian: Safest way across a river <br><br> Rest: Rest and see if the river depth will change enough for you to pass"));
				}
			}
		];
	}

	updateDescription() {
		this.description = `Weather: ${weather.daily}<br><br>The river is ${this.width.toFixed(1)} feet wide, and ${this.depth.toFixed(1)} feet deep.`;
	}

	onEnter() {
		// Change depth of river based on weather
		this.depth = this.originalDepth + weather.riverDepth;
		if (this.depth < 1) {
			this.depth = 1;
		}

		// Change width of river based on depth affected by weather
		this.width = this.originalWidth + (weather.riverDepth * (3 / 2));
		if (this.width < 2) {
			this.width = 2;
		}

		this.updateDescription();
	}
	// failing will still cross you the river, but you lose items
	failed() {
		// Get random item to lose
		// Will only use an item with more than 0 quantity
		let item = randNonZeroKey(party.supplies);

		if (item) {
			// Lose up to all but one
			let lost = rand(1, party.supplies[item]);
			party.supplies[item] -= lost;

			// Show result to user, using plural/singular tense
			let result = getItemDescription(item, lost);
			states.push(new ContinueState(`You crossed the river, but lost ${result}! ${this.gifAddress}`, undefined, () => states.pop("gameMenu")));
		}
		else {
			// Player has nothing to lose!
			this.successCrossing();
		}
	}
	// river was succcessfully cross with no items lost
	successCrossing() {
		states.push(new ContinueState(`You have safely crossed the river! ${this.gifAddress}`, undefined, () => states.pop("gameMenu")));
	}
	// ferry option is safe but appears only at certain locations
	ferryOption() {
		if (party.supplies.money >= 50) {
			party.supplies.money -= 50;
			states.push(new ContinueState(`You took the ferry for 50 dollars  ${this.gifAddress}`, undefined, () => states.pop("gameMenu")));
		}
		else {
			states.push(new ContinueState("You do not have enough money to take the ferry"));
		}
	}
	// another option like ferry
	indianOption() {
		if (party.supplies.clothSets >= 3) {
			party.supplies.clothSets -= 3;
			states.push(new ContinueState(`You gave the Indian 3 Sets of Clothing for help crossing the river ${this.gifAddress}`, undefined, () => states.pop("gameMenu")));
		}
		else {
			states.push(new ContinueState("You don't have enough Clothes to give the Indian"));
		}
	}
	// based on details of the OG game.
	// certain depths give different % of success
	fordingOption() {
		let x = this.width; // need to update later depending on river actual depth
		let y = this.depth;

		if (x >= 5) { // water depth is too high
			this.failed();
		}
		else if (x <= 1.5) { // water depth is relatively low making it easy
			this.successCrossing();
		}
		else if (x > 1.5 && x < 3) {
			let random = Math.floor(Math.random() * 100);
			if (random <= 90) { // 90% chance of success since less water
				this.successCrossing();
			}
			else {
				this.failed();
			}
		}
		else if (x >= 3 && x < 5) {
			let random = Math.floor(Math.random() * 100);
			if (random <= 75) { // 75 % chance of success
				this.successCrossing();
			}
			else {
				this.failed();
			}
		}
	}
	// if river depth is too deep, this is an option but not guaranteed safe
	chaulkingOption() {
		let random = Math.floor(Math.random() * 100);
		if (random <= 70) { // 70 % chance of success
			this.successCrossing();
		}
		else {
			this.failed();
		}
	}
}
