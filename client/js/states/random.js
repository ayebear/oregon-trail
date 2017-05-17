
// random events that may happen during the traveling.
// only a 10% chance of any of these happening
class RandomEvents {
	constructor() {
		this.current = 0;

		// Because properly bound class methods are only available in ES7
		this.thieves = this.thieves.bind(this);
		this.brokenWagon = this.brokenWagon.bind(this);
		this.wrongPath = this.wrongPath.bind(this);
		this.lostOxen = this.lostOxen.bind(this);
		this.foodSpoil = this.foodSpoil.bind(this);
		this.luckyWagon =this.luckyWagon.bind(this);
	}

	// selects one of the three random events to happen
	select() {
		invokeRandom(this.thieves, this.brokenWagon, this.wrongPath, this.foodSpoil, this.lostOxen, this.luckyWagon);
	}

	// food spoiling
	foodSpoil(){
		const amount = rand(1, Math.ceil(party.supplies['food'] / 10));
		party.supplies['food'] -= amount;
		// Show what the thieves stole
		const itemDescription = getItemDescription('food', amount);
		let description = `You lost ${itemDescription} due to spoilage!`;
		states.push(temporary(new ContinueState(description)));
		}

	// lose one oxen, only one because thieves have a chance of stealing a lot more
	lostOxen(){
		if (party.supplies['oxen'] >= 2){
			party.supplies.oxen -= 1;
			states.push(temporary(new ContinueState(`An oxen roamed off!`)));
		}
	}

	//we found a random amount of some item!
	luckyWagon(){
		// Pick any item
		const item = randValue(Object.keys(party.supplies));
		const amount = Math.floor(Math.random()*5 + 2);
		let description = getItemDescription(item, amount);

		// Don't try to steal more than half of what you have

		party.supplies[item] += amount;
			// Show what the thieves stole

		description = `You found ${description} near a broken wagon!`;
		states.push(temporary(new ContinueState(description)));
	}

	// thieves stealing your stuff
	thieves() {
		const item = randNonZeroKey(party.supplies);

		if (item) {
			// Don't try to steal more than half of what you have
			const amount = rand(1, Math.ceil(party.supplies[item] / 2));

			party.supplies[item] -= amount;
			// Show what the thieves stole
			const itemDescription = getItemDescription(item, amount);
			let description = `A gang of thieves raided your wagon for ${itemDescription}!`;
			states.push(temporary(new ContinueState(description)));
		}
	}
	// took wrong path
	wrongPath() {
		let daysLost = rand(1, 6);
		party.nextDay(daysLost);
		party.decrementRestFood(daysLost);
		states.push(temporary(new ContinueState(`You took the wrong path and lost ${daysLost} day${daysLost === 1 ? "" : "s"}.`)));
	}


	/// user gets option to repair -> if it fails, then it get replaced
	// if user declines repairing - > it gets replaced but a day is not lost
	brokenWagon() {
		const part = randValue(["wheels", "axles", "tongues"]);
		party.brokenPart = part;
		const description = getItemDescription(part, 1);
		const brokenDescription = `You broke ${description}! <br><br> Would you like to spend a day to try to repair it?`;

		states.push(temporary(new MenuState(brokenDescription, [
			{text: "Accept", onclick: () => {
				// Repairing takes one day
				party.nextDay();
				party.decrementRestFood(2);
				this.repairingOption(part);
			}},
			{text: "Decline", onclick: () => {
				this.replacingOption(part);
			}}
		])));
	}

	repairingOption(part) {
		if (rand(0, 100) < 85) {
			// Successful repairs, no need to use up a part
			party.brokenPart = undefined;
			states.push(temporary(new ContinueState(`You have successfully repaired the wagon ${wagonParts[part]}.`)));
		}
		else {
			// Unsuccessful repairs, so must replace
			if (party.supplies[part] >= 1) {
				// Use a part to fix it
				party.supplies[part] -= 1;
				party.brokenPart = undefined;
				states.push(temporary(new ContinueState(`You did not successfully repair the wagon ${wagonParts[part]}, so it was replaced.`)));
			}
			else {
				states.push(temporary(new ContinueState(`You did not successfully repair the wagon ${wagonParts[part]} and do not have a spare part to replace it with.`)));
			}
		}
	}

	replacingOption(part) {
		// Attempt to replace the broken wagon part
		if (party.supplies[part] >= 1) {
			party.supplies[part] -= 1;
			party.brokenPart = undefined;
			states.push(temporary(new ContinueState(`Your wagon ${wagonParts[part]} was replaced.`)));
		}
		else {
			states.push(temporary(new ContinueState(`You do not have a spare wagon ${wagonParts[part]}.`)));
		}
	}
}

let randomEvents = new RandomEvents();
