//Main game runtime

let party = undefined;
let states = undefined;
const debug = true;


$(document).ready(function() {

	// Run unit tests (can disable for release)
	runTests();

	// Create global instance for the party
	party = new Party();

	// Create state stack with initial main menu state and "game" DOM element
	states = new StateStack(mainMenu, "#game");

});
