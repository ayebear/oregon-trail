class Server {
	constructor(url) {
		this.url = url
	}

	get(endpoint, success) {
		$.getJSON(`${this.url}${endpoint}.php`, success)
	}

	// Post data to an endpoint on the server
	post(endpoint, name, data, success) {
		$.post(`${this.url}${endpoint}.php`, {[name]: JSON.stringify(data)}, success)
	}

	highScores(success) {
		this.get("scores", data => {
			// Build up an html table with the high scores
			let html = "<table><tr><th>Name</th><th>Score</th></tr>"
			for (let elem of data) {
				html += `<tr><td>${elem.name}</td><td>${elem.score}</td></tr>`
			}
			html += "</table>"
			success(html)
		})
	}

	// Example: server.addScore("Linus", 999, success)
	addScore(name, score, success) {
		this.post("scores", "score", {name: name, score: score}, success)
	}

	// Example: server.addDeath("Steve", 252, party.daysPassed, success)
	addDeath(name, location, daysPassed, success) {
		this.post("deaths", "death", {name: name, location: location, daysPassed: daysPassed}, success)
	}
}

let server = new Server("https://swe.umbc.edu/~ehebert1/")
