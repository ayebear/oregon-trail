// Continue state - Shows general information, lets the user continue, then goes to a new state
class TravelingState{
	constructor(){
		this.interval = null;
	}


	// if (debug){
	//     eric.diseases.push("typhoid");
	//     party.supplies.food = 1000000000;
	//
	//     setInterval(function(){
	//         tick();
	//     }, 1000);
	// }

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
        this.interval = setInterval(() => {this.tick()}, 1000);
	}

	onExit(){
        clearInterval(this.interval);
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

                partyMember.updateDailyHealth(partyChange, function (){
                    //This killed the partyMember, remove them from our array
                    let index = party.partyMembers.indexOf(partyMember);
                    party.partyMembers.splice(index, 1);
                    summaryString += `<h4> ${partyMember.name} has died </h4>`
                });
            }



		}

		//Increment Date;
		party.date.setDate(party.date.getDate() + 1);

		decFood(); 	//lower food based on rations
		incMiles(); //increment miles based on pace
		updateHealth();


		if (summaryString.length){

            states.push(new ContinueState(summaryString, undefined, () => {states.pop()}));
        }

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
	}
}