class Character {

    // The Character class will store the coordinates of the tiles the Character is currently moving from and to (tileFrom, tileTo), the time (in milliseconds) at which the Character began to move (timeMoved), the dimensions of the Character in pixels (dimensions), the true position of the Character on the Canvas in pixels (position), and the time (in milliseconds) it will take the Character to move 1 tile (delayMove).

    constructor(game) {
        this.context = game.context;
        this.tileFrom = [1, 1];
        this.tileTo = [1, 1];
        this.timeMoved = 0;
        this.dimensions = [30, 30];
        this.position = [45, 45];
        this.delayMove = 100;
        this.keysDown = {
            37: false,
            38: false,
            39: false,
            40: false
        };
        this.directions = {
            up: 0,
            right: 1,
            down: 2,
            left: 3
        };
        this.direction = this.directions.up;
    }

    setControls() {

        window.addEventListener("keydown", event => {

            if (event.keyCode >= 37 && event.keyCode <= 40) {
                this.keysDown[event.keyCode] = true;
            }

        });

        window.addEventListener("keyup", event => {
            if (event.keyCode >= 37 && event.keyCode <= 40) {
                this.keysDown[event.keyCode] = false;
            }
        });

    }

    placeAt(x, y) {

        // placeAt method, which will allow us to place the Character on the tile we specify. This will help with initially placing the character, and resetting movement related properties to the new tile.

        this.tileFrom = [x, y];
        this.tileTo = [x, y];

        // calculate position of the Character in the canvas?
        this.position = [((game.map.tileW * x) + ((game.map.tileW - this.dimensions[0]) / 2)), ((game.map.tileH * y) + ((game.map.tileH - this.dimensions[1]) / 2))];

    }

    canMoveTo(x, y) {
        // check if x and y coordinates fall within map bounds. if they don't, return false.
        if (x < 0 || x >= game.map.mapW || y < 0 || y >= game.map.mapH) {
            return false;
        }

        // check if the target position matches floorTypes.path or floorTypes.ice value in the game map. If it's not, return false.
        if (game.map.tileTypes[game.map.gameMap[game.map.toIndex(x, y)]].floor != game.map.floorTypes.path &&
            game.map.tileTypes[game.map.gameMap[game.map.toIndex(x, y)]].floor != game.map.floorTypes.ice) {
            return false;
        }

        // if all these checks are passed, return true.
        return true;
    }

    canMoveDirection(direction) {
        switch (direction) {
            case this.directions.up:
                return this.canMoveUp();
            case this.directions.down:
                return this.canMoveDown();
            case this.directions.left:
                return this.canMoveLeft();
            default:
                return this.canMoveRight();
        }
    }

    moveDirection(direction, time) {
        switch (direction) {
            case this.directions.up:
                return this.moveUp(time);
            case this.directions.down:
                return this.moveDown(time);
            case this.directions.left:
                return this.moveLeft(time);
            default:
                return this.moveRight(time);
        }
    }

    // the following four methods will call the canMoveTo() method and check if the Character can move in that direction.
    canMoveUp() {
        return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] - 1);
    }

    canMoveDown() {
        return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] + 1);
    }

    canMoveLeft() {
        return this.canMoveTo(this.tileFrom[0] - 1, this.tileFrom[1]);
    }

    canMoveRight() {
        return this.canMoveTo(this.tileFrom[0] + 1, this.tileFrom[1]);
    }

    // the following four methods will process Character movement depending on its direction.

    moveUp(t) {
        this.tileTo[1] -= 1;
        this.timeMoved = t;
        this.direction = this.directions.up;

    }

    moveDown(t) {
        this.tileTo[1] += 1;
        this.timeMoved = t;
        this.direction = this.directions.down;

    }

    moveLeft(t) {
        this.tileTo[0] -= 1;
        this.timeMoved = t;
        this.direction = this.directions.left;
    }

    moveRight(t) {
        this.tileTo[0] += 1;
        this.timeMoved = t;
        this.direction = this.directions.right;

    }

    processMovement(t) {
        if (this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) {
            return false;
        }

        if ((t - this.timeMoved) >= this.delayMove) {
            this.placeAt(this.tileTo[0], this.tileTo[1]);

            // check if character is on an active tile (e.g. ice)
            let tileFloor = game.map.tileTypes[game.map.gameMap[game.map.toIndex(this.tileFrom[0], this.tileFrom[1])]].floor;
            console.log(tileFloor); // <== prints the target floor type

            // sliding movement?
            if (tileFloor == game.map.floorTypes.ice) {
                if (this.canMoveDirection(this.direction)) {
                    this.moveDirection(this.direction, t);
                }
            }

        } else {
            this.position[0] = (this.tileFrom[0] * game.map.tileW) + ((game.map.tileW - this.dimensions[0]) / 2);
            this.position[1] = (this.tileFrom[1] * game.map.tileH) + ((game.map.tileH - this.dimensions[1]) / 2);

            if (this.tileTo[0] != this.tileFrom[0]) {
                let diff = (game.map.tileW / this.delayMove) * (t - this.timeMoved);
                this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff);
            }

            if (this.tileTo[1] != this.tileFrom[1]) {
                let diff = (game.map.tileH / this.delayMove) * (t - this.timeMoved);
                this.position[1] += (this.tileTo[1] < this.tileFrom[1] ? 0 - diff : diff);
            }

            this.position[0] = Math.round(this.position[0]);
            this.position[1] = Math.round(this.position[1]);
        }

        return true;
    }



    draw() {
        this.context.save();
        this.context.fillStyle = "pink";
        this.context.fillRect(this.position[0], this.position[1],
            this.dimensions[0], this.dimensions[1]);
        this.context.restore();
    }

    update() {

        if (!this.processMovement(game.currentFrameTime)) {
            if (this.keysDown[38] && this.canMoveUp()) {
                this.moveUp(game.currentFrameTime);
            } else if (this.keysDown[40] && this.canMoveDown()) {
                this.moveDown(game.currentFrameTime);
            } else if (this.keysDown[37] && this.canMoveLeft()) {
                this.moveLeft(game.currentFrameTime);
            } else if (this.keysDown[39] && this.canMoveRight()) {
                this.moveRight(game.currentFrameTime);
            }
        }
    }




}