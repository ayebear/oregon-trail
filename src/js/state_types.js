class Menu {
	constructor(choices) {
		this.choices = choices
	}

	onPush() {
		console.log("Menu pushed")
	}

	onPop() {
		console.log("Menu popped")
	}

	onEnter() {
		console.log("Menu entered")
	}

	onExit() {
		console.log("Menu entered")
	}

	display() {
		console.log(this.choices)
	}
}
