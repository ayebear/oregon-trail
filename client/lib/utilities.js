// Calls a callback inside of an object with optional arguments
function invoke(object, method, ...args) {
	if (object && typeof object[method] === 'function') {
		return object[method].call(object, ...args)
	}
}

// Inclusive min, exclusive max
// [min, max)
// 0, 2 => Only returns 0 or 1
function rand(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

// Returns a random element in an array
function randElem(array) {
	if (array.length) {
		return array[rand(0, array.length)]
	}
}
