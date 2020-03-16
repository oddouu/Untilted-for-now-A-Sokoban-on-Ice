class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        // referencing the game (this) inside the player class
        this.player = new Player(this);
        this.player.setControls(); // calls a method of the player within the game constructor
        this.tiles = [];
        this.animationId;
        this.frame = 0;
        this.gameOn = true;
    }

    createLevel() {
        for (let y = 0; y < this.height; y += 50) {
            for (let x = 0; x < this.width; x += 50) {
                this.tiles.push(new Tile(this, x, y, true, true));
            }
        }

        for (let i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].x === 0 || this.tiles[i].y === 0) {
                this.tiles[i].accessible = false;
                console.log(this.tiles)
            }
        }

    }

    drawLevel() {
        for (let i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].accessible === true) {
                this.context.fillStyle = "grey";
                this.tiles[i].draw();
            } else {
                this.context.fillStyle = "red";
                this.tiles[i].draw();


            }


        }
    }

    start() {
        this.reset();
        console.log("Game started!");
        this.createLevel();
        this.draw();
        console.log(this.tiles);
        this.animation();
    }

    reset() {
        this.player = new Player(this);
        this.player.setControls(); // calls a method of the player within the game constructor
        this.frame = 0;
        this.gameOn = true;
    }

    draw() {

        this.drawLevel();
        this.player.erase();
        this.player.draw();

    }

    update() {
        this.player.update();


         for (let i = 0; i < this.tiles.length; i++) {
         if (this.tiles[i].accessible===true && this.player.tileLimits(this.tiles[i])) {
             // stop the animation if the player walks on a non-accessible tile
            
         }

        }


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