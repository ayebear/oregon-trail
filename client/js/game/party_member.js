class PartyMember {
	constructor(name, isWagonLeader) {
		this.name = name;
		this.isWagonLeader = isWagonLeader;
		this.diseases = [];
		this.health = 5; //from 0 to 5
	}

	healthString() {
		return healthArray[Math.ceil(this.health) - 1];
	}

	//adds a random disease and returns it's name
	addRandomDisease() {
		let randomDisease;
		let diseasesNotHad = Object.keys(diseases).filter(key => this.diseases.indexOf(key));
		if (diseasesNotHad.length) {
			//this person can get a random disease
			randomDisease = randValue(diseasesNotHad);
			this.diseases.push(randomDisease)
			randomDisease = diseases[randomDisease].name;
		}
		return randomDisease;
	}

	//removes a random disease and return it's name
	removeRandomDisease() {
		let index = randIndex(this.diseases);
		let diseaseName = this.diseases[index];

		//this.updateHealth(diseases[diseaseName].onCure);
		this.diseases.splice(index, 1);
		diseaseName = diseases[diseaseName].name;
		return diseaseName;
	}

	//returns true if this partymember has any diseases
	hasDisease() {
		return this.diseases.length;
	}

	//update health and call onDeathCallback if this change kills the party member
	updateHealth(change, onDeathCallback) {
		if (this.health + change <= 0) {
			this.health = 0;
			onDeathCallback();
		}
		else if (this.health + change > 5) {
			this.health = 5; //health change would put them over 5
		}
		else{
			this.health += change; //standard change
		}
	}

	//used to apply disease per day damage + additional damagge
	updateDailyHealth(change, onDeathCallback) {
		//get total disease damage
		for (let disease of this.diseases) {
			change += diseases[disease].perDay;
		}

		//update health
		return this.updateHealth(change, onDeathCallback);
	}
}
