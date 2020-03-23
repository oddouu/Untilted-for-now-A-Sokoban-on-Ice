class Game {
    constructor(canvas, map) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        // referencing the game (this) inside the player class
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
    }

    start() {
        this.reset();
        // console.log("Game started!");
        this.draw();
        this.animation();
    }

    reset() {


        this.map.initializeObjects();
        this.player = new Character(this);
        this.map.placeCharacter();
        this.player.setControls();

        this.player.pushCount = 0;
        this.player.movCount = -1;
        this.gameOn = true;
        this.levelCompleted = false;
    }

    drawFrameRate() {
        //  We see which second it currently is in Unix Time, and if it's the same one as it was last frame we add to the frame count. If not, we set the framesLastSecond to the current frame count, reset the frame count to 0, and update the current second:


        this.context.font = "10pt sans-serif";
        this.context.fillStyle = "#ff0000";
        this.context.fillText("FPS: " + this.framesLastSecond, 10, 20)
    }

    drawPushCount() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 400, this.width, 100);
        this.context.font = "10pt sans-serif";
        this.context.fillStyle = "#ff0000";
        this.context.fillText("push: " + this.player.pushCount, 20, 450)
    }


    draw() {
        this.map.draw();
        this.drawFrameRate();
        this.player.draw();
        this.drawPushCount();
    }

    gameOver() {
        this.drawMessage("Congratulations! You finished all levels")
    }

    drawMessage(message) {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 400, this.width, 100);
        if (this.frameCount <= 30) {
            this.context.fillStyle = "black";
            this.context.fillRect(0, 400, this.width, 100);
            this.context.font = "10pt sans-serif";
            this.context.fillStyle = "white";
            this.context.fillText(message, 70, 430);
        }
    }



    finishLevel() {
        for (let y = 0; y < this.map.mapH; y++) {

            for (let x = 0; x < this.map.mapH; x++) {

                for (let i = 0; i < this.map.objectsArr.length; i++) {
                    if (this.map.gameMap[this.map.toIndex(x, y)] == 2) {
                        if (x == this.map.objectsArr[i].tileFrom[0] & y == this.map.objectsArr[i].tileFrom[1]) {
                            this.levelCompleted = true;
                            // console.log("YOU WON");
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

        // calculates current frame time?
        this.currentFrameTime = Date.now();
        this.timeElapsed = this.currentFrameTime - this.lastFrameTime;

        // launches update method of the player in order to render movement animation
        this.player.update();

        // checks if level is finished
        this.finishLevel();

        if (this.levelCompleted) {
            this.drawMessage("Level completed! Press Z to continue...");
        }

        // console.log(this.movCount)
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