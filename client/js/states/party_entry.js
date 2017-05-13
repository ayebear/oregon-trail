class PartyEntryState extends ContinueState {
    constructor(nextState) {
    	super("Enter The Names of your Party Members Below", nextState, () => {
    		this.submit();
		});
	}

    submit() {
		let inputBoxes = $(".inputBox");
		let names = ["Lupoli", "Cory", "Tez", "Eric", "Quang"];
		inputBoxes.each((i, element) =>{
			if ($(element).val()){
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


        for (let i = 0; i < 5; i++){
        	$("#description").append(input.clone())
        }
	}
}
