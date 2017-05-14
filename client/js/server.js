class Server {
	constructor(url) {
		this.url = url
		this.update()
	}

	// Get current deaths and scores from server
	update() {
		console.log(`Getting data from ${this.url}...`)
		$.getJSON(this.url, data => {
			this.scores = data.scores
			this.deaths = data.deaths
			console.log(this.scores, this.deaths)
		})
	}

	// Add a high score, or a death
	// Example: server.post({score: {name: "Linus", score: 999}}, done)
	// Example: server.post({death: {name: "Steve", location: 47, date: "1848-04-02"}}, done)
	post(data, success) {
		$.post(this.url, JSON.stringify(data), success)
	}
}

let server = new Server("https://swe.umbc.edu/~ehebert1/server.php")
