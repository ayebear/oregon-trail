
// randomly gets amount of selected item 
function getItemAmount(item) {
	// TODO: Maybe base values on actual store prices?
	if (item == "food" || item == "worms"){ 
		return rand(20, 50);
	}
	else if (item == "money") {
		return rand(100,150);
	}

	else{ // oxens // wagon parts // cloth sets
		return rand(2, 4);
	}
}


function tradeSupply() {
	// Pick an item you actually have
	const yourItem = randNonZeroKey(party.supplies);

	// Pick any item, except for the one picked from the player
	const theirItem = randValue(Object.keys(party.supplies).filter(val => val !== yourItem));

	if (yourItem && theirItem) {
		// Get a random person name, get random item amounts, and make descriptions from them
		const person = randomPerson();
		const theirAmount = getItemAmount(theirItem);
		const yourAmount = getItemAmount(yourItem);
		const theirDescription = getItemDescription(theirItem, theirAmount);
		const yourDescription = getItemDescription(yourItem, yourAmount);
		var str1= "<br><br> <img src='./data/images/tradingScreen.png' width=543px height=307px "

		// Show trade to player, or just show that they don't have enough
		if (party.supplies[yourItem] < yourAmount) {
			// Waste a day if the player doesn't have enough
			let description = `${person} wanted to trade you ${theirDescription} for ${yourDescription}, but you did not have enough. ${str1}`;
			states.push(temporary(new ContinueState(description)));
		}
		else {
			// Get trade description
			let description = `${person} will trade you ${theirDescription} for ${yourDescription}. ${str1}`;

			// Show trade to player, when they accept then make the trade
			states.push(temporary(new MenuState(description, [
				{text: "Accept", onclick: () => {
					// Accept their item(s)
					party.supplies[theirItem] += theirAmount;

					// Give them your item(s)
					party.supplies[yourItem] -= yourAmount;

					states.pop();
				}},
				{text: "Decline", onclick: () => { party.nextDay(); states.pop(); }}
			])));
		}
	}
}

function tradeCheck() { // checks to see if anyone wants to trade with you
	let random = Math.floor(Math.random() * 100);
	// 85% change that people will want to trade with you 
	if (random <= 85) {

		// Trading takes one day
		party.nextDay();
		party.decrementRestFood(1); // dec food
		tradeSupply();
	}
	else {
		party.nextDay(); // wasted a day
		// dec food 
		party.decrementRestFood(2);// scaled more because you are sad that no one wanted to trade with you
		states.push(temporary(new ContinueState("No one wanted to trade with you today")));
	}
}
