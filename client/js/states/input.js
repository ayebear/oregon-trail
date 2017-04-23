// Input state - Asks the user to enter a value
class InputState extends ContinueState {
	constructor(description = "InputState", type = "text", valid = undefined, onSubmit = undefined) {
		super(description, undefined, () => {
			this.submit()
		})
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
		super.display()

		let input = $("<input/>")
			.attr("id", "inputStateValue")
			.attr("class", "menu")
			.attr("type", this.type)
			.on("change keyup paste click", () => {
				// Check "valid" function whenever input changes
				$("#button0").prop("disabled", !this.isValid())
			}).keyup(e => {
				// Check if "enter" was pressed
				if (e.keyCode === 13) {
					this.submit()
				}
			})

		$("#description").append(input)
	}
}
