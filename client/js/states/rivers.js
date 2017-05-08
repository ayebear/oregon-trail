class RiverState extends MenuState {
    constructor(width, depth, canFerry, canIndian) {

    	let choiceArray = [
    		{
				text: "Attempt to ford the river", onclick: () => {
					this.fordingOption();
				}
			},
            {
                text: "Attempt to chaulk the river", onclick: () => {
                this.chaulkingOption(); // << this is done before ^^
            }
            },
            {
                text: "Rest", onclick: () => {
                states.push(restState); // doest work?
            }
            },
            {
                text: "Learn about the options", onclick: () => {
                states.push(new ContinueState("Fording: making your oxens swim across the river. Not advised for depths greater than 3 feet <br><br> Chaulking: Seal and Float your wagon across the river <br><br> Ferry/Indian: Safest way across a river <br><br> Rest: Rest and see if the river depth will change enough for you to pass"));
            }
            }];

    	if (canFerry){
    		choiceArray.splice(2,0,
                {
                    text: "Hire a ferry for $50", /*next: ferryState,*/ onclick: () => {
                    	this.ferryOption();
					}
                });
		}

		if (canIndian){
			choiceArray.splice(2,0,
				{
					text: "Hire an Indian for 3 sets of clothing", /*next: ferryState,*/ onclick: () => {
					this.indianOption();
				}
				});
		}

        super(`Weather: cool. <br><br>River width: ${width} feet. <br><br>River depth: ${depth} feet deep`,choiceArray);

        this.width = width;
        this.depth = depth;
	}


    failed(){
		let suppliesArray = [party.supplies.oxen, party.supplies.clothSets, party.supplies.worms,
			party.supplies.wheels, party.supplies.axles, party.supplies.tongues, party.supplies.food];
		let random = Math.floor(Math.random() * suppliesArray.length); // randomly picks something to lose in the array
		let chosenItem = suppliesArray[random];
		let currentItem, randomItem;

		if( chosenItem >= 1){ // has more than 1
			if( random === 0){
				currentItem = party.supplies.oxen;
				randomItem = Math.floor(Math.random() * (currentItem - 1)) + 1;	// lose at least one but not all
				party.supplies.oxen -= randomItem; // updates new supplies
				states.push(new ContinueState(`You crossed the river, but lost ${randomItem} oxens!`,  null, () => states.push(gameMenu)));
			}
			else if ( random === 1) {
				currentItem = party.supplies.clothSets;
				randomItem = Math.floor(Math.random() * (currentItem - 1)) + 1;
				party.supplies.clothSets -= randomItem;
				states.push(new ContinueState(`You crossed the river, but lost ${randomItem} sets of clothes!`,  null, () => states.push(gameMenu)));
			}
			else if ( random === 2) {
				currentItem = party.supplies.worms;
				randomItem = Math.floor(Math.random() * (currentItem - 1)) + 1;
				party.supplies.worms -= randomItem;
				states.push(new ContinueState(`You crossed the river, but lost ${randomItem} worm bait!`,  null, () => states.push(gameMenu)));
			}
			else if ( random === 3) {
				currentItem = party.supplies.wheels;
				randomItem = Math.floor(Math.random() * (currentItem - 1)) + 1;
				party.supplies.clothSets -= randomItem;
				states.push(new ContinueState(`You crossed the river, but lost ${randomItem} sets of clothes!`,  null, () => states.push(gameMenu)));
			}
			else if ( random === 4) {
				currentItem = party.supplies.axles;
				randomItem = Math.floor(Math.random() * (currentItem - 1)) + 1;
				party.supplies.clothSets -= randomItem;
				states.push(new ContinueState(`You crossed the river, but lost ${randomItem} axles!`,  null, () => states.push(gameMenu)));
			}
			else if ( random === 5) {
				currentItem = party.supplies.tongues;
				randomItem = Math.floor(Math.random() * (currentItem - 1)) + 1;
				party.supplies.clothSets -= randomItem;
				states.push(new ContinueState(`You crossed the river, but lost ${randomItem} tongues!`,  null, () => states.push(gameMenu)));
			}
			else if ( random === 6) {
				currentItem = party.supplies.food;
				randomItem = Math.floor(Math.random() * (currentItem - 1)) + 1;
				party.supplies.clothSets -= randomItem;
				states.push(new ContinueState(`You crossed the river, but lost ${randomItem} pounds of food`, null, () => states.push(gameMenu)));
			}
		}
		else {
			this.failed(); // if there was 0 supplies of that item, it will run again
		}
	}

    successCrossing() {
		states.push(new ContinueState("You have safely crossed the river!", null, () => states.push(gameMenu)));
	}

	ferryOption(){
        let money = party.supplies.money;
        if (money >= 50) {
            party.supplies.money -= 50;
            states.push(new ContinueState("You took the ferry for 50 dollars", null, () => states.push(gameMenu)));
        }
        else {
            states.push(new ContinueState("You do not have enough money to take the ferry"));
        }
	}

	indianOption(){
		let clothSets = party.supplies.clothSets;
		if (clothSets >= 3){
            party.supplies.clothSets -= 3;
            states.push(new ContinueState("You gave the Indian 3 Sets of Clothing for Help crossing the river", null, () => states.push(gameMenu)));
        }
        else {
            states.push(new ContinueState("You don't have enough Clothes to give the Indian"));
        }
	}

    fordingOption() {
		let x = this.width; // need to update later depending on river actual depth
		let y = this.depth;

		if(x >= 5){ // water depth is too high
			this.failed();
		}
		else if (x <= 1.5){ // water depth is relatively low making it easy
			this.successCrossing();
		}
		else if ( x > 1.5 && x < 3){
			let random = Math.floor(Math.random() * 100);
			if(random <= 90){ // 90% chance of success since less water
				this.successCrossing();
			}
			else{
				this.failed();
			}
		}
		else if ( x >= 3 && x < 5){
			let random = Math.floor(Math.random() * 100);
			if(random <= 75){ // 75 % chance of success
				this.successCrossing();
			}
			else{
				this.failed();
			}
		}
	}

    chaulkingOption(){
    	let random = Math.floor(Math.random() * 100);
		if(random <= 70){ // 55 % chance of success
			this.successCrossing();
		}
		else{
			this.failed();
		}
	}
}