class Weather {
	constructor() {
		this.season = 0;
		this.daily = 'warm';
		this.currentHealth = 0.00;
		this.riverDepth = 0.0; // accumulates to adjust river based on daily weather patterns 
	}

	updateWeather(days = 1) { // should update the values
		let currentMonth = party.date.getMonth();
		let random = Math.floor(Math.random() * 100);
		if ((currentMonth <= 1) || (currentMonth === 11)) { // winter
			this.season = 1;

			if (random <= 55) {
				this.daily = "snowing";
				this.currentHealth = .03; // snowing/hot weather is bad to travel in
				this.riverDepth += .4 * days;
			}
			else if (random > 55 && random <= 75) {
				this.daily = "cold";
				this.currentHealth = .02;// traveling when raining reduces health by a little
			}
			else if (random > 75 && random <= 85) {
				this.daily = "raining";
				this.currentHealth = .01;
				this.riverDepth += .2 * days;
			}
			else if (random > 85) {
				this.daily = "cool";
				this.currentHealth = .02;

			}
		}
		else if ((currentMonth >= 5) && (currentMonth <= 7)) { // summer
			this.season = 2;

			if (random <= 75) {
				this.daily = "hot";
				this.currentHealth = .03;
				this.riverDepth -= .3 * days;
			}
			else if (random > 75 && random <= 90) {
				this.daily = "warm";
				this.currentHealth = .04;//warm weather is beneficial for health
				this.riverDepth -= .1 * days;
			}
			else if (random > 90) {
				this.daily = "raining";
				this.currentHealth = .01;
				this.riverDepth += .2 * days;
			}
		}
		else if ((currentMonth >= 8 && currentMonth <= 10) || (currentMonth >= 2 && currentMonth <= 4 )) { // spring/fall
			this.season = 3;

			if (random <= 65) {
				this.daily = "warm";
				this.currentHealth = .04;
				this.riverDepth -= .1 * days;
			}
			else if (random > 65 && random <= 90) {
				this.daily = "raining";
				this.currentHealth = .01;
				this.riverDepth += .2 * days;
			}
			else if (random > 90) {
				this.daily = "hot";
				this.currentHealth = .03;
				this.riverDepth -= .3 * days;
			}
		}
	}
}

let weather = new Weather();
