class Tilemap {
    constructor(game, map) {
        this.context = game.context;
        this.gameMap = map;
        this.tileW = 40;
        this.tileH = 40;
        this.mapW = 10;
        this.mapH = 10;
        this.floorTypes = {
            solid: 0,
            path: 1,
            water: 2,
            ice: 3
        };
        this.tileTypes = {
            0: {
                colour: "#685b48",
                floor: this.floorTypes.solid
            },
            1: {
                colour: "#5aa457",
                floor: this.floorTypes.path
            },
            2: {
                colour: "#e8bd7a",
                floor: this.floorTypes.path
            },
            3: {
                colour: "#286625",
                floor: this.floorTypes.solid
            },
            4: {
                colour: "#678fd9",
                floor: this.floorTypes.water
            },
            5: {
                colour: "#eeeeff",
                floor: this.floorTypes.ice
            }
        };

    }

    draw() {
        for (let y = 0; y < this.mapH; y++) {

            for (let x = 0; x < this.mapH; x++) {
                
                game.context.fillStyle = this.tileTypes[this.gameMap[this.toIndex(x,y)]].colour;
                game.context.fillRect(x * this.tileW, y * this.tileH, this.tileW, this.tileH);
            }
        }



    }

    // Obtains index of each tile depending on its coordinates, where "map.cols" is the total amount of columns of our map: 
    //index = row * map.cols + column
    toIndex(x, y) {
        return ((y * this.mapW) + x);
    }

}