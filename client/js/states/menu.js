/*
Menu state (description + list of buttons)

Onclick is optional but runs first
Next is then run afterwards
If you need to pass parameters to the state being pushed, then use onclick to push it manually.
*/
class MenuState {
	constructor(description, choices) {
		// May need other options, for styling, images, other elements, etc.
		this.description = description

		// [{text: "", next: state, onclick: () => {}}]
		this.choices = choices
	}

	display() {
		// Add description
		this.root.append(`<h3>${this.description}</h3>`)

		// Add buttons with onclicks
		this.root.append('<div id="menu" class="menu"></div>')

		for (let item of this.choices) {
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
