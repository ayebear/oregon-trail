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
		this.money = 10;
		this.oxen = 10;
		this.clothSets = 10;
		this.worms = 10;
		this.wheels = 10;
		this.axles = 10;
		this.tongues = 10;
		this.food =10;
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
// ignore for now 
class Weather{
	constructor(){
		this.temp = 0;
	}
	updateWinter(){
		this.temp = 32 - Math.floor(Math.random())
	}
}

class River{
	constructor(){
		this.width = 5;
		this.depth = 3;
		this.widthB = 5;
		this.depthB = 5;
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
		//this.river = new River();
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

	// Increment date by one day (or certain number of days)
	nextDay(days = 1) {
		if (days > 0) {
			this.date.setDate(this.date.getDate() + days);
		}
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

	get members() {
		return this.partyMembers;
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
