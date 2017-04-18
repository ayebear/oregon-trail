// Input state - Asks the user to enter a value
class InputState {
	constructor(description = "InputState", type = "text", valid = undefined, onSubmit = undefined) {
		this.description = description
		this.type = type
		this.valid = valid
		this.onSubmit = onSubmit
	}

	getValue() {
		return $("#inputStateValue").val()
	}

	isValid() {
		return (invoke(this, "valid", this.getValue()) !== false)
	}

	submit() {
		if (this.isValid()) {
			return invoke(this, "onSubmit", this.getValue())
		}
	}

	display() {
		this.root.append(`<h3>${this.description}</h3>`)

		let button = $("<button/>")
			.text("Submit")
			.click(() => {
				this.submit()
			})

		let input = $("<input/>")
			.attr("id", "inputStateValue")
			.attr("type", this.type)
			.on("change keyup paste click", () => {
				// Check "valid" function whenever input changes
				button.prop("disabled", !this.isValid())
			}).keyup(e => {
				// Check if "enter" was pressed
				if (e.keyCode === 13) {
					this.submit()
				}
			})

		this.root.append(input)
		this.root.append(button)
	}
}
