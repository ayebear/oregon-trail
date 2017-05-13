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
                            {name: "Green River", distance: 57, generateState: () => {return locations.generateRiver("The Green River", `The Green River is a tributary to the Colorado River, flowing south from the
								Continental Divide along a twisted, rugged path.  It's estimated to be more
								than 700 miles in length.  It's navigable only at high water, and even then
								it's extremely dangerous.  But you must cross it before proceeding west on the
								Oregon Trail, so be very careful.`, {depth: 30, width: 15, canFerry: true, canIndian: false})}},
                            {name: "Soda Springs", distance: 144, generateState: () => {return locations.generateContinue("Soda Springs", `Soda Springs is an important landmark and stopping-off point along the trail.
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
                            {name: "Fort Bridger", distance: 125, generateState: () => {return locations.generateFort("Fort Bridger", `Fort Bridger is a U.S. army outpost, although it was founded in 1843 by fur
								trader and scout Jim Bridger as a trading post and way station.  It's an
								important stop along the Oregon Trail, where travelers can rest, buy supplies,
								and obtain information about the next stretch of the journey.  A little over
								100 miles to the southwest is the recent Mormon settlement of Salt Lake City.`)}},
                            {name: "Soda Springs", distance: 162, generateState: () => {return locations.generateContinue("Soda Springs", `Soda Springs is an important landmark and stopping-off point along the trail.
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
                            {name: "The Dalles", distance: 125, generateState: () => {return locations.generateSplit("The Dalles", `The Dalles is the chief embarkation point for rafts heading down the Columbia
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
                            {name: "Fort Walla", distance: 55, generateState: () => {return locations.generateFort("Fort Walla", `Fort Walla Walla was established in 1818 as a fur-trading post at the juncture
								of the Columbia and Walla Walla Rivers.  It later became a military fort.
								Marcus Whitman worked as a medical missionary nearby from 1836 to 1847.  Walla
								Walla is the name of an American Indian tribe living in the region.  The Walla
								Wallas are close related to and allied with the Umatila.`)}},
                            {name: "The Dalles", distance: 120, generateState: () => {return locations.generateSplit("The Dalles", `The Dalles is the chief embarkation point for rafts heading down the Columbia
								River toward the Willamette Valley.  It was named by French fur-trappers, who
								likened the deep, stony river gorge to a huge gutter.  (In French, the word
								'dalles' can refer to 'gutters' or 'flagstones.') Emigrants to Oregon often
								stop here to rest and trade before rafting down the Columbia.`, splitPaths.theDalles)}}                        ]
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
                            {name: "The End", distance: 200, generateState: () => {return locations.generateEndGame()}}
                        ]
                    )
                }
            },
            {
                text: "Cross through the Columbia River",
                onclick: () => {
                    locations.addPath(
                        [
                            {name: "The Columbia River", distance: 50, generateState: () => {return locations.generateRiver("The Columbia River", `The Columbia river is the largets, most imprtant river in the Northwest.  It
								starts up in Canada and passes through the Oregon Territory, flowing more than
								1,000 miles to the Pacific Ocean.  It has cut a deep gorge through the rugged
								Oregon countryside.  It also has many rapids, making navigation difficult.
								Rafting down the Columbia can be very dangerous!`, {depth: 20, width: 15, canFerry: false, canIndian: true})}},
                            {name: "The End", distance: 20, generateState:() => {return locations.generateEndGame()}}
                        ]
                    )
                }
            }
        ]
    }

};


landmarks = [
    {name: "Kansas River Crossing", distance: 102,  generateState: () => {return locations.generateRiver("Kansas River Crossing", `The Kansas River is a tributary to the Missouri.  It is approximately 170
		miles long.  Its width and depth vary depending on the recent amount of snow
		melt.  Where the Oregon Trail crosses the Kansas River, the average width is
		620 feet and the usual depth in the middle is about 4 feet.  But be sure to
		check the conditions when you get there.`, {depth: 12, width: 15, canFerry: true, canIndian: false })}},
	{name: "The Big Blue River Crossing", distance: 83,  generateState: () => {return locations.generateRiver("Big Blue River Crossing", `The Big Blue River is a tributary to the Kansas River, which is in turn a
		tributary to the Missouri.  It's approximately 300 miles long.  Farther to the
		south and west is the Little Blue River, which links up with the Big Blue at
		Blue Rapids.  You'll cross the Big Blue north of the rapids, allowing you to
		avoid the Little Blue River altogether`, {depth: 12, width: 18, canFerry: false, canIndian: false })}},
	{name: "Fort Kearney", distance: 119, generateState: () => {return locations.generateFort("Fort Kearney", `Fort Kearney is a U.S. Army post established in 1848 near the Platte River.
		It garrisons cavalry troops who protect settlers and travelers along the Oregon
    	Trail.  It was named for Gen. Stephen Kearny (often spelled 'Kearney'), who
		died in 1848 after helping establish law and order in the region and serving in
		the Mexican War`)}},
	{name: "Chimney Rock", distance: 250, generateState: () => {return locations.generateContinue("Chimney Rock", `Chimney Rock is an important landmark on the Oregon Trail.  It's a spectacular
		natural formation of solid rock and can be seen from miles around.  In fact,
		you can see it for a whole day as you approach it and another whole day as you
		leave it behind.  If you don't see it at all within a week or so after leaving
		Fort Kearney, you've probably strayed too far off the trail.`)}},
    {name: "South Pass", distance: 102, generateState: () => {return locations.generateSplit("The South Path", `South Pass is a valley that cuts through the Rocky Mountains at their highest
		point, the Continental Divide.  It marks the halfway point on your journey to
		Oregon.  After South Pass, the trail splits.  If you're short on supplies, you
		should head to Fort Bridger.  But if you don't need supplies, you may want to
		take the shorter route and go directly to the Green River.`, splitPaths.southPath)}},
    {name: "Fort Laramie", distance: 86, generateState: () => {return locations.generateFort("Fort Laramie", `Fort Laramie is a US Army post near the junction of the North Platte and
		Laramie Rivers.  Originally called Fort William, it was founded as a
		fur-trading post in 1834.  It was renamed for Jacques Laramie, a French trapper
		who worked in the region earlier in the century.  Fort Laramie is an important
		stop for resting and getting supplies along the trail.`)}},
	{name: "Independence Rock", distance: 190, generateState: () => {return locations.generateContinue("Independence Rock", `Independence Rock is an important landmark and resting place along the Oregon
		Trail. It's a large natural formation, almost 200 feet tall, made of soft stone
		into which many travelers and traders have carved their names, initials, or
		brief messages.  It gets its name from the fact that, in order to stay on
		schedule, travelers try to reach it no later than July 4--Independence Day`)}},
	{name: "Fort Hall", distance: 57, generateState: () => {return locations.generateFort("Fort Hall", `Fort Hall is an outpost on the banks of the Snake River.  It was originally a
		fur-trading post, founded by Nathaniel Wyeth in 1834.  Later it was bought by
		the Hudson's Bay Company.  Ever since it has served as an important stop along
		the Oregon Trail, where emigrants can rest and buy supplies.  Some travelers
		turn southwest at this point and head for California.`)}},
	{name: "Snake River Crossing", distance: 182, generateState: () => {return locations.generateRiver("The Snake River Crossing", `After leaving Fort Hall, the trail follows the Snake River for hundreds of
		miles.  The Snake River gets its name from the way it twists and turns through
		this ruffed country, sometimes through steep gorges.  But the trail is fairly
		flat (through dry and desolate) near the river, which makes wagon travel
		possible.  Crossing the Snake River, however, can be dangerous.`, {depth: 20, width: 15, canFerry: false, canIndian: true })}},
	{name: "Fort Boise", distance: 114, generateState: () => {return locations.generateFort("Fort Boise", `Fort Boise was built by the Hudson's Bay Company in 1834 as a fur-trading
		outpost.  Its name comes from the French word "boise," meaning "wooded."
		That's because there are lots of trees here, unlike the dry region of the Snake
		River Plain to the east.  An important stop on the Oregon Trail, it stands on
		the banks of the Boise River, a tributary to the Snake River.`)}},
    {name: "The Grand Ronde", distance: 160, generateState: () => {return locations.generateSplit("The Grand Ronde", `The Grand Ronde (French for 'great ring') is a river that runs roughly
		parallel to the Blue Mountains.  The Oregon Trail crosses through the Grande
		Ronde river valley just before the mountains.  The Grande Ronde valley is noted
		for its beauty and is greatly appreciated by emigrants as a sign that their
		long journey is nearing its end.`, splitPaths.grandRonde)}},
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
	wheels: ["a wagon wheel", "wagon wheels"],
	axles: ["a wagon axle", "wagon axles"],
	tongues: ["a wagon tongue", "wagon tongues"],
	food: ["a pound of food", "pounds of food"]
}

// Returns a description of amount of items (plural or singular)
function getItemDescription(name, amount) {
	return (amount === 1 ? itemNames[name][0] : `${amount} ${itemNames[name][1]}`)
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
		this.season = 0;
		this.daily = 'warm';
		this.currentHealth = 0.00;
	}

	updateWeather(){ // should update the values 
		let currentMonth = party.date.getMonth();
		let random = Math.floor(Math.random() * 100);
		if((currentMonth <= 1) || (currentMonth === 11)){ // winter
			//var random = Math.floor(Math.random() * 100);
			
			if(random <= 55){
				this.daily = "snowing";
				this.currentHealth = .03; // snowing/hot weather is bad to travel in
			}
			
			else if(random > 55 && random <= 75){
				this.daily = "cold";
				this.currentHealth = .02;// traveling when raining reduces health by a little
			}
			else if( random >75 && random <= 85 ){
				this.daily = "raining";
				this.currentHealth = .01;
			}
			else if( random > 85 ){
				this.daily = "cool";
				this.currentHealth = .02;
			}
		}
	
		else if((currentMonth >= 5) && (currentMonth <= 7)){ // summer
			//let random = Math.floor(Math.random() * 100);
			if(random <= 75){
				this.daily = "hot";
				this.currentHealth = .03;
			}
			else if(random > 75 && random <= 90){
				this.daily = "warm";
				this.currentHealth = .04;//rm weather is beneficial for health
			}
			else if( random > 90 ){
				this.daily = "raining";
				this.currentHealth = .01;
			}
		}
		else if((currentMonth >= 8 && currentMonth <= 10) || (currentMonth >= 2 && currentMonth <= 4 )){ // spring/ fall
			//let random = Math.floor(Math.random() * 100);
			if(random <= 65){
				this.daily = "warm";
				this.currentHealth = .04;
			}
			else if(random > 65 && random <= 90){
				this.daily = "raining";
				this.currentHealth = .01;
			}
			else if( random > 90 ){
				this.daily = "hot";
				this.currentHealth = .03;
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
		this.startDate = new Date(date);
		weather.updateWeather();
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
		let j = 0;
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

	generateFort(fortName, description){
		this.setShop(fortName);
		return new ContinueState(`Arriving at ${fortName} <hr> ${description} <hr>`, null, ()=> {states.pop("gameMenu")});
	}

	generateContinue(name, description){
        return new ContinueState(`Arriving at ${name} <hr> ${description} <hr>`, null, ()=> {states.pop("gameMenu")});
	}

	generateSplit(name, description, splitOptions){
        return new ContinueState(`Arriving at ${name} <hr> ${description} <hr>`, null, () => {states.push(new MenuState(splitOptions.description, splitOptions.choices))});
    }

    generateRiver(name, description, riverOptions){
        return new ContinueState(`Arriving at ${name} <hr> ${description} <hr>`, null, () => {states.push(new RiverState(riverOptions.depth, riverOptions.width, riverOptions.canFerry, riverOptions.canIndian))});
    }

	generateEndGame(){
		return new InputState({
                type: "text",
                description: `Congragulations on making it to Oregon! <br> You made it in ${dateDiffInDays(party.startDate, party.date)} days. <br> Enter a name below to submit your highscore and return to the main menu!`,
                valid: (input) => {
                    return (input.length <= 20 && input.length >= 2)
                },
                onSubmit: (value) => {
                    //Do Something Here Related to Submitting the score to the DataBase
                    states.pop("mainMenu");
                }
            });
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
let weather = new Weather();
