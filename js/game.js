class Game {
    constructor(canvas, map) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.currentSecond = 0;
        this.frameCount = 0;
        this.framesLastSecond = 0;
        this.lastFrameTime = 0;
        this.timeElapsed = 0;
        this.currentFrameTime = 0;
        this.animationId = 0;
        this.map = map;
        this.gameOn = true;
        this.levelCompleted = false;
        this.player = new Character(this);
        this.endGame = false;

        this.audioStart = new Audio();
        this.audioLevelCompleted = new Audio();
        this.audioGameOver = new Audio();
    }

    start() {
        this.audioStart.play();
        this.reset();
        // console.log("Game started!");

        // draws the game the first time, then starts the animation
        this.draw();
        this.animation();
    }

    reset() {
        // reinitialize array of objects attached to the map
        this.map.objectsArr = [];
        // sets in place the objects of the array
        this.map.initializeObjects();
        // creates new player
        this.player = new Character(this);
        // reinitializes player position
        this.map.placeCharacter();
        // reinitializes event listeners for player controls
        this.player.setControls();
        // reinitializes push count
        this.player.pushCount = 0;
        // turns on animation
        this.gameOn = true;
        // waits for level completion
        this.levelCompleted = false;
    }

    drawFrameRate() {
        this.context.font = "10px 'Press Start 2P'";
        this.context.fillStyle = "white";
        this.context.fillText("FPS: " + this.framesLastSecond, 10, 20)
    }

    drawPushCount() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 400, this.width - 100, 100);
        this.context.font = "10px 'Press Start 2P'";
        this.context.fillStyle = "white";
        this.context.fillText("push: " + this.player.pushCount, 20, 450)
    }

    draw() {
        this.map.draw();
        // this.drawFrameRate();
        this.player.draw();
        this.drawPushCount();
    }

    confetti() {
        // draws a little animation for the endgame or any other purpose
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.width, this.height);

        let fps = 3;

        if (this.timeElapsed > fps) {
            this.lastFrameTime = this.currentFrameTime - (this.timeElapsed % fps);
            let colors = [
                "white",
                "green",
                "pink",
                "blue",
                "yellow",
                "red",
                "purple"
            ];
            
            let randomColor = Math.floor(Math.random() * (colors.length - 1))

            this.context.fillStyle = colors[randomColor];
            this.context.beginPath();
            let rand_x = Math.random() * this.width;
            let rand_y = Math.random() * this.height - 100;
            this.context.arc(rand_x, rand_y, 2, 0, 2 * Math.PI);
            this.context.fill();
            this.context.closePath();
        }


        
    }

    gameOver() {
        this.audioGameOver.play();
        this.endGame = true;
        this.confetti();
        this.drawMessage("Congratulations! You finished all levels");
    }

    drawMessage(message) {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 400, this.width, 100);
        if (this.frameCount <= 30) {
            this.context.fillStyle = "black";
            this.context.fillRect(0, 400, this.width, 100);
            this.context.font = "8px 'Press Start 2P'";
            this.context.fillStyle = "white";
            this.context.fillText(message, 40, 440);
        }
    }



    finishLevel() {

        // iterates through map tiles, first through the x axis, then through the y axis

        for (let y = 0; y < this.map.mapH; y++) {

            for (let x = 0; x < this.map.mapH; x++) {

                // while iterating through the x axis, iterates through the "pushable" objects on map

                for (let i = 0; i < this.map.objectsArr.length; i++) {

                    // if we select the tile that on the map level was written using the number "2"...

                    if (this.map.gameMap[this.map.toIndex(x, y)] == 2) {

                        // and if on that cell there is an object...

                        if (x == this.map.objectsArr[i].tileFrom[0] && y == this.map.objectsArr[i].tileFrom[1]) {

                            // and if that object is "special"...

                            if (this.map.objectsArr[i].special === true) {
                                this.levelCompleted = true;
                                this.audioLevelCompleted.play();

                                // console.log("YOU WON");
                            } else {
                                // if it's not special, it "destroys" the object
                                this.map.objectsArr.splice(i,1);
                            }
                        }
                    }
                }
            }
        }
    }

    update() {
        
        // increase frameCount if the current second in the game animation is equal to the current second now
        let sec = Math.floor(Date.now() / 1000);
        if (sec != this.currentSecond) {
            this.currentSecond = sec;
            this.framesLastSecond = this.frameCount;
            this.frameCount = 1;
        } else {
            this.frameCount++;
        }
        
        // calculates current frame time
        this.currentFrameTime = Date.now();
        
        // calculates time elapsed since the last loop
        this.timeElapsed = this.currentFrameTime - this.lastFrameTime;

        // launches update method of the player in order to render movement animation
        this.player.update();

        // checks if level is finished
        this.finishLevel();

        if (this.levelCompleted) {
            this.drawMessage("Level completed!" + " Press Z to continue...");
        }

        if (this.endGame) {
           
            this.gameOver();
            // this.drawFrameRate();
        }

        // console.log(this.pushCount)
    }

    animation() {
        this.draw();
        this.update();

        this.animationId = window.requestAnimationFrame(() => {
            if (this.gameOn) {
                this.animation();
            }

        });


    }
}