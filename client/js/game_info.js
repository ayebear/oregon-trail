const paceArray = ["steady", "strenuous", "grueling"];
const rationsArray = ["bare bones", "meager", "filling"];
const healthArray = ["dying", "very poor", "poor", "fair", "good"];

let diseases = {
	typhoid: {name: "Typhoid Fever", onContract: 0, perDay: -.2, onCure: 1},
	flu: {name: "The Flu", onContract: 0, perDay: -.1, onCure: .5}
};

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
	constructor(money){
		this.money = money;
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
	constructor(partyMembers, supplies, startingDate){
		this.partyMembers = partyMembers;
		this.supplies = supplies;
		this.pace = 1; //from 1 to 3
		this.rations = 3; //from 1 to 3;
		this.wagonState = "stopped"; //stopped, resting, delayed, moving, tipped, or sank
		this.date = startingDate ? startingDate : new Date();
		this.milesTraveled = 0;	//how many miles the party has traveled
		this.milesToNextMark = 1000000000;

		console.log(this.date);
	}


	incrementMiles(change){
        //have we hit our next mark?
        if (change >= party.milesToNextMark){
            party.milesTraveled += party.milesToNextMark;
            party.milesToNextMark = 0;
        }
        else{
            party.milesToNextMark -= change;
            party.milesTraveled += change;
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

//global variable for our party
let party = null;