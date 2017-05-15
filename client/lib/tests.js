class StateTester {
	constructor(name) {
		this.events = []
		this.stateName = name
	}

	onPush(a, b) {
		this.events.push(`onPush: ${a} ${b}`)
	}

	onPop() {
		this.events.push(`onPop`)
	}

	onEnter() {
		this.events.push("onEnter")
	}

	onExit() {
		this.events.push("onExit")
	}

	display() {
		this.events.push("display")
	}
}

function runTests() {
	let tester = new StateTester()
	let tester2 = new StateTester()
	let states = new StateStack(tester, "#game", 1, 2)
	console.assert(tester.events.length === 3)
	console.assert(tester.events[0] === "onPush: 1 2")
	console.assert(tester.events[1] === "onEnter")
	console.assert(tester.events[2] === "display")

	states.push(tester2, 3, 4)
	console.assert(tester.events.length === 4)
	console.assert(tester.events[3] === "onExit")
	console.assert(tester2.events.length === 3)
	console.assert(tester2.events[0] === "onPush: 3 4")
	console.assert(tester2.events[1] === "onEnter")
	console.assert(tester2.events[2] === "display")

	states.pop(undefined)
	console.assert(tester2.events.length === 5)
	console.assert(tester2.events[3] === "onPop")
	console.assert(tester2.events[4] === "onExit")
	console.assert(tester.events.length === 6)
	console.assert(tester.events[4] === "onEnter")
	console.assert(tester.events[5] === "display")

	states.pop()
	console.assert(tester.events.length === 6)
	console.assert(tester2.events.length === 5)

	// Test popping to specific states
	let a = new StateTester('stateA')
	let b = new StateTester('stateB')
	let c = new StateTester('stateC')
	states = new StateStack(a, "#game")
	console.assert(states.state.stateName === 'stateA')
	states.push(b)
	console.assert(states.state.stateName === 'stateB')
	states.push(c)
	console.assert(states.state.stateName === 'stateC')
	states.pop('stateA')
	console.assert(states.state.stateName === 'stateA')
}
