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
const oxenMilesPerDay = 3;

// Pounds and health modifier per day per person
const rationTypes = {
	filling: {pounds: 3, health: 0.1},
	meager: {pounds: 2, health: 0},
	bareBones: {pounds: 1, health: -0.1},
};

const healthArray = ["dying", "very poor", "poor", "fair", "good"];

const diseases = {
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
// changes items to plural/singular
const itemNames = {
	money: ["a dollar", "dollars"],
	oxen: ["an ox", "oxen"],
	clothSets: ["a set of clothes", "sets of clothes"],
	worms: ["a worm", "worms"],
	wheels: ["a wagon wheel", "wagon wheels"],
	axles: ["a wagon axle", "wagon axles"],
	tongues: ["a wagon tongue", "wagon tongues"],
	food: ["a pound of food", "pounds of food"]
};
// used for random events that a wagon part is broken
const wagonParts = {
	wheels: "wheel",
	axles: "axle",
	tongues: "tongue"
};

// Returns a description of amount of items (plural or singular)
function getItemDescription(name, amount) {
	return (amount === 1 ? itemNames[name][0] : `${amount} ${itemNames[name][1]}`);
}
