const noFoodChange = -0.3;

let landmarks = [];

// Speed is a percentage
// Health is added
// Food is used up more at higher paces
const paceTypes = {
	grueling: {speed: 1, health: -0.1, food: 1.2},
	strenuous: {speed: 0.75, health: 0, food: 1},
	steady: {speed: 0.5, health: 0.1, food: 0.8}
};

// Miles that one oxen can travel per day
const oxenMilesPerDay = 6;

// Pounds and health modifier per day per person
const rationTypes = {
	filling: {pounds: 3, health: 0.1},
	meager: {pounds: 2, health: 0},
	bareBones: {pounds: 1, health: -0.1},
};



const splitPaths = {
	southPath: {
        description: "You Arrive at the South Pass. You need to get to Soda Springs, you can do so by way of a river or a fort.",
        choices: [
            {
                text: "Take the Short Path: Green River.",
                onclick: () => {
                    locations.addPath(
                        [
                            {name: "Green River", distance: 57, generateState: () => {return new RiverState(12, 18, true, true)}},
                            {name: "Soda Springs", distance: 144}
                        ]
                    )
                }
            }
            ,
            {
                text: "Take the Safe Path: Fort Bridger ",
                onclick: () => {
                    locations.addPath(
                        [
                            {name: "Fort Bridger", distance: 125, generateState: () => {return locations.generateFort("Fort Bridger")}},
                            {name: "Soda Springs", distance: 162}
                        ]
                    )
                }
            }
        ]
    },
    blueMountains: {
        description: "You Arrive at Blue Mountains. You need to get to The Dalles, you can either go their directly or take a detour to get supplies at Fort Walla",
        choices: [
            {
                text: "Go Straight to The Dalles",
                onclick: () => {
                    locations.addPath(
                        [
                            {name: "The Dalles", distance: 125, generateState: () => {return new MenuState(splitPaths.theDalles.description, splitPaths.theDalles.choices)}}
                        ]
                    )
                }
            }
            ,
            {
                text: "Take a Detour to Fort Walla",
                onclick: () => {
                    locations.addPath(
                        [
                            {name: "Fort Walla", distance: 55, generateState: () => {return locations.generateFort("Fort Walla")}},
                            {name: "The Dalles", distance: 120, generateState: () => {return new MenuState(splitPaths.theDalles.description, splitPaths.theDalles.choices)}}
                        ]
                    )
                }
            }
        ]
    },
    theDalles: {
        description: "You Arrive at the Dalles, the last stop before Oregon. You can choose to cross The Columbia River to save some distance or play it safe and take the Barlow Toll Road",
        choices: [
            {
                text: "Take the Barlow Toll Road",
                onclick: () => {
                    locations.addPath(
                        [
                            {name: "The End", distance: 200}
                        ]
                    )
                }
            },
            {
                text: "Cross through the Columbia River",
                onclick: () => {
                    locations.addPath(
                        [
                            {name: "The Columbia River", distance: 50, generateState: () => {return new RiverState(20, 25, false, true)}},
                            {name: "The End", distance: 20}
                        ]
                    )
                }
            }
        ]
    }

};


landmarks = [
    {name: "Kansas River Crossing", distance: 102,  generateState: () => {return new RiverState(12,18, true, false)}},
	{name: "Big Blue River Crossing", distance: 83,  generateState: () => {return new RiverState(12,18, false, false)}},
	{name: "Fort Kearney", distance: 119, generateState: () => {return locations.generateFort("Fort Kearney")}},
	{name: "Chimney Rock", distance: 250},
    {name: "South Pass", distance: 102, generateState: () => {return new MenuState(splitPaths.southPath.description, splitPaths.southPath.choices)}},
    {name: "Fort Laramie", distance: 86, generateState: () => {return locations.generateFort("Fort Laramie")}},
	{name: "Independence Rock", distance: 190},
	{name: "Fort Hall", distance: 57, generateState: () => {return locations.generateFort("Fort Hall")}},
	{name: "Snake River Crossing", distance: 182, generateState: () => {return new RiverState(12,18, false, true)}},
	{name: "Fort Boise", distance: 114, generateState: () => {return locations.generateFort("Fort Boise")}},
    {name: "Blue Mountains", distance: 160, generateState: () => {return new MenuState(splitPaths.blueMountains.description, splitPaths.blueMountains.choices)}},
];

const healthArray = ["dying", "very poor", "poor", "fair", "good"];

let diseases = {
	typhoid: {name: "Typhoid Fever", onContract: 0, perDay: -.2, onCure: 1},
	flu: {name: "The Flu", onContract: 0, perDay: -.1, onCure: .5}
};

const occupations = {
	banker: {start: 1600, score: 1},
	carpenter: {start: 800, score: 2},
	farmer: {start: 400, score: 3}
};

class PartyMember {
	constructor(name, isWagonLeader){
		this.name = name;
		this.isWagonLeader = isWagonLeader;
		this.diseases = [];
		this.health = 5; //from 0 to 5
	}

	healthString(){
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

const itemNames = {
	money: ["a dollar", "dollars"],
	oxen: ["an ox", "oxen"],
	clothSets: ["a set of clothes", "sets of clothes"],
	worms: ["a worm", "worms"],
	wheels: ["a wheel", "wagon wheels"],
	axles: ["an axle", "wagon axles"],
	tongues: ["a tongue", "wagon tongues"],
	food: ["a pound of food", "pounds of food"]
}

class Supplies {
	constructor(){

		this.money = 0;
		this.oxen = 0;
		this.clothSets = 0;
		this.worms = 0;
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
// ignore for now
class Weather{
	constructor(){
		this.temp = 0;
	}
	updateWinter(){
		this.temp = 32 - Math.floor(Math.random())
	}
}

class Party {
	constructor() {
		this.landmarkIndex = 0;
		this.supplies = new Supplies();
		this.pace = "steady";
		this.rations = "filling";
		this.wagonState = "stopped"; //stopped, resting, delayed, moving, tipped, or sank
		this.milesTraveled = 0;	//how many miles the party has traveled
		this.milesToNextMark = landmarks[0].distance;
	}


	get rationsValue()
	{
		return rationTypes[this.rations];
	}

	get paceValue()
	{
		return paceTypes[this.pace];
	}

	// Called initially when player chooses occupation
	set occupation(name)
	{
		this.occupationName = name;
		this.supplies.money = occupations[name].start;
		this.scoreModifier = occupations[name].score;
	}

	// Called initially when player chooses start month
	set startingDate(date)
	{
		this.date = date;
	}

	// Increment date by one day (or certain number of days)
	nextDay(days = 1)
	{
		if (days > 0) {
			this.date.setDate(this.date.getDate() + days);
		}
	}

	// Called initially when player enters party member names
	// Note: First member at index 0 is assumed to be the leader
	set members(names)
	{
		// Create PartyMember instances array
		let party = names.map((name, i) => {
			return new PartyMember(name, (i === 0));
		});

		// Create Set() object from array
		this.partyMembers = new Set(party);
	}

	get members()
	{
		return this.partyMembers;
	}

	//increments miles and returns true if we hit a new landmark
	incrementMiles(change, onNewLandmark)
	{
		//have we hit our next mark?
		if (change >= this.milesToNextMark) {
			this.milesTraveled += this.milesToNextMark;
			this.milesToNextMark = 0;
			onNewLandmark();
		}
		else {
			this.milesToNextMark -= change;
			this.milesTraveled += change;
		}

	}

}

let party = new Party();

// Keeps track of miles traveled, possible paths, and landmarks you'll encounter.
class Locations {
	constructor() {
		this.miles = 0;
		this.fortsPassed = 0;
		this.landmarksQueue = [];
		this.atShop = true;
		this.shopName = "Matt's General Store - Independence, Missouri";
		this.nextLandMark = landmarks[0].name;
	}

	//update our location based on landmarkObjects
	update() {
		let landmark = landmarks[party.landmarkIndex];
		if (landmarks[++party.landmarkIndex]){
            party.milesToNextMark = landmarks[party.landmarkIndex].distance;
            this.nextLandMark = landmarks[party.landmarkIndex].name;
		}
        if (!landmark.generateState) {
			states.push(new ContinueState("This Landmark Dosen't have a Defined State yet"));
		}
		else {
			states.push(landmark.generateState());
		}
	}

	generateFort(fortName){
		this.setShop(fortName);
		return new ContinueState(`Arriving at ${fortName}`, null, ()=> {states.pop("gameMenu")});
	}

	setShop(shopName){
		this.atShop = true;
		this.shopName = shopName;
	}

	canShop() {
		return this.atShop;
	}

	atRiver() {
		return true
	}

    addPath(path){
        insertArrayAt(landmarks, party.landmarkIndex, path);
        party.milesToNextMark = landmarks[party.landmarkIndex].distance;
        this.nextLandMark = landmarks[party.landmarkIndex].name;
        states.push(new ContinueState("You Continue Along Your Chosen Path", null, () => states.pop("gameMenu")));
    }
}

let locations = new Locations();