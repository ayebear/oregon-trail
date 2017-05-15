// Continue state - Shows general information, lets the user continue, then goes to a new state
class TravelingState{
	constructor(){
		this.timerId = null;
		this.traveledElement = null;
		this.nextMarkerElement = null;
	}

	updateMap(){
		let mapWidth = this.mapBarElement.width();
		let wagonPosition = mapWidth * (party.milesToNextMark / locations.initialDistance);
		this.wagonElement.css({
			'left': wagonPosition,
		});
		let landmark = landmarks[party.landmarkIndex];
		if (landmark){
			this.nextMarkElement.html(`
					<figure>
						<img src="./data/images/${landmarks[party.landmarkIndex].type}.png" height="60px" width="60px"/>
						<figcaption>${landmarks[party.landmarkIndex].name}</figcaption>
		   			</figure>`

			)
		}
	}

	display(){
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

		// reminds user what needs to be repaired
		if( party.wWheel == false || party.wAxle == false || party.wTongue == false){
			if(party.wWheel == false){
			this.brokenElement.text(`You need to find a spare wheel for your wagon!`);
			}
			else if(party.wAxle == false){
				this.brokenElement.text(`You need to find a spare axle for your wagon!`);
			}
			else if(party.wTongue == false){
				this.brokenElement.text(`You need to find a spare tongue for your wagon!`);
			}
		}
		else if(party.wWheel == true && party.wAxle == true && party.wTongue == true){
			this.brokenElement.text(""); // resets
		}

		this.updateMap();
	}

	onEnter(){

		if(party.wWheel == true && party.wAxle == true && party.wTongue == true && party.supplies.oxen >= 1){// all 3 needs to be true to be able to move
			this.requestTick();
		}
	}

	onExit(){
		clearTimeout(this.timerId);
	}

	requestTick(){
			this.timerId = setTimeout(() => {this.tick()}, 1000);
	}


	tick(){

		let newLandmark = false;
		let summaryString = "";
		const debug = false;

		function decFood(){
			party.supplies.decrementFood(party.rationsValue.pounds * party.paceValue.food *party.members.size);
		}

		//returns true if we hit a new landmark
		function incMiles(){
			party.incrementMiles(party.paceValue.speed * Math.min(party.supplies.oxen, 9) * oxenMilesPerDay, () => {
				newLandmark = true;
			});
		}

		function updateHealth(){
			//net health change for entire party
			let partyChange = party.paceValue.health + party.rationsValue.health + weather.currentHealth;

			//update based on food/rations
			if (party.supplies.noFood())
				partyChange += noFoodChange;
			//go through partyMembers, apply health change based on diseases + base party change
			for(let partyMember of party.partyMembers) {

				let value = rand(-partyChange * 10, 100);
				if (value > 98.5){
					let diseaseAdded = partyMember.addRandomDisease();
					if (diseaseAdded){
						summaryString += `<h4>${partyMember.name} has ${diseaseAdded}</h4>`
					}
				}
				if (partyMember.hasDisease() && value < 10) {
					let diseaseRemoved = partyMember.removeRandomDisease();
					summaryString += `<h4>${partyMember.name} no longer has ${diseaseRemoved}</h4>`
				}



				partyMember.updateDailyHealth(partyChange, () => {
					summaryString += `<h4> ${partyMember.name} has died </h4>`;

					//This killed the partyMember, remove them from the set
					party.partyMembers.delete(partyMember);
				});
			}



		}

		let random = Math.floor(Math.random() * 100);

		//increment miles based on pace
		//if we hit a new landmark when incrementing miles
		incMiles();
		decFood(); 	//lower food based on rations
		//weather.updateSeason(); // checks month
		weather.updateWeather(); // gives daily weather
		updateHealth();

		// Increment Date
		party.nextDay();

		this.updateMap();

		this.nextMarkerElement.text(`Next Landmark: ${party.milesToNextMark}`);
		this.traveledElement.text(`Miles Traveled: ${party.milesTraveled}`);
		this.dateElement.text(`${party.date.toDateString()}`);
		this.weatherElement.text(`It is currently ${weather.daily}`);
		if (debug){
			console.log("---------------------");
			console.log("Date: " + party.date.toString());
			console.log("Miles Traveled : " + party.milesTraveled);
			console.log("Food Rations: " + party.supplies.food);
			for(let partyMember of party.partyMembers){
				console.log(`${partyMember.name} has health of ${partyMember.health}`);
			}
			console.log("---------------------");
		}

		// Display any events that occurred along the trail
		if (party.members.size === 0){
			//everyone died
			states.push(new ContinueState(summaryString, null, () => {
				states.push(new InputState({
					type: "text",
					description: `Everyone in your wagon has died. <br> You covered ${party.milesTraveled} miles in ${dateDiffInDays(party.startDate, party.date)} days. <br> Enter a name below to submit your highscore and play again!!`,
					valid: (input) => {
						return (input.length <= 20 && input.length >= 2)
					},
					onSubmit: (value) => {
						//Do Something Here Related to Submitting the score to the DataBase
						states.pop("mainMenu");
					}
				}))
			}));
		}
		else if (summaryString.length && newLandmark){
			states.push(new ContinueState(summaryString), null, () => {locations.update()});
		}
		else if (summaryString.length){
			states.push(new ContinueState(summaryString));
		}
		else if (newLandmark){
			locations.update();
		}
		else if(random <= 10){ // can change this to debug
			randomEvents.select();

		}

		else {
				this.requestTick();



	}
	}
}
