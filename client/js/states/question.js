// Question state - Asks the user yes/no to a question, which can trigger different events/states
class QuestionState extends MenuState {
	constructor(questionText, yesState, noState, yesCallback, noCallback) {
		super(questionText, [
			{text: "Yes", next: yesState, onclick: yesCallback},
			{text: "No", next: noState, onclick: noCallback}
		])
	}
}
