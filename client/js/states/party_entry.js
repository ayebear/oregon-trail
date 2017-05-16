
// asks user to input name of the group
// default values will appear instead if no/not enough values are entered
class PartyEntryState extends ContinueState {
	constructor(nextState) {
		super("Enter The Names of your Party Members Below", nextState, () => {
			this.submit();
		});
	}

	submit() {
		let inputBoxes = $(".inputBox");
		let names = ["Lupoli", "Cory", "Tez", "Eric", "Quang"]; // default value if user does not enter names
		inputBoxes.each((i, element) =>{
			if ($(element).val()) {
				names[i] = $(element).val();
			}
		});
		party.members = names;
	}

	display() {

		super.display();

		let input = $("<input/>")
			.attr("class", "menu inputBox")
			.attr("type", "text");

		// up to 5 party members can be added
		for (let i = 0; i < 5; i++) {
			$("#description").append(input.clone())
		}
	}
}
