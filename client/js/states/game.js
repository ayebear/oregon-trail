class RiverGameState {
	display() {
		let myGamePiece;
		let float;

		let startPieceBack;
		let myObstacles = []; // an array to make multiply objects\
		let left;
		let right;

		let end = [];

		let gameElement = document.getElementById("game");

		function startGame() {
			float = new component(70, 35, "saddlebrown", 220, 90);
			myGamePiece = new component(70, 35, "./data/images/wagon.png", 220, 90, "image");

			// starting land , may change to just green
			//startPieceBack =  new component(1000, 100, "./data/images/grass.jpg", 0, 0,"image");
			startPieceBack =  new component(500, 100, "green", 10, 0);

			// ending land, may change to just green
			// endPieceBack = new component(100, 100, "grey", 200, 950); // land, die if you crash


			// side pieces, if you crash into it, you die
			left =  new component(10, 900, "grey", 0, 0);
			right =  new component(10, 900, "grey", 472, 0);

			// for any background images
			// myBackground = new component(656, 270, "./data/images/200w.webp", 0, 0, "image");
			myGameArea.start();
		}

		let myGameArea = {
			canvas : document.createElement("canvas"),
			start : function() {
				// frame of game
				this.canvas.width = 480;
				this.canvas.height = 700;
				this.context = this.canvas.getContext("2d");
				gameElement.appendChild(this.canvas);
				this.frameNo = 0;
				this.interval = setInterval(updateGameArea, 20);
				// keyboard controls
				window.addEventListener('keydown', function (e) {
					myGameArea.key = e.keyCode;
				});
				window.addEventListener('keyup', function (e) {
					myGameArea.key = false;
				})
			},
			clear : function() {
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			},
			stop : function(success) {
				clearInterval(this.interval);

				if (success === true){
					states.push(new ContinueState(`You Successfully rafted across the river!`, undefined, () => states.pop("gameMenu")));
				}
				else {
					let item = randNonZeroKey(party.supplies);

					if (item) {
						// Lose up to all but one
						let lost = rand(1, party.supplies[item]);
						party.supplies[item] -= lost;

						// Show result to user, using plural/singular tense
						let result = getItemDescription(item, lost);
						states.push(new ContinueState(`You crashed and lost ${result}!`, undefined, () => states.pop("gameMenu")));
					}
					else {
						states.push(new ContinueState(`You crashed and luckily lost nothing!!`, undefined, () => states.pop("gameMenu")));

					}
				}


			}
		};

		function component(width, height, color, x, y, type) {
			this.type = type;
			if (type === "image") {
				this.image = new Image();
				this.image.src = color;
			}
			this.width = width;
			this.height = height;
			this.speedX = 0;
			this.speedY = 0;
			this.x = x;
			this.y = y;
			this.update = function() {
				let ctx = myGameArea.context;
				if (type === "image") {
					ctx.drawImage(this.image,
						this.x,
						this.y,
						this.width, this.height);
				} else {
					ctx.fillStyle = color;
					ctx.fillRect(this.x, this.y, this.width, this.height);
				}
			};

			this.newPos = function() {
				this.x += this.speedX;
				this.y += this.speedY;
			};
			// crash function
			this.crashWith = function(otherobj) { // if it hits the rocks
				let myleft = this.x;
				let myright = this.x + (this.width);
				let mytop = this.y;
				let mybottom = this.y + (this.height);
				let otherleft = otherobj.x;
				let otherright = otherobj.x + (otherobj.width);
				let othertop = otherobj.y;
				let otherbottom = otherobj.y + (otherobj.height);
				let crash = true;
				if ((mybottom < othertop) ||
					(mytop > otherbottom) ||
					(myright < otherleft) ||
					(myleft > otherright)) {
					crash = false;
				}
				return crash;
			}
		}

		function updateGameArea() {
			let x, y;
			// if wagon hits any of the objects that are made, it will stop  AKA DIE
			for (let i = 0; i < myObstacles.length; i += 1) {
				if (myGamePiece.crashWith(myObstacles[i])) {
					myGameArea.stop(false);
				}
			}

			// side piece crashing AKA DIE
			if (myGamePiece.crashWith(right) || myGamePiece.crashWith(left)) {
				myGameArea.stop(false);
			}

			// hits land AKA YOU WIN
			for (let i = 0; i < end.length; i += 1) {
				if (myGamePiece.crashWith(end[i])) {
					myGameArea.stop(true);
				}
			}

			myGameArea.clear();
			myGameArea.frameNo += 1; // this separates the upcoming objects

			// moves wagon downstream in sync with floater
			myGamePiece.speedX = 0;
			myGamePiece.speedY = 0;
			float.speedX = 0;
			float.speedY = 0;

			// slowly removes the beginning land
			startPieceBack.speedY = -.5;

			// keyboard controls
			// left and right moves faster
			// up and down moves slower
			// moves wagon downstream in sync with floater
            const moveSpeed = {x: 2, y: 1.2};
			if (myGameArea.key && myGameArea.key === 37) {myGamePiece.speedX = -moveSpeed.x; float.speedX = -moveSpeed.x; }
			if (myGameArea.key && myGameArea.key === 39) {myGamePiece.speedX = moveSpeed.x; float.speedX = moveSpeed.x;}
			if (myGameArea.key && myGameArea.key === 38) {myGamePiece.speedY = -moveSpeed.y; float.speedY = -moveSpeed.y;}
			if (myGameArea.key && myGameArea.key === 40) {myGamePiece.speedY = moveSpeed.y; float.speedY = moveSpeed.y;}

			// creates random size rocks
			// game ends when certain amount of rocks are passed
			if(myObstacles.length <= 40){
				if (myGameArea.frameNo === 1 || everyinterval(50)) {
					x = Math.floor((Math.random()*450))+ 10; // different x positionings
					//x = 450; //myGameArea.canvas.width;
					y = 900;//very bottom of page
					// creates new objects size
					let sizeX = Math.floor((Math.random()* 35) + 30);
					let sizeY = Math.floor((Math.random()* 35) + 40);

					// creates actual object rocks // this line is for images
					myObstacles.push(new component(sizeX, sizeY,"./data/images/rock.png", x, y, "image")); // 10,52 is size
					// myObstacles.push(new component(sizeX, sizeY,"grey", x, y));
				}
			}
			else{
				// generates end land
				if (myGameArea.frameNo === 1 || everyinterval(1))
					end.push(new component(500, 160, "green", 10, 1000));
			}
			// updates the moving  end land
			for (let i = 0; i < end.length; i += 1) {
				end[i].y += -1.5;
				// myObstacles[i].x += -1;
				end[i].update();
			}

			// moves the rocks from bottem of page to top.
			for (let i = 0; i < myObstacles.length; i += 1) {
				myObstacles[i].y += -1.5;
				// myObstacles[i].x += -1;
				myObstacles[i].update();
			}

			// sides
			right.newPos();
			right.update();

			left.newPos();
			left.update();


			startPieceBack.newPos();
			startPieceBack.update();

			// wagon
			float.newPos();
			float.update();
			myGamePiece.newPos();
			myGamePiece.update();

		}

// checks the time
		function everyinterval(n) {
			return (myGameArea.frameNo / n) % 1 === 0;
		}

		startGame();
	}


}

