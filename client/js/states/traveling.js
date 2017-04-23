// Continue state - Shows general information, lets the user continue, then goes to a new state
class TravelingState{
	constructor(){
		this.timerId = null;
	}

	display(){
		this.root.append(`<h3>Traveling on the trail</h3>`)
		this.root.append('<div id="menu" class="menu"></div>')

		let button = $("<button/>")
			.text("Size up the Situation")
			.click(() => {
				states.pop();
			})
		$("#menu").append(button);
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


		let summaryString = "";
		const foodPerRations = 5;
		const milesPerPace = 10;


		const noFoodChange = -.2;
		const lowRationsChange = -.1;
		const highRationsChange = .1;

		const highPaceChange = -.1;
		const lowPaceChange = .1;

		const debug = true;

		function decFood(){
			party.supplies.decrementFood(party.rations * foodPerRations);
		}

		function incMiles(){
			let milesTraveled = (party.pace + 1) * milesPerPace;
			party.incrementMiles(milesTraveled);
		}

		function updateHealth(){
			let partyChange = 0; //net change for entire party

			//update based on food/rations
			if (party.supplies.noFood())
				partyChange += noFoodChange;
			else if (party.rations === 1)
				partyChange += lowRationsChange;
			else if (party.rations === 3)
				partyChange += highRationsChange;

			//update based on pace;
			if (party.pace === 1)
				partyChange += lowPaceChange;
			else if (party.pace ===3)
				partyChange += highPaceChange;


			//go through partyMembers, apply health change based on diseases + base party change
			for(let partyMember of party.partyMembers) {

				partyMember.updateDailyHealth(partyChange, () => {
					summaryString += `<h4> ${partyMember.name} has died </h4>`

					//This killed the partyMember, remove them from the set
					party.partyMembers.delete(partyMember)
				});
			}



		}

		//Increment Date;
		party.date.setDate(party.date.getDate() + 1);

		decFood(); 	//lower food based on rations
		incMiles(); //increment miles based on pace
		updateHealth();

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
		if (summaryString.length){
			states.push(new ContinueState(summaryString));
		} else {
			this.requestTick();
		}
	}
}
