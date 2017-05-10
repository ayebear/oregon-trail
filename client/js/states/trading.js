//let tradeState = temporary(new QuestionState("Would you like to trade one of your party members for 3 pounds of food?", acceptTradeState, declineTradeState))
function tradeSupply(){
		let item = randNonZeroKey(party.supplies);
		let item1 = randNonZeroKey(party.supplies);
		
		while (item == item1){ // not trading the same thing 
			item = randNonZeroKey(party.supplies);
			item1 = randNonZeroKey(party.supplies);
		}

		if ((item1) && (item != item1)){
			let theirItem = 0;
			let yourItem = 0;
			if(item == "food" || item == "worms" || item == "money"){
				theirItem = rand(20,50);
			}
			else{ // oxens // wagon parts // cloth sets 
				theirItem = rand(2,5);
			}
			if(item1 == "food" || item1 == "worms" || item1 == "money"){
				yourItem = rand(20,50);
			}
			else{
				yourItem = rand(2,5);
			}
			
			let plural = (theirItem === 1 ? 0 : 1)
			let description = itemNames[item][plural]

			let yourPlural = (yourItem === 1 ? 0 : 1)
			let yourDesc = itemNames[item1][yourPlural]
			
			let description1 = '';

			if(yourItem > 1){
				if(theirItem > 1){
				description1 = `Bob will trade you ${theirItem} ${description} for ${yourItem} ${yourDesc}`;
			}
				else{
					description1 = `Bob will trade you ${description} for ${yourItem} ${yourDesc}`;
				}
			}
			else{
				if(theirItem > 1){
					description1 = `Bob will trade you ${theirItem} ${description} for ${yourDesc}`;
			}
				else{
					description1 = `Bob will trade you ${description} for ${yourDesc}`;
				}
			}

			if( party.supplies[item1] < yourItem){ // not enough item so it just wastes a day 
				let notDesc = `${description1} , but you do not have enough`;
				party.nextDay();
				states.push(temporary( new ContinueState(notDesc)));
			}
			else {
			
			states.push(temporary(new MenuState(description1, [
				{text: "Accept", onclick: () => { 
				party.supplies[item] += theirItem; 
				party.supplies[item1] -= yourItem;
				party.nextDay(); // trading takes one day 
				states.pop(); }},
				{text: "Decline", onclick: () => { party.nextDay(); states.pop(); }}
				])));
		}
}
}
	
function tradeCheck(){ // checks to see if anyone wants to trade with you 
	let random = Math.floor(Math.random() * 100);
	if(random <= 85){
		tradeSupply();
	}

	else{
		party.nextDay(); // wasted a day 
		states.push(temporary( new ContinueState("No one wanted to trade with you today")));
	}
}