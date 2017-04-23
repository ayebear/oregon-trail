// Continue state - Shows general information, lets the user continue, then goes to a new state
class ContinueState extends MenuState {
	constructor(description, nextState, clickedCallback) {
		// If parameters are not specified, make the default action to go back to the last state
		if (!nextState && !clickedCallback) {
			clickedCallback = () => {
				states.pop()
			}
		}

		// Create menu with continue button
		super(description, [
			{text: "Continue", next: nextState, onclick: clickedCallback}
		])
	}
}
