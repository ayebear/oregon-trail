const noFoodChange = -0.3;

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

// Note: "distance" is miles to this landmark
// TODO: Associate states with these, and trigger those states when the landmarks are reached

const landmarks = [
	{name: "Independence, MO", distance: 1, generateState: () => {return new ContinueState("Leaving Independence, MO")}},
	{name: "Kansas River Crossing", distance: 102, river: {
		ferry: true,
		depth: 6.5,
		width: 120
	}},
	{name: "Big Blue River Crossing", distance: 83},
	{name: "Fort Kearney", distance: 119, fort: true},
	{name: "Chimney Rock", distance: 250},
	{name: "Fort Laramie", distance: 86},
	{name: "Independence Rock", distance: 190},
	{name: "South Pass", distance: 102, choices: [
		[
			{name: "Green River", distance: 57},
			{name: "Soda Springs", distance: 144}
		],
		[
			{name: "Fort Bridger", distance: 125},
			{name: "Soda Springs", distance: 162}
		]
	]},
	{name: "Fort Hall", distance: 57},
	{name: "Snake River Crossing", distance: 182},
	{name: "Fort Boise", distance: 114},
	{name: "Blue Mountains", distance: 160, choices: [
		[
			{name: "Fort Walla Walla", distance: 55},
			{name: "The Dalles", distance: 120}
		],
		[
			{name: "The Dalles", distance: 125}
		]
	]},
	{name: "The Dalles (Final Choice)", distance: 0, choices: [
		[{name: "Barlow Toll Road", distance: 100}],
		[{name: "Columbia River", distance: 0}]
	]},
	{name: "The End", distance: 0}
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
		this.landmarkIndex = 0;
		this.supplies = new Supplies();
		this.pace = "steady";
		this.rations = "filling";
		this.wagonState = "stopped"; //stopped, resting, delayed, moving, tipped, or sank
		this.milesTraveled = 0;	//how many miles the party has traveled
		this.milesToNextMark = landmarks[0].distance;


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
		});

		// Create Set() object from array
		this.partyMembers = new Set(party);
	}

	get members() {
		return this.partyMembers;
	}

	//increments miles and returns true if we hit a new landmark
	incrementMiles(change, onNewLandmark){
		//have we hit our next mark?
		if (change >= this.milesToNextMark){
			this.milesTraveled += this.milesToNextMark;
			this.milesToNextMark = 0;
			onNewLandmark();
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

let party = new Party();

// Keeps track of miles traveled, possible paths, and landmarks you'll encounter.
class Locations {
	constructor() {
		this.miles = 0;
		this.fortsPassed = 0;
		this.landmarksQueue = []
	}

	//update our location based on landmarkObjects
	update(){
		let landmark = landmarks[party.landmarkIndex];

		if (landmark.fort){
			this.fortsPassed++;
		}
		party.milesToNextMark = landmarks[++party.landmarkIndex].distance;
		console.log(party.milesToNextMark);
		if (!landmark.generateState){
			states.push(new ContinueState("This Landmark Dosen't have a Defined State yet"));
		}
		else {
			states.push(landmark.generateState());
		}
	}

	atShop() {
		return true
	}

	atRiver() {
		return true
	}
}

let locations = new Locations();