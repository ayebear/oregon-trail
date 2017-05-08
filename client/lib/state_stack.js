/*
Stores the current state, can push/pop states

States can contain:
	display(): Should set DOM elements here
	onPush(args): Called when this state is switched to (args are forwarded from StateStack::push)
	onPop(args): Called when this state is removed (args are forwarded from StateStack::pop)
	onEnter(): Called when a state is added/returned back to
	onExit(): Called when a state is left/removed
*/
class StateStack {
	constructor(initialState = undefined, rootElement = "#game", ...args) {
		// Get root DOM element (this can be changed if needed)
		this.root = $(rootElement)

		this.push(initialState, ...args)
	}

	// Removes all DOM elements from the root before displaying
	clear() {
		if (this.state && this.state.root) {
			this.state.root.empty()
		}
	}

	// Switches to a new state object, sets its parent, triggers onPush, and displays it
	push(newState, ...args) {
		if (newState) {
			// Set parent and root element (undefined parent means this is the root)
			newState.parent = this.state
			newState.root = this.root

			// Exit old state
			invoke(this.state, "onExit")

			// Set current state
			this.state = newState
			invoke(this.state, "onPush", ...args)
			invoke(this.state, "onEnter")

			// Display
			this.clear()
			invoke(this.state, "display")
		}

		return this
	}

	// Goes back to the parent state
	// Pops all the way back to an optionally specified state by name
	pop(stateName, ...args) {
		if (this.state && this.state.parent) {
			let childState = this.state

			// Switch back to parent state
			this.state = this.state.parent

			// Pop and exit the old child state
			invoke(childState, "onPop", ...args)
			invoke(childState, "onExit")

			// Enter parent state
			invoke(this.state, "onEnter")

			// Display
			this.clear()
			invoke(this.state, "display")

			// Pop temporary states when re-entered from a pop
			if (this.state.temporary === true) {
				this.pop(...args)
			}

			// Pop back to the state with this state name
			// If not found, then the stack will be popped back to the initial state
			if (stateName) {
				while (stateName !== this.state.stateName && this.state.parent) {
					this.pop(...args)
				}
			}
		}

		return this
	}
}

function temporary(object) {
	if (object) {
		object.temporary = true
	}
	return object
}
