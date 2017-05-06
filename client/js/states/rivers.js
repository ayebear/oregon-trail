function failed(){
	var suppliesArray = [party.supplies.oxen, party.supplies.clothSets, party.supplies.worms, 
	party.supplies.wheels, party.supplies.axles, party.supplies.tongues, party.supplies.food];
	var random = Math.floor(Math.random() * suppliesArray.length ) // randomly picks something to lose in the array
	var chosenItem = suppliesArray[random];
	var currentItem;
	var randomItem;

	if( chosenItem >= 1){ // has more than 1 
		if( random == 0){
			currentItem = party.supplies.oxen;
			randomItem = Math.floor(Math.random() * (currentItem - 1)) + 1;	// lose at least one but not all 
			party.supplies.oxen -= randomItem; // updates new supplies
			//let crossingState = new ContinueState("You lost ${randomItem} oxens!");
			states.push(new ContinueState(`You have lost ${randomItem} oxens!`));
		}	
		else if ( random == 1) {
			currentItem = party.supplies.clothSets;
			randomItem = Math.floor(Math.random() * (currentItem - 1)) + 1;
			party.supplies.clothSets -= randomItem;
			//let crossingState = (new ContinueState("You lose ${randomItem} clothSets!"));
			states.push(new ContinueState(`You have lost ${randomItem} sets of clothes!`));
		}
		else if ( random == 2) {
			currentItem = party.supplies.worms;
			randomItem = Math.floor(Math.random() * (currentItem - 1)) + 1;
			party.supplies.worms -= randomItem; 
			//let crossingState = (new ContinueState("You lose ${randomItem} worms!"));
			states.push(new ContinueState(`You have lost ${randomItem} worm bait!`));
		}
		else if ( random == 3) {
			currentItem = party.supplies.wheels;
			randomItem = Math.floor(Math.random() * (currentItem - 1)) + 1;
			party.supplies.clothSets -= randomItem;
			//let crossingState = (new ContinueState("You lose ${randomItem} wheels!"));
			states.push(new ContinueState(`You have lost ${randomItem} sets of clothes!`));
		}
		else if ( random == 4) {
			currentItem = party.supplies.axles;
			randomItem = Math.floor(Math.random() * (currentItem - 1)) + 1;
			party.supplies.clothSets -= randomItem;
			//let crossingState = (new ContinueState("You lose ${randomItem} axles!"));
			states.push(new ContinueState(`You have lost ${randomItem} axles!`));
		}
		else if ( random == 5) {
			currentItem = party.supplies.tongues;
			randomItem = Math.floor(Math.random() * (currentItem - 1)) + 1;
			party.supplies.clothSets -= randomItem;
			//let crossingState = (new ContinueState("You lose ${randomItem} tongues!"));
			states.push(new ContinueState(`You lost ${randomItem} tongues!`));
		}	
		else if ( random == 6) {
			currentItem = party.supplies.food;
			randomItem = Math.floor(Math.random() * (currentItem - 1)) + 1;
			party.supplies.clothSets -= randomItem;
			states.push(new ContinueState(`You lost ${randomItem} pounds of food`));
			
		}
	}
	else {
		failed(); // if there was 0 supplies of that item, it will run again
	}
}
function successCrossing() {
	states.push(new ContinueState("You have safely crossed the river!"));
}

function fordingOption() {
	var x = 3; // need to update later depending on river actual depth 
	var y = 3;

	if(x >= 5){ // water depth is too high 
		failed();
	}
	else if (x <= 1.5){ // water depth is relatively low making it easy 
		successCrossing();
	}
	else if ( x > 1.5 && x < 3){
		var random = Math.floor(Math.random() * 100);
		if(random <= 90){ // 90% chance of success since less water
			successCrossing();
		}	 
		else{
			failed();
		}
	}
	else if ( x >= 3 && x < 5){
		var random = Math.floor(Math.random() * 100);
		if(random <= 75){ // 75 % chance of success
			successCrossing();
		} 
		else{
			failed(); 
		}
	}
} 

function chaulkingOption(){
	var random = Math.floor(Math.random() * 100);
	if(random <= 70){ // 55 % chance of success
		successCrossing();
	} 
	else{
		failed(); 
	}
}
// checks the money 
function ferryMoney(){
	var money = party.supplies.money; // its not recognizing the party money 
	if(money >= 50){
		party.supplies.money -= 50;
		//states.pop();
		states.push( new TravelingState());
		states.push ( ( new ContinueState("You took the ferry for 52300 dollars")));
	}
	else{
		states.push(new ContinueState("You do not have enough money to take the ferry"));
	}
}

// river class is not made yet so i used double quotes 
let riverChoices = temporary ( new MenuState("Weather: cool. <br><br>River width: ${River.width} feet. <br><br>River depth: ${river.depth} feet deep"
		, [
	{text: "Attempt to ford the river", onclick: () => {
		states.push(new TravelingState());
		fordingOption();
	}},
	{text: "Attempt to chaulk the river" , onclick: () => {
		states.push(new TravelingState());
		chaulkingOption(); // << this is done before ^^ 
	}},
	{text: "Buy a ferry ", /*next: ferryState,*/ onclick: () => { // need to check if  < 5 dollar
		//states.push(new TravelingState()); // continues on trail after crossing
		ferryMoney();
	}},
	{text: "Rest", onclick: () => {
		states.push(new restState); // doest work?
	}},
	{text: "Learn about the options", onclick: () => {
		states.push(new ContinueState("Fording: making your oxens swim across the river. Not advised for depths greater than 3 feet <br><br> Chaulking: Seal and Float your wagon across the river <br><br> Ferry: Safest way across a river <br><br> Rest: Rest and see if the river depth will change enough for you to pass"));
	}}
]))