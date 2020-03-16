class Tile {
    constructor(game,x,y) {
        this.context = game.context;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.slippery = true;
        this.accessible = true;
    }

    draw() {
        this.context.save();
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.fillStyle = "black";
        this.context.strokeRect(this.x,this.y,this.width,this.height);
        this.context.restore();
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