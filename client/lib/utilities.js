// Calls a callback inside of an object with optional arguments
// Also supports a boolean value
function invoke(object, method, ...args) {
	if (object) {
		if (typeof object[method] === "function") {
			return object[method].call(object, ...args)
		} else if (typeof object[method] === "boolean") {
			return object[method]
		}
	}
}

// Inclusive min, exclusive max
// [min, max)
// 0, 2 => Only returns 0 or 1
function rand(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

// Returns a random element in an array
function randValue(array) {
	if (array.length) {
		return array[rand(0, array.length)]
	}
}

// Returns a random index in an array
function randIndex(array) {
	if (array.length) {
		return rand(0, array.length)
	}
}

function dateDiffInDays(a, b) {
	const MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

// Returns a random key with a non-zero value from an object
// Example: {a: 0, b: 1} - Would never return "a"
// Returns undefined if a non-zero key was not found
function randNonZeroKey(object) {
	// Filter out keys with zero values
	let nonZeroKeys = Object.keys(object).filter(val => object[val] > 0)

	// Return a random key
	return randValue(nonZeroKeys)
}
