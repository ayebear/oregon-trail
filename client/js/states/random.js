class RandomEvents{
	constructor(){

		this.current = 0;
	}

	select(){

		let rEvent = Math.floor(Math.random() * 3);
		if(rEvent == 0){
			this.thieves();
		}
		else if (rEvent == 1){
			this.brokenWagon();
		}
		else {
			this.wrongPath();
		}
	}

	thieves(){
		const item = randNonZeroKey(party.supplies);
		const amount = getItemAmount(item);
		const itemDescription = getItemDescription(item, amount);
		if(party.supplies[item] >= 1){
			let stolen = rand(1, party.supplies[item]);
			party.supplies[item] -= stolen;
			let description = `A gang of thieves raided your wagon for ${itemDescription}!`;
			states.push(temporary(new ContinueState(description)));
		}
	}

	wrongPath(){

		let daysLost = Math.floor(Math.random() * 5) + 1;
		party.nextDay(daysLost);
		//party.supplies.decrementFood(party.rationsValue.pounds * party.paceValue.food *party.members.size * daysLost);// still lose food based on days resting 
		states.push(temporary(new ContinueState(`You took the wrong path and lost ${daysLost} days`)));
}


	/// user gets option to repair -> if it fails, then it get replaced
	// if user declines repairing - > it gets replaced but a day is not lost
	brokenWagon(){

			let parts = Math.floor(Math.random() * 3); // picks between the three parts of a wagon 
			if(parts == 0){
				let brokenDescription = "You broken a wagon wheel! <br><br> Would you like to repair this?";
				states.push(temporary(new MenuState(brokenDescription, [
				{text: "Accept", onclick: () => {
					party.nextDay();
					// party.supplies.decrementFood(party.rationsValue.pounds * party.paceValue.food *party.members.size);
					this.repairingOption("wheel", 1);///////// checks to see if it can be repaired
					// Repairing takes one day
					}},
				{text: "Decline", onclick: () => {
					party.wWheel = false;
					this.repairingOption("wheel", 0);
				 }}
				])));
				}
			
			else if(parts == 1){
				let brokenDescription = "You broken a wagon axle! <br><br> Would you like to repair this?";
				states.push(temporary(new MenuState(brokenDescription, [
				{text: "Accept", onclick: () => {
					this.repairingOption("axle", 1);
					// Repairing takes one day
					this.party.nextDay();
					//party.supplies.decrementFood(party.rationsValue.pounds * party.paceValue.food *party.members.size);
					}},
				{text: "Decline", onclick: () => {
					party.wAxle = false; // stops the wagon from moving 
					this.repairingOption("axle", 0);
				 	 }}
				])));
				}
			
			
			else{
				let brokenDescription = "You broken a wagon tongue! <br><br> Would you like to repair this?";
				states.push(temporary(new MenuState(brokenDescription, [
				{text: "Accept", onclick: () => {
					this.repairingOption("tongue", 1);
					// Repairing takes one day
					this.party.nextDay();
					//party.supplies.decrementFood(party.rationsValue.pounds * party.paceValue.food *party.members.size);
					}},
				{text: "Decline", onclick: () => {
					party.wTongue = false;
					this.repairingOption("tongue", 0);
				 	 }}
				])));
				}
		}
		
	
	repairingOption(part,optional){
		let repairing = 100; //Math.floor(Math.random() * 100); // small chance
		if(repairing <= 85 && optional == 1){
			states.push(temporary(new ContinueState(`You have successfully repaired the wagon ${part}`)));
		
		}
	
		else if(repairing > 85 && optional == 1){ // accepting to repair 
			if(part == "wheel"){
				if(party.supplies.wheels >= 1){
					party.supplies.wheels -= 1;
					states.push(temporary( new ContinueState(`You did not successfully repair the wagon ${part}, so it was replaced`)));
				}
				else{
					party.wWheel = false;
					states.push(temporary(new ContinueState(`You did not successfully repair the wagon ${part} and do not have a spare part to replace it with`)));
				}
				}
			else if(part == "axle"){
				if(party.supplies.axles >= 1){
					party.supplies.axles -= 1;
					states.push(temporary(new ContinueState(`You did not successfully repair the wagon ${part}, so it was replaced`)));
				}
				else{
					party.wAxle = false;
					states.push(temporary(new ContinueState(`You did not successfully repair the wagon ${part} and did not have a spare part to replace it with`)));
				}
			}
			else if(part == "tongue"){
				if(party.supplies.tongues >= 1){
					party.supplies.tongues -= 1;
					states.push(temporary(new ContinueState(`You did not successfully repair the wagon ${part}, so it was replaced`)));
				}
				else{
					party.wTongue = false;
					states.push(temporary(new ContinueState(`You did not successfully repair the wagon ${part} and did not have a spare part to replace it with`)));
					}
				}
			}
		
		else if (optional == 0) { // chose to skip repairing and go to replacing 
			if(part == "wheel"){
				if(party.supplies.wheels >= 1){
					party.supplies.wheels -= 1;
					party.wWheel = true;
					states.push(temporary(new ContinueState(`Your wagon ${part} was replaced`)));
				}
				if(party.supplies.wheels == 0){
					states.push(temporary(new ContinueState(`You do not have a spare wagon ${part}`)));
					party.wWheel = false;
				}
			}
			else if(part == "axle"){
				if(party.supplies.axles >= 1){
					party.supplies.axles -= 1;
					party.wAxle = true;
					states.push(temporary(new ContinueState(`Your wagon ${part} was replaced`)));
				}
				else{
					
					states.push(temporary(new ContinueState(`You do not have a spare wagon ${part}`)));
					party.wAxle = false;
				}
			}
			else if(part == "tongue"){
				if(party.supplies.tongues >= 1){
					party.supplies.tongues -= 1;
					party.wTongue = true;
					states.push(temporary(new ContinueState(`Your wagon ${part} was replaced`)));
				}
				else{
					
					states.push(temporary(new ContinueState(`You do not have a spare wagon ${part}`)));
					party.wTongue = false;
				}
			}
		}
	}
}

let randomEvents = new RandomEvents();