// Continue state - Shows general information, lets the user continue, then goes to a new state
class ContinueState extends MenuState {
	constructor(description, nextState, clickedCallback) {
		super(description, [
			{text: "Continue", next: nextState, onclick: clickedCallback}
		])
	}
}
