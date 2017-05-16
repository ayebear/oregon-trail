class Party {
	constructor() {
		this.landmarkIndex = 0;
		this.supplies = new Supplies();
		this.pace = "steady";
		this.rations = "filling";
		this.wagonState = "stopped"; //stopped, resting, delayed, moving, tipped, or sank
		this.milesTraveled = 0;	//how many miles the party has traveled
		this.milesToNextMark = landmarks[0].distance;

		this.brokenPart = undefined;
	}

	get rationsValue() {
		return rationTypes[this.rations];
	}

	get paceValue() {
		return paceTypes[this.pace];
	}

	// Called initially when player chooses occupation
	set occupation(name) {
		this.occupationName = name;
		this.supplies.money = occupations[name].start;
		this.scoreModifier = occupations[name].score;
	}

	// Called initially when player chooses start month
	set startingDate(date) {
		this.date = date;
		this.startDate = new Date(date);
		weather.updateWeather();
	}

	// Increment date by one day (or certain number of days)
	nextDay(days = 1) {
		if (days > 0) {
			this.date.setDate(this.date.getDate() + days);

			// TODO: Maybe use up food when going to the next day? Or do this instead of while traveling only?
			// this.decrementFood();
		}
	}

	get daysPassed() {
		return dateDiffInDays(this.startDate, this.date);
	}

	// Called initially when player enters party member names
	// Note: First member at index 0 is assumed to be the leader
	set members(names) {
		// Create PartyMember instances array
		let membersArray = names.map((name, i) => {
			return new PartyMember(name, (i === 0));
		});

		// Create Set() object from array
		this.partyMembers = new Set(membersArray);
	}

	get members() {
		return this.partyMembers;
	}

	// Increments miles and returns true if we hit a new landmark
	incrementMiles(change) {
		// Default speed is calculated by number of oxen and pace value
		change = change || this.paceValue.speed * Math.min(this.supplies.oxen, 9) * oxenMilesPerDay;

		// Have we hit our next mark?
		if (change >= this.milesToNextMark) {
			this.milesTraveled += this.milesToNextMark;
			this.milesToNextMark = 0;
			return true;
		}

		// Continue traveling
		this.milesToNextMark -= change;
		this.milesTraveled += change;
		return false;
	}

	// Uses up food rations based on pace/rations settings, and party size
	decrementFood() {
		this.supplies.decrementFood(this.rationsValue.pounds * this.paceValue.food * this.members.size);
	}
	decrementRestFood(scale){
		if (party.supplies.food > party.rationsValue.pounds * party.members.size){
			party.supplies.food -= party.rationsValue.pounds * party.members.size * scale;
		}
		else{
			party.supplies.food = 0;
		}

	}
	// Applies diseases, handles health logic, and returns a summary of everything that happened
	updateHealth() {
		// Net health change for entire party
		let clothDamage = 0;
		if (weather.season === 1 && this.supplies.clothSets < this.members.size) {
			clothDamage = -(this.members.size / (this.supplies.clothSets ? this.supplies.clothSets : 1)) / 25;
		}
		let partyChange = this.paceValue.health + this.rationsValue.health + weather.currentHealth + clothDamage;

		// Update based on food/rations
		if (this.supplies.noFood()) {
			partyChange += noFoodChange;
		}

		let summaryString = "";

		// Go through partyMembers, apply health change based on diseases + base party change
		for (let partyMember of this.partyMembers) {

			// Add diseases
			let value = rand(-partyChange * 10, 100);
			if (value > 98.5) {
				let diseaseAdded = partyMember.addRandomDisease();
				if (diseaseAdded) {
					summaryString += `<h4>${partyMember.name} has ${diseaseAdded}</h4>`;
				}
			}

			// Remove diseases
			if (partyMember.hasDisease() && value < 10) {
				let diseaseRemoved = partyMember.removeRandomDisease();
				summaryString += `<h4>${partyMember.name} no longer has ${diseaseRemoved}</h4>`;
			}

			// Update health values
			partyMember.updateDailyHealth(partyChange, () => {
				summaryString += `<h4> ${partyMember.name} has died </h4>`;

				//This killed the partyMember, remove them from the set
				this.partyMembers.delete(partyMember);
			});
		}

		return summaryString;
	}
}

let party = new Party();
