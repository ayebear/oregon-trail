//Main game runtime

let activeChoice = null;

//make this global, might be nessecary
$(document).ready(function(){

	// Run unit tests (can disable for release)
	runTests()

	function setActiveChoice(choice){
		activeChoice = choice;
		activeChoice.display();
	}

	$inputButton.click(function(){
		let value = $inputField.val();

		//check if valid given validate function
		if (activeChoice.validateInput(value)){

			//if the user had a choice, process this.
			if (activeChoice.options){
				let chosenOption = activeChoice.options[value - 1];
				chosenOption.onChosen();
				setActiveChoice(chosenOption.nextChoice);
			} else {
				activeChoice.onChosen(value);
				setActiveChoice(activeChoice.nextChoice);

			}


		}
	});

	//Initalize our party
	//TODO we'll let the user do this later
	let tokenLeader = new PartyMember("Token Leader", true);
	let eric = new PartyMember("Eric", false);
	let quang = new PartyMember("Quang", false);
	let cory = new PartyMember("Cory", false);
	let tez = new PartyMember("Tez", false);
	let theirSupplies = new Supplies(10000);
	theParty = new Party([tokenLeader, eric, quang, cory, tez], theirSupplies);

	setActiveChoice(exampleBlank);
});



