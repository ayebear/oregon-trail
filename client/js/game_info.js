const paceArray = ["steady", "strenuous", "grueling"];
const rationsArray = ["bare bones", "meager", "filling"];
const healthArray = ["dying", "very poor", "poor", "fair", "good"];

let diseases = {
	typhoid: {name: "Typhoid Fever", onContract: 0, perDay: -.2, onCure: 1},
	flu: {name: "The Flu", onContract: 0, perDay: -.1, onCure: .5}
};

const occupations = {
	banker: {start: 1600, score: 1},
	carpenter: {start: 800, score: 2},
	farmer: {start: 400, score: 3}
}

class PartyMember {
	constructor(name, isWagonLeader){
		this.name = name;
		this.isWagonLeader = isWagonLeader;
		this.diseases = [];
		this.health = 5; //from 0 to 5
	}

	get healthString(){
		return healthArray[Math.ceil(this.health) - 1];
	}

	//update health and call onDeathCallback if this change kills the party member
	updateHealth(change, onDeathCallback){
		if (this.health + change <= 0){
			this.health = 0;
			onDeathCallback();
		}
		else if(this.health + change > 5){
			this.health = 5; //health change would put them over 5
		}
		else{
			this.health += change; //standard change
		}
	}

	//used to apply disease per day damage + additional damagge
	updateDailyHealth(change, onDeathCallback){
		//get total disease damage
		for (let disease of this.diseases){
			change += diseases[disease].perDay;
		}

		//update health
		return this.updateHealth(change, onDeathCallback);
	}

}

class Supplies {
	constructor(){
		this.money = 0;
		this.oxen = 0;
		this.clothSets = 0;
		this.bullets = 0;
		this.wheels = 0;
		this.axles = 0;
		this.tongues = 0;
		this.food = 0;
	}

	decrementFood(change){
		if (this.food - change > 0) {
			this.food -= change;
		} else {
			this.food = 0;
		}
	}

	noFood(){
		return this.food === 0;
	}
}

class Party {
	constructor(){
		this.supplies = new Supplies();
		this.pace = 1; //from 1 to 3
		this.rations = 3; //from 1 to 3;
		this.wagonState = "stopped"; //stopped, resting, delayed, moving, tipped, or sank
		this.milesTraveled = 0;	//how many miles the party has traveled
		this.milesToNextMark = 1000000000;
	}

	// Called initially when player chooses occupation
	set occupation(name) {
		this.occupationName = name
		this.supplies.money = occupations[name].start;
		this.scoreModifier = occupations[name].score;
	}

	// Called initially when player chooses start month
	set startingDate(date) {
		this.date = date;
	}

	// Called initially when player enters party member names
	// Note: First member at index 0 is assumed to be the leader
	set members(names) {
		// Create PartyMember instances array
		let party = names.map((name, i) => {
			return new PartyMember(name, (i === 0));
		})

		// Create Set() object from array
		this.partyMembers = new Set(party);
	}

	incrementMiles(change){
		//have we hit our next mark?
		if (change >= this.milesToNextMark){
			this.milesTraveled += this.milesToNextMark;
			this.milesToNextMark = 0;
		}
		else{
			this.milesToNextMark -= change;
			this.milesTraveled += change;
		}

	}

	//returns the pace in string format;
	get paceString(){
		return paceArray[this.pace - 1];
	}

	get rationsString(){
		return rationsArray[this.rations - 1];
	}

}
