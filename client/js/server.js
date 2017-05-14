class Server {
	constructor(url) {
		this.url = url
	}

	get(endpoint, success) {
		$.getJSON(`${this.url}${endpoint}.php`, data => {
			success(data)
		})
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

	// Add a high score, or a death
	// Example: server.post({score: {name: "Linus", score: 999}}, done)
	// Example: server.post({death: {name: "Steve", location: 47, date: "1848-04-02"}}, done)
	post(data, success) {
		$.post(this.url, JSON.stringify(data), success)
	}
}

let server = new Server("https://swe.umbc.edu/~ehebert1/")
// server.post({score: {name: "Linus", score: 999}}, data => {
// 	console.log("Posted score")
// })
