let startGameState = new ContinueState("Well then, you're ready to start. Good luck! You have a long and difficult journey ahead of you.", gameMenu)

let mattsGeneralStore = makeStore({
	description: "Matt's General Store - Independence, Missouri",
	nextState: startGameState
})

let departureAdviceState = new ContinueState("If you leave too early, there won't be any grass for your oxen to eat. If you leave too late, you may not get to Oregon before winter comes. If you leave at just the right time, there will be green grass and the weather will still be cool.")

let departureState = new MenuState("It is 1848. Your jumping off place for Oregon is Independence, Missouri. You must decide which month to leave Independence.", [
	{text: "March", next: mattsGeneralStore, onclick: () => {
		party.startingDate = new Date(1848, 2)
	}},
	{text: "April", next: mattsGeneralStore, onclick: () => {
		party.startingDate = new Date(1848, 3)
	}},
	{text: "May", next: mattsGeneralStore, onclick: () => {
		party.startingDate = new Date(1848, 4)
	}},
	{text: "June", next: mattsGeneralStore, onclick: () => {
		party.startingDate = new Date(1848, 5)
	}},
	{text: "July", next: mattsGeneralStore, onclick: () => {
		party.startingDate = new Date(1848, 6)
	}},
	{text: "Ask for advice", next: departureAdviceState}
])



let partyEntryState = new PartyEntryState(departureState);



let learnOccupationState = new ContinueState("Bankers start with the most money, but farmers get the biggest point bonus at the end.<br><br>Banker: $1600 budget - No score bonus<br>Carpenter: $800 budget - 2x score bonus<br>Farmer: $400 budget - 3x score bonus")

let occupationMenu = new MenuState("The Oregon Trail", [
	{text: "Easy - Be a banker from Boston", next: partyEntryState, onclick: () => {
		party.occupation = "banker"
	}},
	{text: "Medium - Be a carpenter from Ohio", next: partyEntryState, onclick: () => {
		party.occupation = "carpenter"
	}},
	{text: "Hard - Be a farmer from Illinois", next: partyEntryState, onclick: () => {
		party.occupation = "farmer"
	}},
	{text: "Find out more about these choices", next: learnOccupationState}
])



let learnState = new ContinueState(`Try taking a journey by covered wagon across 2000 miles of plains, rivers, and mountains. Try! On the plains, will you slosh your oxen through mud and water-filled ruts or will you plod through dust six inches deep?<br><br>
How will you cross the rivers? If you have money, you might take a ferry (if there is a ferry). Or, you can ford the river and hope you and your wagon aren't swallowed alive!<br><br>
What about supplies? Well, if you're low on food you can hunt. You might get a buffalo... you might. And there are bear in the mountains.<br><br>
At the Dalles, you can try navigating the Columbia River, but if running the rapids with a makeshift raft makes you queasy, better take the Barlow Road.<br><br>
If for some reason you don't survive - your wagon burns, or thieves steal your oxen, or you run out of provisions, or you die of cholera - don't give up! Try again... and again... until your name is up with the other on the High Scores.<br><br>
This software was written by a team of students at UMBC, based on the original Oregon Trail game for DOS from 1990.`)

let mainMenu = new MenuState("The Oregon Trail", [
	{text: "Travel The Trail", next: occupationMenu},
	{text: "Learn About The Trail", next: learnState},
	{text: "High Scores", onclick: () => {
		server.highScores(scores => {
			states.push(new ContinueState(`High scores: <hr> ${scores} <hr>`))
		})
	}}
])

mainMenu.stateName = "mainMenu";


