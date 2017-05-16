const landmarks = [
	{name: "Kansas River Crossing", type: "river", distance: 102,  generateState: () => {
		return locations.generateRiver("Kansas River Crossing",
			`The Kansas River is a tributary to the Missouri.  It is approximately 170
			miles long.  Its width and depth vary depending on the recent amount of snow
			melt.  Where the Oregon Trail crosses the Kansas River, the average width is
			620 feet and the usual depth in the middle is about 4 feet.  But be sure to
			check the conditions when you get there.`,
			{depth: 3, width: 6, canFerry: true, canIndian: false })
		}
	},
	{name: "The Big Blue River Crossing", type: "river", distance: 83,  generateState: () => {
		return locations.generateRiver("Big Blue River Crossing",
			`The Big Blue River is a tributary to the Kansas River, which is in turn a
			tributary to the Missouri.  It's approximately 300 miles long.  Farther to the
			south and west is the Little Blue River, which links up with the Big Blue at
			Blue Rapids.  You'll cross the Big Blue north of the rapids, allowing you to
			avoid the Little Blue River altogether`,
			{depth: 6, width: 20, canFerry: false, canIndian: false })
		}
	},
	{name: "Fort Kearney", type: "fort", distance: 119, generateState: () => {
		return locations.generateFort("Fort Kearney",
			`Fort Kearney is a U.S. Army post established in 1848 near the Platte River.
			It garrisons cavalry troops who protect settlers and travelers along the Oregon
			Trail.  It was named for Gen. Stephen Kearny (often spelled 'Kearney'), who
			died in 1848 after helping establish law and order in the region and serving in
			the Mexican War`)
		}
	},
	{name: "Chimney Rock", type: "town", distance: 250, generateState: () => {
		return locations.generateContinue("Chimney Rock",
			`Chimney Rock is an important landmark on the Oregon Trail.  It's a spectacular
			natural formation of solid rock and can be seen from miles around.  In fact,
			you can see it for a whole day as you approach it and another whole day as you
			leave it behind.  If you don't see it at all within a week or so after leaving
			Fort Kearney, you've probably strayed too far off the trail.`)
		}
	},
	{name: "South Pass", type: "split", distance: 102, generateState: () => {
		return locations.generateSplit("The South Path",
			`South Pass is a valley that cuts through the Rocky Mountains at their highest
			point, the Continental Divide.  It marks the halfway point on your journey to
			Oregon.  After South Pass, the trail splits.  If you're short on supplies, you
			should head to Fort Bridger.  But if you don't need supplies, you may want to
			take the shorter route and go directly to the Green River.`, splitPaths.southPath)
		}
	},
	{name: "Fort Laramie", type: "fort", distance: 86, generateState: () => {
		return locations.generateFort("Fort Laramie",
			`Fort Laramie is a US Army post near the junction of the North Platte and
			Laramie Rivers.  Originally called Fort William, it was founded as a
			fur-trading post in 1834.  It was renamed for Jacques Laramie, a French trapper
			who worked in the region earlier in the century.  Fort Laramie is an important
			stop for resting and getting supplies along the trail.`)
		}
	},
	{name: "Independence Rock", type: "town", distance: 190, generateState: () => {
		return locations.generateContinue("Independence Rock",
			`Independence Rock is an important landmark and resting place along the Oregon
			Trail. It's a large natural formation, almost 200 feet tall, made of soft stone
			into which many travelers and traders have carved their names, initials, or
			brief messages.  It gets its name from the fact that, in order to stay on
			schedule, travelers try to reach it no later than July 4--Independence Day`)
		}
	},
	{name: "Fort Hall", type: "fort", distance: 57, generateState: () => {
		return locations.generateFort("Fort Hall",
			`Fort Hall is an outpost on the banks of the Snake River.  It was originally a
			fur-trading post, founded by Nathaniel Wyeth in 1834.  Later it was bought by
			the Hudson's Bay Company.  Ever since it has served as an important stop along
			the Oregon Trail, where emigrants can rest and buy supplies.  Some travelers
			turn southwest at this point and head for California.`)
		}
	},
	{name: "Snake River Crossing", type: "river", distance: 182, generateState: () => {
		return locations.generateRiver("The Snake River Crossing",
			`After leaving Fort Hall, the trail follows the Snake River for hundreds of
			miles.  The Snake River gets its name from the way it twists and turns through
			this ruffed country, sometimes through steep gorges.  But the trail is fairly
			flat (through dry and desolate) near the river, which makes wagon travel
			possible.  Crossing the Snake River, however, can be dangerous.`,
			{depth: 20, width: 50, canFerry: false, canIndian: true })
		}
	},
	{name: "Fort Boise", type: "fort", distance: 114, generateState: () => {
		return locations.generateFort("Fort Boise",
			`Fort Boise was built by the Hudson's Bay Company in 1834 as a fur-trading
			outpost.  Its name comes from the French word "boise," meaning "wooded."
			That's because there are lots of trees here, unlike the dry region of the Snake
			River Plain to the east.  An important stop on the Oregon Trail, it stands on
			the banks of the Boise River, a tributary to the Snake River.`)
		}
	},
	{name: "The Grand Ronde", type: "split", distance: 160, generateState: () => {
		return locations.generateSplit("The Grand Ronde",
			`The Grand Ronde (French for 'great ring') is a river that runs roughly
			parallel to the Blue Mountains.  The Oregon Trail crosses through the Grande
			Ronde river valley just before the mountains.  The Grande Ronde valley is noted
			for its beauty and is greatly appreciated by emigrants as a sign that their
			long journey is nearing its end.`, splitPaths.grandRonde)
		}
	}
];
