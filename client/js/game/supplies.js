class Supplies {
	constructor() {
		this.money = 0;
		this.oxen = 0;
		this.clothSets = 0;
		this.worms = 0;
		this.wheels = 0;
		this.axles = 0;
		this.tongues = 0;
		this.food = 0;
	}

	decrementFood(change) {
		if (this.food - change > 0) {
			this.food -= change;
		}
		else {
			this.food = 0;
		}
	}

	noFood() {
		return this.food === 0;
	}
}
