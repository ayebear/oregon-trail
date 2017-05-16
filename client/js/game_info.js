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
const oxenMilesPerDay = 3;

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
							{name: "Green River", type: "river", distance: 57, generateState: () => {return locations.generateRiver("The Green River", `The Green River is a tributary to the Colorado River, flowing south from the
								Continental Divide along a twisted, rugged path.  It's estimated to be more
								than 700 miles in length.  It's navigable only at high water, and even then
								it's extremely dangerous.  But you must cross it before proceeding west on the
								Oregon Trail, so be very careful.`, {depth: 30, width: 15, canFerry: true, canIndian: false})}},
							{name: "Soda Springs", type: "town", distance: 144, generateState: () => {return locations.generateContinue("Soda Springs", `Soda Springs is an important landmark and stopping-off point along the trail.
								It gets its name from the alkaline (sodium) mineral springs you find there.
								Some travelers separate from the Oregon Trail at this point and head southwest
								for California.  Others wait until they get to Fort Hall before going on the
								"California Trail."`)}}
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
							{name: "Fort Bridger", type: "fort", distance: 125, generateState: () => {return locations.generateFort("Fort Bridger", `Fort Bridger is a U.S. army outpost, although it was founded in 1843 by fur
								trader and scout Jim Bridger as a trading post and way station.  It's an
								important stop along the Oregon Trail, where travelers can rest, buy supplies,
								and obtain information about the next stretch of the journey.  A little over
								100 miles to the southwest is the recent Mormon settlement of Salt Lake City.`)}},
							{name: "Soda Springs", type: "town", distance: 162, generateState: () => {return locations.generateContinue("Soda Springs", `Soda Springs is an important landmark and stopping-off point along the trail.
								It gets its name from the alkaline (sodium) mineral springs you find there.
								Some travelers separate from the Oregon Trail at this point and head southwest
								for California.  Others wait until they get to Fort Hall before going on the
								"California Trail."`)}}
						]
					)
				}
			}
		]
	},
	grandRonde: {
		description: "You Arrive at Blue Mountains. You need to get to The Dalles, you can either go their directly or take a detour to get supplies at Fort Walla",
		choices: [
			{
				text: "Go Straight to The Dalles",
				onclick: () => {
					locations.addPath(
						[
							{name: "The Dalles", type: "split", distance: 125, generateState: () => {return locations.generateSplit("The Dalles", `The Dalles is the chief embarkation point for rafts heading down the Columbia
								River toward the Willamette Valley.  It was named by French fur-trappers, who
								likened the deep, stony river gorge to a huge gutter.  (In French, the word
								'dalles' can refer to 'gutters' or 'flagstones.') Emigrants to Oregon often
								stop here to rest and trade before rafting down the Columbia.`, splitPaths.theDalles)}}
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
							{name: "Fort Walla", type: "fort", distance: 55, generateState: () => {return locations.generateFort("Fort Walla", `Fort Walla Walla was established in 1818 as a fur-trading post at the juncture
								of the Columbia and Walla Walla Rivers.  It later became a military fort.
								Marcus Whitman worked as a medical missionary nearby from 1836 to 1847.  Walla
								Walla is the name of an American Indian tribe living in the region.  The Walla
								Wallas are close related to and allied with the Umatila.`)}},
							{name: "The Dalles", type: "split", distance: 120, generateState: () => {return locations.generateSplit("The Dalles", `The Dalles is the chief embarkation point for rafts heading down the Columbia
								River toward the Willamette Valley.  It was named by French fur-trappers, who
								likened the deep, stony river gorge to a huge gutter.  (In French, the word
								'dalles' can refer to 'gutters' or 'flagstones.') Emigrants to Oregon often
								stop here to rest and trade before rafting down the Columbia.`, splitPaths.theDalles)}}						]
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
							{name: "The End", type: "town", distance: 200, generateState: () => {return locations.generateEndGame()}}
						]
					)
				}
			},
			{
				text: "Cross through the Columbia River",
				onclick: () => {
					locations.addPath(
						[
							{name: "The Columbia River", type: "river", distance: 50, generateState: () => {return locations.generateRiver("The Columbia River", `The Columbia river is the largets, most imprtant river in the Northwest.  It
								starts up in Canada and passes through the Oregon Territory, flowing more than
								1,000 miles to the Pacific Ocean.  It has cut a deep gorge through the rugged
								Oregon countryside.  It also has many rapids, making navigation difficult.
								Rafting down the Columbia can be very dangerous!`, {depth: 20, width: 15, canFerry: false, canIndian: true})}},
							{name: "The End", type: "town", distance: 20, generateState:() => {return locations.generateEndGame()}}
						]
					)
				}
			}
		]
	}

};


landmarks = [
	{name: "Kansas River Crossing", type: "river", distance: 102,  generateState: () => {return locations.generateRiver("Kansas River Crossing", `The Kansas River is a tributary to the Missouri.  It is approximately 170
		miles long.  Its width and depth vary depending on the recent amount of snow
		melt.  Where the Oregon Trail crosses the Kansas River, the average width is
		620 feet and the usual depth in the middle is about 4 feet.  But be sure to
		check the conditions when you get there.`, {depth: 3, width: 6, canFerry: true, canIndian: false })}},
	{name: "The Big Blue River Crossing", type: "river", distance: 83,  generateState: () => {return locations.generateRiver("Big Blue River Crossing", `The Big Blue River is a tributary to the Kansas River, which is in turn a
		tributary to the Missouri.  It's approximately 300 miles long.  Farther to the
		south and west is the Little Blue River, which links up with the Big Blue at
		Blue Rapids.  You'll cross the Big Blue north of the rapids, allowing you to
		avoid the Little Blue River altogether`, {depth: 6, width: 20, canFerry: false, canIndian: false })}},
	{name: "Fort Kearney", type: "fort", distance: 119, generateState: () => {return locations.generateFort("Fort Kearney", `Fort Kearney is a U.S. Army post established in 1848 near the Platte River.
		It garrisons cavalry troops who protect settlers and travelers along the Oregon
		Trail.  It was named for Gen. Stephen Kearny (often spelled 'Kearney'), who
		died in 1848 after helping establish law and order in the region and serving in
		the Mexican War`)}},
	{name: "Chimney Rock", type: "town", distance: 250, generateState: () => {return locations.generateContinue("Chimney Rock", `Chimney Rock is an important landmark on the Oregon Trail.  It's a spectacular
		natural formation of solid rock and can be seen from miles around.  In fact,
		you can see it for a whole day as you approach it and another whole day as you
		leave it behind.  If you don't see it at all within a week or so after leaving
		Fort Kearney, you've probably strayed too far off the trail.`)}},
	{name: "South Pass", type: "split", distance: 102, generateState: () => {return locations.generateSplit("The South Path", `South Pass is a valley that cuts through the Rocky Mountains at their highest
		point, the Continental Divide.  It marks the halfway point on your journey to
		Oregon.  After South Pass, the trail splits.  If you're short on supplies, you
		should head to Fort Bridger.  But if you don't need supplies, you may want to
		take the shorter route and go directly to the Green River.`, splitPaths.southPath)}},
	{name: "Fort Laramie", type: "fort", distance: 86, generateState: () => {return locations.generateFort("Fort Laramie", `Fort Laramie is a US Army post near the junction of the North Platte and
		Laramie Rivers.  Originally called Fort William, it was founded as a
		fur-trading post in 1834.  It was renamed for Jacques Laramie, a French trapper
		who worked in the region earlier in the century.  Fort Laramie is an important
		stop for resting and getting supplies along the trail.`)}},
	{name: "Independence Rock", type: "town", distance: 190, generateState: () => {return locations.generateContinue("Independence Rock", `Independence Rock is an important landmark and resting place along the Oregon
		Trail. It's a large natural formation, almost 200 feet tall, made of soft stone
		into which many travelers and traders have carved their names, initials, or
		brief messages.  It gets its name from the fact that, in order to stay on
		schedule, travelers try to reach it no later than July 4--Independence Day`)}},
	{name: "Fort Hall", type: "fort", distance: 57, generateState: () => {return locations.generateFort("Fort Hall", `Fort Hall is an outpost on the banks of the Snake River.  It was originally a
		fur-trading post, founded by Nathaniel Wyeth in 1834.  Later it was bought by
		the Hudson's Bay Company.  Ever since it has served as an important stop along
		the Oregon Trail, where emigrants can rest and buy supplies.  Some travelers
		turn southwest at this point and head for California.`)}},
	{name: "Snake River Crossing", type: "river", distance: 182, generateState: () => {return locations.generateRiver("The Snake River Crossing", `After leaving Fort Hall, the trail follows the Snake River for hundreds of
		miles.  The Snake River gets its name from the way it twists and turns through
		this ruffed country, sometimes through steep gorges.  But the trail is fairly
		flat (through dry and desolate) near the river, which makes wagon travel
		possible.  Crossing the Snake River, however, can be dangerous.`, {depth: 20, width: 50, canFerry: false, canIndian: true })}},
	{name: "Fort Boise", type: "fort", distance: 114, generateState: () => {return locations.generateFort("Fort Boise", `Fort Boise was built by the Hudson's Bay Company in 1834 as a fur-trading
		outpost.  Its name comes from the French word "boise," meaning "wooded."
		That's because there are lots of trees here, unlike the dry region of the Snake
		River Plain to the east.  An important stop on the Oregon Trail, it stands on
		the banks of the Boise River, a tributary to the Snake River.`)}},
	{name: "The Grand Ronde", type: "split", distance: 160, generateState: () => {return locations.generateSplit("The Grand Ronde", `The Grand Ronde (French for 'great ring') is a river that runs roughly
		parallel to the Blue Mountains.  The Oregon Trail crosses through the Grande
		Ronde river valley just before the mountains.  The Grande Ronde valley is noted
		for its beauty and is greatly appreciated by emigrants as a sign that their
		long journey is nearing its end.`, splitPaths.grandRonde)}},
];

const healthArray = ["dying", "very poor", "poor", "fair", "good"];

let diseases = {
	typhoid: {name: "typhoid fever", onContract: 0, perDay: -.2, onCure: 1},
	flu: {name: "the flu", onContract: 0, perDay: -.1, onCure: .5},
	brokenBone: {name: "a broken bone", onContract: 0, perDay: -.05, onCure: .2},
	cholera: {name: "cholera", onContract: 0, perDay: -.1, onCure: 1.2},
	measles: {name: "the measles", onContract: 0, perDay: -.15, onCure: 1},
	dysentery: {name: "dysentery", onContract: 0, perDay: -.05, onCure: .2},
	fever: {name: "a fever", onContract: 0, perDay: -.1, onCure: 2},
};

const occupations = {
	banker: {start: 1600, score: 1},
	carpenter: {start: 800, score: 2},
	farmer: {start: 400, score: 3}
};

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

const itemNames = {
	money: ["a dollar", "dollars"],
	oxen: ["an ox", "oxen"],
	clothSets: ["a set of clothes", "sets of clothes"],
	worms: ["a worm", "worms"],
	wheels: ["a wagon wheel", "wagon wheels"],
	axles: ["a wagon axle", "wagon axles"],
	tongues: ["a wagon tongue", "wagon tongues"],
	food: ["a pound of food", "pounds of food"]
}

const wagonParts = {
	wheels: "wheel",
	axles: "axle",
	tongues: "tongue"
}

// Returns a description of amount of items (plural or singular)
function getItemDescription(name, amount) {
	return (amount === 1 ? itemNames[name][0] : `${amount} ${itemNames[name][1]}`)
}

class Supplies {
	constructor() {
		this.money = 0;
		this.oxen = 0;
		this.clothSets = 0;
		this.worms = 0;
		this.wheels = 0;
		this.axles = 0;
		this.tongues = 0;
		this.food = 0;
	}

	decrementFood(change) {
		if (this.food - change > 0) {
			this.food -= change;
		}
		else {
			this.food = 0;
		}
	}

	noFood() {
		return this.food === 0;
	}
}

class Weather{
	constructor() {
		this.season = 0;
		this.daily = 'warm';
		this.currentHealth = 0.00;
		this.riverDepth = 0.0;
	}

	updateWeather() { // should update the values
		let currentMonth = party.date.getMonth();
		let random = Math.floor(Math.random() * 100);
		if ((currentMonth <= 1) || (currentMonth === 11)) { // winter
			this.season = 1;
			if (random <= 55) {
				this.daily = "snowing";
				this.currentHealth = .03; // snowing/hot weather is bad to travel in
				this.riverDepth += .4 * days;
			}
			else if (random > 55 && random <= 75) {
				this.daily = "cold";
				this.currentHealth = .02;// traveling when raining reduces health by a little
			}
			else if ( random >75 && random <= 85 ) {
				this.daily = "raining";
				this.currentHealth = .01;
				this.riverDepth += .2 * days;
			}
			else if ( random > 85 ) {
				this.daily = "cool";
				this.currentHealth = .02;

			}
		}
		else if ((currentMonth >= 5) && (currentMonth <= 7)) { // summer
			this.season = 2;

			if (random <= 75) {
				this.daily = "hot";
				this.currentHealth = .03;
				this.riverDepth -= .3 * days ;
			}
			else if (random > 75 && random <= 90) {
				this.daily = "warm";
				this.currentHealth = .04;//rm weather is beneficial for health
				this.riverDepth -= .1 * days;
			}
			else if ( random > 90 ) {
				this.daily = "raining";
				this.currentHealth = .01;
				this.riverDepth += .2 * days;
			}
		}
		else if ((currentMonth >= 8 && currentMonth <= 10) || (currentMonth >= 2 && currentMonth <= 4 )) { // spring/fall
			this.season = 3;

			if (random <= 65) {
				this.daily = "warm";
				this.currentHealth = .04;
				this.riverDepth -= .1 * days;
			}
			else if (random > 65 && random <= 90) {
				this.daily = "raining";
				this.currentHealth = .01;
				this.riverDepth += .2 * days;
			}
			else if ( random > 90 ) {
				this.daily = "hot";
				this.currentHealth = .03;
				this.riverDepth -= .3 * days ;
			}
		}
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

// Keeps track of miles traveled, possible paths, and landmarks you'll encounter.
class Locations {
	constructor() {
		this.miles = 0;
		this.fortsPassed = 0;
		this.landmarksQueue = [];
		this.atShop = true;
		this.shopName = "Matt's General Store - Independence, Missouri";
		this.nextLandMark = landmarks[0].name;
		this.initialDistance = landmarks[0].distance;
	}

	//update our location based on landmarkObjects
	update() {
		let landmark = landmarks[party.landmarkIndex];
		if (landmarks[++party.landmarkIndex]) {
			party.milesToNextMark = landmarks[party.landmarkIndex].distance;
			this.nextLandMark = landmarks[party.landmarkIndex].name;
			this.initialDistance = landmarks[party.landmarkIndex].distance;
		}
		if (landmark.generateState) {
			states.push(landmark.generateState());
		}
		else {
			states.push(new ContinueState("Error: This landmark doesn't have a defined state yet."));
		}
	}

	generateFort(fortName, description) {
		this.setShop(fortName);
		return new ContinueState(`Arriving at ${fortName} <hr> ${description} <hr>`, null, ()=> {states.pop("gameMenu")});
	}

	generateContinue(name, description) {
		return new ContinueState(`Arriving at ${name} <hr> ${description} <hr>`, null, ()=> {states.pop("gameMenu")});
	}

	generateSplit(name, description, splitOptions) {
		return new ContinueState(`Arriving at ${name} <hr> ${description} <hr>`, null, () => {states.push(new MenuState(splitOptions.description, splitOptions.choices))});
	}

	generateRiver(name, description, riverOptions) {
		return new ContinueState(`Arriving at ${name} <hr> ${description} <hr>`, null, () => {states.push(new RiverState(riverOptions.depth, riverOptions.width, riverOptions.canFerry, riverOptions.canIndian))});
	}

	get score() {
		const itemPoints = {
			money: 0.2,
			oxen: 4,
			clothSets: 2,
			worms: 0.02,
			wheels: 2,
			axles: 2,
			tongues: 2,
			food: 0.04,
		}

		// Take less than 100 days and get a bonus of 10 points per day under
		let dayBonus = Math.max(0, 100 - party.daysPassed) * 10

		// Remaining supplies gives you a score bonus
		let suppliesBonus = 50
		Object.keys(itemPoints).forEach(item => {
			suppliesBonus += party.supplies[item] * itemPoints[item]
		})

		// Surviving members (depending on health)
		let partyBonus = 0
		party.members.forEach(member => {
			partyBonus += member.health * 100
		})

		const total = dayBonus + suppliesBonus + partyBonus
		return Math.round(party.scoreModifier * total)
	}

	generateEndGame() {
		const score = this.score;
		return new InputState({
				type: "text",
				description: `Congratulations on making it to Oregon! <br> You made it in ${party.daysPassed} days. Your score is: ${score.toFixed(0)} <br> Enter a name below to submit your highscore and return to the main menu!`,
				valid: input => {
					return (input.length <= 20 && input.length >= 2)
				},
				onSubmit: name => {
					// Submit score to high scores
					server.addScore(name, score, data => {states.pop("mainMenu")});
				}
			});
	}

	setShop(shopName) {
		this.atShop = true;
		this.shopName = shopName;
		this.fortsPassed++;
	}

	canShop() {
		return this.atShop;
	}

	atRiver() {
		return true
	}

	addPath(path) {
		insertArrayAt(landmarks, party.landmarkIndex, path);
		party.milesToNextMark = landmarks[party.landmarkIndex].distance;
		this.nextLandMark = landmarks[party.landmarkIndex].name;
		this.initialDistance = landmarks[party.landmarkIndex].distance;
		states.push(new ContinueState("You Continue Along Your Chosen Path", null, () => states.pop("gameMenu")));
	}
}

let locations = new Locations();
let weather = new Weather();
