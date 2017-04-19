//Main game runtime

let states = undefined;
const debug = true;

function tick(){
    const foodPerRations = 5;
    const milesPerPace = 10;


	const noFoodChange = -.2;
	const lowRationsChange = -.1;
	const highRationsChange = .1;

	const highPaceChange = -.1;
    const lowPaceChange = .1;

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
    	for(let partyMember of party.partyMembers){

			partyMember.updateDailyHealth(partyChange, function(){
				//This killed the partyMember, remove them from our array
				let index = party.partyMembers.indexOf(partyMember);
				party.partyMembers.splice(index, 1);

                //TODO call a continue state displaying they died
                console.log(`This change killed ${partyMember.name}`);
            })
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
}



$(document).ready(function() {

	// Run unit tests (can disable for release)
	runTests();

	//Initalize our party
	//TODO we'll let the user do this later
	let tokenLeader = new PartyMember("Token Leader", true);
	let eric = new PartyMember("Eric", false);
	let quang = new PartyMember("Quang", false);
	let cory = new PartyMember("Cory", false);
	let tez = new PartyMember("Tez", false);
	let theirSupplies = new Supplies(10000);
	party = new Party([tokenLeader, eric, quang, cory, tez], theirSupplies, new Date(1848, 8));

	if (debug){
        eric.diseases.push("typhoid");
        party.supplies.food = 1000000000;

        setInterval(function(){
            tick();
        }, 1000);
	}


	// Create state stack with initial main menu state and "game" DOM element
	states = new StateStack(mainMenu, "#game");

});
