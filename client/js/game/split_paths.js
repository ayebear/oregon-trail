const splitPaths = {
	southPath: {
		description: "You Arrive at the South Pass. You need to get to Soda Springs, you can do so by way of a river or a fort.",
		choices: [
			{
				text: "Take the Short Path: Green River.",
				onclick: () => {
					locations.addPath(
						[
							{name: "Green River", type: "river", distance: 57, generateState: () => {return locations.generateRiver("The Green River", `The Green River is a tributary to the Colorado River, flowing south from the
								Continental Divide along a twisted, rugged path.  It's estimated to be more
								than 700 miles in length.  It's navigable only at high water, and even then
								it's extremely dangerous.  But you must cross it before proceeding west on the
								Oregon Trail, so be very careful.`, {depth: 30, width: 15, canFerry: true, canIndian: false})}},
							{name: "Soda Springs", type: "town", distance: 144, generateState: () => {return locations.generateContinue("Soda Springs", `Soda Springs is an important landmark and stopping-off point along the trail.
								It gets its name from the alkaline (sodium) mineral springs you find there.
								Some travelers separate from the Oregon Trail at this point and head southwest
								for California.  Others wait until they get to Fort Hall before going on the
								"California Trail."`)}}
						]
					)
				}
			}
			,
			{
				text: "Take the Safe Path: Fort Bridger ",
				onclick: () => {
					locations.addPath(
						[
							{name: "Fort Bridger", type: "fort", distance: 125, generateState: () => {return locations.generateFort("Fort Bridger", `Fort Bridger is a U.S. army outpost, although it was founded in 1843 by fur
								trader and scout Jim Bridger as a trading post and way station.  It's an
								important stop along the Oregon Trail, where travelers can rest, buy supplies,
								and obtain information about the next stretch of the journey.  A little over
								100 miles to the southwest is the recent Mormon settlement of Salt Lake City.`)}},
							{name: "Soda Springs", type: "town", distance: 162, generateState: () => {return locations.generateContinue("Soda Springs", `Soda Springs is an important landmark and stopping-off point along the trail.
								It gets its name from the alkaline (sodium) mineral springs you find there.
								Some travelers separate from the Oregon Trail at this point and head southwest
								for California.  Others wait until they get to Fort Hall before going on the
								"California Trail."`)}}
						]
					)
				}
			}
		]
	},
	grandRonde: {
		description: "You Arrive at Blue Mountains. You need to get to The Dalles, you can either go their directly or take a detour to get supplies at Fort Walla",
		choices: [
			{
				text: "Go Straight to The Dalles",
				onclick: () => {
					locations.addPath(
						[
							{name: "The Dalles", type: "split", distance: 125, generateState: () => {return locations.generateSplit("The Dalles", `The Dalles is the chief embarkation point for rafts heading down the Columbia
								River toward the Willamette Valley.  It was named by French fur-trappers, who
								likened the deep, stony river gorge to a huge gutter.  (In French, the word
								'dalles' can refer to 'gutters' or 'flagstones.') Emigrants to Oregon often
								stop here to rest and trade before rafting down the Columbia.`, splitPaths.theDalles)}}
						]
					)
				}
			}
			,
			{
				text: "Take a Detour to Fort Walla",
				onclick: () => {
					locations.addPath(
						[
							{name: "Fort Walla", type: "fort", distance: 55, generateState: () => {return locations.generateFort("Fort Walla", `Fort Walla Walla was established in 1818 as a fur-trading post at the juncture
								of the Columbia and Walla Walla Rivers.  It later became a military fort.
								Marcus Whitman worked as a medical missionary nearby from 1836 to 1847.  Walla
								Walla is the name of an American Indian tribe living in the region.  The Walla
								Wallas are close related to and allied with the Umatila.`)}},
							{name: "The Dalles", type: "split", distance: 120, generateState: () => {return locations.generateSplit("The Dalles", `The Dalles is the chief embarkation point for rafts heading down the Columbia
								River toward the Willamette Valley.  It was named by French fur-trappers, who
								likened the deep, stony river gorge to a huge gutter.  (In French, the word
								'dalles' can refer to 'gutters' or 'flagstones.') Emigrants to Oregon often
								stop here to rest and trade before rafting down the Columbia.`, splitPaths.theDalles)}}						]
					)
				}
			}
		]
	},
	theDalles: {
		description: "You Arrive at the Dalles, the last stop before Oregon. You can choose to cross The Columbia River to save some distance or play it safe and take the Barlow Toll Road",
		choices: [
			{
				text: "Take the Barlow Toll Road",
				onclick: () => {
					locations.addPath(
						[
							{name: "The End", type: "town", distance: 200, generateState: () => {return locations.generateEndGame()}}
						]
					)
				}
			},
			{
				text: "Cross through the Columbia River",
				onclick: () => {
					locations.addPath(
						[
							{name: "The Columbia River", type: "river", distance: 50, generateState: () => {return locations.generateRiver("The Columbia River", `The Columbia river is the largets, most imprtant river in the Northwest.  It
								starts up in Canada and passes through the Oregon Territory, flowing more than
								1,000 miles to the Pacific Ocean.  It has cut a deep gorge through the rugged
								Oregon countryside.  It also has many rapids, making navigation difficult.
								Rafting down the Columbia can be very dangerous!`, {depth: 20, width: 15, canFerry: false, canIndian: true})}},
							{name: "The End", type: "town", distance: 20, generateState:() => {return locations.generateEndGame()}}
						]
					)
				}
			}
		]
	}

};
