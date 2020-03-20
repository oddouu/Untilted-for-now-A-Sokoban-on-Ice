class Tilemap {
    constructor(game, map, objectsMap, playerStartX, playerStartY) {
        this.context = game.context;
        this.gameMap = map;
        this.objectsMap = objectsMap;
        this.objectsArr = [];
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
                floor: this.floorTypes.solid,
                sprite: [{
                    x: 8,
                    y: 140,
                    w: 12,
                    h: 12,
                }]
            },
            1: {
                colour: "#5aa457",
                floor: this.floorTypes.path,
                sprite: [{
                    x: 53,
                    y: 156,
                    w: 10,
                    h: 15,
                }]
            },
            2: {
                colour: "#e8bd7a",
                floor: this.floorTypes.path,
                sprite: [{
                    x: 69,
                    y: 155,
                    w: 15,
                    h: 15,
                }]
            },
            3: {
                colour: "#286625",
                floor: this.floorTypes.solid,
                sprite: [{
                    x: 117,
                    y: 171,
                    w: 15,
                    h: 15,
                }]
            },
            4: {
                colour: "#678fd9",
                floor: this.floorTypes.water,
                sprite: [{
                    x: 187,
                    y: 250,
                    w: 15,
                    h: 15,
                }]
            },
            5: {
                colour: "#eeeeff",
                floor: this.floorTypes.ice,
                sprite: [{
                    x: 187,
                    y: 219,
                    w: 15,
                    h: 15,
                }]
            }
        };


        this.playerStartX = playerStartX;
        this.playerStartY = playerStartY;

        this.tileset = new Image();
        this.tileset.src = "https://i.imgur.com/OP3gmeh.png";
        this.tileset.onload = game.draw;

    }

    draw() {
        for (let y = 0; y < this.mapH; y++) {

            for (let x = 0; x < this.mapH; x++) {

                game.context.fillStyle = this.tileTypes[this.gameMap[this.toIndex(x, y)]].colour;
                game.context.fillRect(x * this.tileW, y * this.tileH, this.tileW, this.tileH);

                let tile = this.tileTypes[this.gameMap[this.toIndex(x,y)]];

                game.context.drawImage(this.tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h, x * this.tileW, y* this.tileH, this.tileW, this.tileH)

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