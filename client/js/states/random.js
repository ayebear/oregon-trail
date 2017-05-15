class RandomEvents {
	constructor() {
		this.current = 0;

		// Because properly bound class methods are only available in ES7
		this.thieves = this.thieves.bind(this);
		this.brokenWagon = this.brokenWagon.bind(this);
		this.wrongPath = this.wrongPath.bind(this);
	}

	select() {
		invokeRandom(this.thieves, this.brokenWagon, this.wrongPath);
	}

	thieves() {
		const item = randNonZeroKey(party.supplies);

		if (item) {
			// Don't try to steal more than half of what you have
			const amount = Math.ceil(Math.max(getItemAmount(item), party.supplies[item]) / 2);
			party.supplies[item] -= amount;

			// Show what the thieves stole
			const itemDescription = getItemDescription(item, amount);
			let description = `A gang of thieves raided your wagon for ${itemDescription}!`;
			states.push(temporary(new ContinueState(description)));
		}
	}

	wrongPath() {
		let daysLost = rand(1, 6);
		party.nextDay(daysLost);
		states.push(temporary(new ContinueState(`You took the wrong path and lost ${daysLost} day(s).`)));
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
		} else {
			// Unsuccessful repairs, so must replace
			if (party.supplies[part] >= 1) {
				// Use a part to fix it
				party.supplies[part] -= 1;
				party.brokenPart = undefined;
				states.push(temporary(new ContinueState(`You did not successfully repair the wagon ${wagonParts[part]}, so it was replaced.`)));
			} else {
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
		} else {
			states.push(temporary(new ContinueState(`You do not have a spare wagon ${wagonParts[part]}.`)));
		}
	}
}

let randomEvents = new RandomEvents();
