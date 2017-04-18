//Main game runtime

let states = undefined;

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
	party = new Party([tokenLeader, eric, quang, cory, tez], theirSupplies);

	// Create state stack with initial main menu state and "game" DOM element
	states = new StateStack(mainMenu, "#game");

});
