// Continue state - Shows general information, lets the user continue, then goes to a new state
class TravelingState {
	constructor() {
		this.timerId = null;
	}

	updateMap() {
		let mapWidth = this.mapBarElement.width();
		let wagonPosition = mapWidth * (party.milesToNextMark / locations.initialDistance);
		this.wagonElement.css({
			'left': wagonPosition,
		});
		let landmark = landmarks[party.landmarkIndex];
		if (landmark) {
			this.nextMarkElement.html(`
					<figure>
						<img src="./data/images/${landmarks[party.landmarkIndex].type}.png" height="60px" width="60px"/>
						<figcaption>${landmarks[party.landmarkIndex].name}</figcaption>
		   			</figure>`

			)
		}
	}

	updateDisplay() {
		this.nextMarkerElement.text(`Next Landmark: ${party.milesToNextMark}`);
		this.traveledElement.text(`Miles Traveled: ${party.milesTraveled}`);
		this.dateElement.text(`${party.date.toDateString()}`);
		this.weatherElement.text(`It is currently ${weather.daily}`);
	}

	display() {
		this.root.append(`<h3>Traveling on the trail</h3>`);
		this.root.append(`<div id="menu" class="menu">
							<div id ="mapBar">
								<div class="mapBarContainer" id = "nextMark"></div>
								<div class="mapBarContainer" id = "wagon"><img src="./data/images/wagon.png" height="60px" width="60px"/></div>
							</div>
							<div id = "date">${party.date.toDateString()}</div>
							<div id = "weather">It is currently ${weather.daily}</div>
							<div id = "nextLandMark">Next Landmark: ${locations.nextLandMark}</div>
							<div id = "milesTraveled">Miles Traveled: ${party.milesTraveled}</div>
							<div id = "milesToNextMark">Miles to Next Landmark: ${party.milesToNextMark}</div>
							<div id = "broken"></div>
							</div>`);

		let button = $("<button/>")
			.text("Size up the Situation")
			.click(() => {
				states.pop();
			})
		$("#menu").append(button);

		this.traveledElement = $("#milesTraveled");
		this.nextMarkerElement = $("#milesToNextMark");
		this.dateElement = $("#date");
		this.weatherElement = $("#weather");
		this.brokenElement = $("#broken");
		this.mapBarElement = $("#mapBar");
		this.wagonElement = $("#wagon");
		this.nextMarkElement = $("#nextMark");

		if (party.brokenPart) {
			this.brokenElement.text(`You need to find a spare wagon ${wagonParts[party.brokenPart]} for your wagon!`);
		}
		else {
			this.brokenElement.text("");
		}

		this.updateMap();
	}

	onEnter() {
		// Must have a fully working wagon and at least one oxen to move
		if (!party.brokenPart && party.supplies.oxen >= 1) {
			this.requestTick();
		}
	}

	onExit() {
		clearTimeout(this.timerId);
	}

	requestTick() {
		this.timerId = setTimeout(() => {this.tick()}, 1250);
	}

	decide(newLandmark, summaryString) {
		// Display any events that occurred along the trail
		if (party.members.size === 0) {
			// Game over, everyone died
			const description = `Everyone in your wagon has died. <br> You covered ${party.milesTraveled} miles in ${dateDiffInDays(party.startDate, party.date)} days.`;
			states.push(new ContinueState(summaryString, null, () => {
				states.push(new ContinueState(description, null, () => {
					states.pop("mainMenu");
				}));
			}));
		}
		else if (summaryString.length && newLandmark) {
			// Show new health information, then go to next landmark state
			states.push(new ContinueState(summaryString), null, () => {locations.update()});
		}
		else if (summaryString.length) {
			// Show new health information
			states.push(new ContinueState(summaryString));
		}
		else if (newLandmark) {
			// Go to next landmark state
			locations.update();
		}
		else if (rand(0, 100) < 10) {
			// 10% chance of a random event occurring
			randomEvents.select();
		}
		else {
			// Continue traveling
			this.requestTick();
		}
	}

	tick() {
		// Increment miles based on pace
		const newLandmark = party.incrementMiles();

		// Use up food while traveling
		party.decrementFood();

		// Randomize the daily weather
		weather.updateWeather();

		// Update party members' health values, also apply/remove diseases
		const summaryString = party.updateHealth();

		// Increment date
		party.nextDay();

		// Update map animation and display information
		this.updateMap();
		this.updateDisplay();

		// Show another state, or continue traveling
		this.decide(newLandmark, summaryString)
	}
}
