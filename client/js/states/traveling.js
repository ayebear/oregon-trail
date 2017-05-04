// Continue state - Shows general information, lets the user continue, then goes to a new state
class TravelingState{
	constructor(){
		this.timerId = null;
		this.traveledElement = null;
        this.nextMarkerElement = null;

    }

	display(){
		this.root.append(`<h3>Traveling on the trail</h3>`);
		this.root.append(`<div id="menu" class="menu"><div id = "milesTraveled">Miles Traveled: ${party.milesTraveled}</div><div id = "milesToNextMark">Next Landmark: ${party.milesToNextMark}</div></div>`);

        let button = $("<button/>")
			.text("Size up the Situation")
			.click(() => {
				states.pop();
			})
		$("#menu").append(button);

        this.traveledElement = $("#milesTraveled");
        this.nextMarkerElement = $("#milesToNextMark");
	}

	onEnter(){
		this.requestTick();
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
		const debug = true;

		function decFood(){
			party.supplies.decrementFood(party.rationsValue.pounds * party.paceValue.food);
		}

		//returns true if we hit a new landmark
		function incMiles(){
			party.incrementMiles(party.paceValue.speed * party.supplies.oxen * oxenMilesPerDay, () => {
				newLandmark = true;
			});
		}

		function updateHealth(){
			//net health change for entire party
			let partyChange = party.paceValue.health + party.rationsValue.health;

			//update based on food/rations
			if (party.supplies.noFood())
				partyChange += noFoodChange;

			//go through partyMembers, apply health change based on diseases + base party change
			for(let partyMember of party.partyMembers) {

				partyMember.updateDailyHealth(partyChange, () => {
					summaryString += `<h4> ${partyMember.name} has died </h4>`

					//This killed the partyMember, remove them from the set
					party.partyMembers.delete(partyMember)
				});
			}



		}



        //increment miles based on pace
        //if we hit a new landmark when incrementing miles
       	incMiles();
		decFood(); 	//lower food based on rations
		updateHealth();

        // Increment Date
        party.nextDay();

        this.nextMarkerElement.text(`Next Landmark: ${party.milesToNextMark}`);
        this.traveledElement.text(`Miles Traveled: ${party.milesTraveled}`);

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
		if (summaryString.length && newLandmark){
			states.push(new ContinueState(summaryString), locations.update);
		}
		else if (summaryString.length){
            states.push(new ContinueState(summaryString));
        }
        else if (newLandmark){
			locations.update();
		}
		else {
        	this.requestTick();
		}
	}

}
