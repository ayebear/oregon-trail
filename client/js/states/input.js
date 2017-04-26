const inputStateBlacklist = new Set(["description", "next", "valid", "onSubmit"])

// Input state - Asks the user to enter a value
class InputState extends ContinueState {
	constructor(options = {}) {
		super(options.description, options.next, () => {
			this.submit()
		})
		this.options = options
	}

	getValue() {
		return $("#inputStateValue").val()
	}

	isValid() {
		return (invoke(this.options, "valid", this.getValue()) !== false)
	}

	submit() {
		if (this.isValid()) {
			return invoke(this.options, "onSubmit", this.getValue())
		}
	}

	display() {
		super.display()

		let input = $("<input/>")
			.attr("id", "inputStateValue")
			.attr("class", "menu")
			.on("change keyup paste click", () => {
				// Check "valid" function whenever input changes
				$("#button0").prop("disabled", !this.isValid())
			}).keyup(e => {
				// Check if "enter" was pressed
				if (e.keyCode === 13) {
					this.submit()
				}
			})

		// Set any additional parameters as attributes on the input element
		for (let key in this.options) {
			if (!inputStateBlacklist.has(key)) {
				let value = this.options[key]
				input.attr(key, value)
			}
		}

		$("#description").append(input)
	}
}
