/*
Menu state (description + list of buttons)
	description: string
	choices: array of choices

Choice object:
	text: Text on the button itself
	onclick: Runs when the button is clicked
	next: Pushes this state after the button is clicked (always runs after onclick)
	show: Callback which must explicitly return false to hide the menu item (can also be a boolean)
	args: Array of arguments, which will be forwarded to the "next" state
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

		// For use by other states
		this.root.append('<div id="content"></div>')

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
						let state = item.next
						if (state) {
							if (typeof state === 'function') {
								// Create a new state with optional arguments
								let args = item.args || []
								states.push(new state(...args))
							} else {
								// Push specified state instance
								states.push(state)
							}
						}
					})
				$("#menu").append(button)
			}

			// Count even if the button is hidden, so it correlates with the choices array
			++i
		}
	}
}
