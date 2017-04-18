/*
Menu state (description + list of buttons)

Onclick is optional but runs first
Next is then run afterwards
If you need to pass parameters to the state being pushed, then use onclick to push it manually.
*/
class Menu {
	constructor(description, choices) {
		// May need other options, for styling, images, other elements, etc.
		this.description = description

		// [{text: "", next: state, onclick: () => {}}]
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
		console.log(this.description)
		console.log(this.choices)

		// Build menu
		// Add description
		this.root.append(`<h3>${this.description}</h3>`)

		// Add buttons with onclicks
		let buttonHtml = '<div class="menu">'
		for (let item of this.choices) {
			buttonHtml += `<button>${item.text}</button>`
		}
		buttonHtml += "</div>"
		this.root.append(buttonHtml)
	}
}
