class Tilemap {
    constructor(game, map, objectsMap, playerStartX, playerStartY) {
        this.context = game.context;
        this.gameMap = map;
        this.objectsMap = objectsMap;
        this.objectsArr = [];
        this.tileW = 32;
        this.tileH = 32;
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
                name: "background-boundaries",
                colour: "#685b48",
                floor: this.floorTypes.solid,
                sprite: [{
                    x: 0,
                    y: 0,
                    w: 32,
                    h: 32,
                }]
            },
            1: {
                name: "regular-path",
                colour: "#5aa457",
                floor: this.floorTypes.path,
                sprite: [{
                    x: 0,
                    y: 130,
                    w: 30,
                    h: 30,
                }]
            },
            2: {
                name: "ending-level-path",
                colour: "#e8bd7a",
                floor: this.floorTypes.path,
                sprite: [{
                    x: 32,
                    y: 128,
                    w: 32,
                    h: 32,
                }]
            },
            3: {
                name: "rock-boundaries",
                colour: "#286625",
                floor: this.floorTypes.solid,
                sprite: [{
                    x: 0,
                    y: 0,
                    w: 32,
                    h: 32,
                }]
            },
            4: {
                name: "sign-post",
                colour: "#678fd9",
                floor: this.floorTypes.solid,
                sprite: [{
                    x: 288,
                    y: 96,
                    w: 30,
                    h: 30,
                }]
            },
            5: {
                name: "ice",
                colour: "#eeeeff",
                floor: this.floorTypes.ice,
                sprite: [{
                    x: 128,
                    y: 64,
                    w: 31,
                    h: 31,
                }]
            }
        };


        this.playerStartX = playerStartX;
        this.playerStartY = playerStartY;

        this.tileset = new Image();
        this.tileset.src = "https://i.redd.it/6ijfbw25ld221.png";
        // this.tileset.onload = game.draw;

    }

    draw() {
        for (let y = 0; y < this.mapH; y++) {

            for (let x = 0; x < this.mapH; x++) {

                // game.context.fillStyle = this.tileTypes[this.gameMap[this.toIndex(x, y)]].colour;
                // game.context.fillRect(x * this.tileW, y * this.tileH, this.tileW, this.tileH);

                let tile = this.tileTypes[this.gameMap[this.toIndex(x, y)]];

                game.context.drawImage(this.tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h, x * this.tileW, y * this.tileH, this.tileW, this.tileH)

                for (let i = 0; i < this.objectsArr.length; i++) {
                    this.objectsArr[i].draw();

                    if (this.objectsMap[this.toIndex(x, y)] == 0 && this.objectsArr[i].tileFrom[0] == x && this.objectsArr[i].tileFrom[1] == y) {
                        this.objectsMap[this.toIndex(x, y)] = 1;

                    } else {
                        this.objectsMap[this.toIndex(x, y)] = 0;
                    }
                }
            }
        }


    }
    placeCharacter() {
        game.player.placeAt(this.playerStartX, this.playerStartY);
    }

    initializeObjects() {

        for (let y = 0; y < this.mapH; y++) {

            for (let x = 0; x < this.mapH; x++) {

                //creates objects based on objects level map
                if (this.objectsMap[this.toIndex(x, y)] == 1) {
                    let tempObject = new Object(game);
                    tempObject.placeAt(x, y);
                    this.objectsArr.push(tempObject);
                    // console.log(this.objectsArr);
                }
            }
        }
    }


    // Obtains index of each tile depending on its coordinates, where "map.cols" is the total amount of columns of our map: 
    //index = row * map.cols + column
    toIndex(x, y) {
        return ((y * this.mapW) + x);
    }

    update() {
        this.draw();
        // for (let i = 0; i < this.objectsArr.length; i++) {
        //     this.objectsArr[i].setControls();
        // }
    }

}