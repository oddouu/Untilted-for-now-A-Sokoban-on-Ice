class Player {
    constructor(game) {
        this.context = game.context;
        this.x = game.width / 4;
        this.y = game.height / 2;
        this.width = 50;
        this.height = 50;
        this.speedX = 0;
        this.speedY = 0;
    }

    draw() {
        this.context.save();
        this.context.fillStyle = "pink";
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.restore();
    }

    erase() {
        this.context.clearRect(this.x, this.y, this.width, this.height)
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.mapLimits();

    }

    mapLimits() {

        // set left boundaries with whole canvas
        if (this.x < 0) {
            this.speedX = 0;
            this.x = 0;

        }

        // set right boundaries with whole canvas
        if (this.x + this.width > game.width) {
            this.speedX = 0;
            this.x = game.width - this.width;
        }

        // set top boundaries with whole canvas
        if (this.y < 0) {
            this.speedY = 0;
            this.y = 0;
        }

        // set bottom boundaries with whole canvas
        if (this.y + this.height > game.height) {
            this.speedY = 0;
            this.y = game.height - this.height;
        }

    }

    tileLimits(obstacle) {
        return !(
            this.bottom() < obstacle.top() ||
            this.top() > obstacle.bottom() ||
            this.right() < obstacle.left() ||
            this.left() > obstacle.right()
        );
        
    }

    setControls() {
        window.addEventListener("keydown", event => {
            switch (event.keyCode) {
                case 38: // up key
                    this.speedY = -3;
                    break;
                case 40: // down key
                    this.speedY = 3;
                    break;
                case 39: // right key
                    this.speedX = 3;
                    break;
                case 37: // left key
                    this.speedX = -3;
                    break;

            }
        });

        window.addEventListener("keyup", event => {
            this.speedX = 0;
            this.speedY = 0;
        });
    }

    left() {
        return this.x;
    }
    right() {
        return this.x + this.width;
    }
    top() {
        return this.y;
    }
    bottom() {
        return this.y + this.height;
    }

}