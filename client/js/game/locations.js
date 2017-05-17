// Keeps track of miles traveled, possible paths, and landmarks you'll encounter.
class Locations {
	constructor() {
		this.riversPassed = 0;
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
		this.riversPassed += 1;
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
