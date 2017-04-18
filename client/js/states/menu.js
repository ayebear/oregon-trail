/*
Menu state (description + list of buttons)
	description: string
	choices: array of choices

Choice object:
	text: Text on the button itself
	onclick: Runs when the button is clicked
	next: Pushes this state after the button is clicked (always runs after onclick)
	show: Callback which must explicitly return false to hide the menu item
*/
class MenuState {
	constructor(description, choices) {
		// May need other options, for styling, images, other elements, etc.
		this.description = description

		// [{text: "", next: state, onclick: () => {}, show: () => {return true}}]
		this.choices = choices
	}

	display() {
		// Add description
		this.root.append(`<h3>${this.description}</h3>`)

		// Add buttons with onclicks
		this.root.append('<div id="menu" class="menu"></div>')

		for (let item of this.choices) {
			if (invoke(item, "show") !== false) {
				let button = $("<button/>")
					.text(item.text)
					.click(() => {
						invoke(item, "onclick")
						if (item.next) {
							states.push(item.next)
						}
					})
				$("#menu").append(button)
			}
		}
	}
}
