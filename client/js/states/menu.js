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
		this.root.append(`<div id="description" class="menu"><h3>${this.description}</h3></div>`)

		// Add buttons with onclicks
		this.root.append('<div id="menu" class="menu"></div>')

		let i = 0
		for (let item of this.choices) {
			// Only show button if its show function is undefined or returns true
			if (invoke(item, "show") !== false) {
				let button = $("<button/>")
					.html(item.text)
					.attr("id", `button${i}`)
					.click(() => {
						invoke(item, "onclick")
						if (item.next) {
							states.push(item.next)
						}
					})
				$("#menu").append(button)
			}

			// Count even if the button is hidden, so it correlates with the choices array
			++i
		}
	}
}
