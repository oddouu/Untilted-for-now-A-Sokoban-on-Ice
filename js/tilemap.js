class Tilemap {
    constructor(game, map, objectsMap, playerStartX, playerStartY) {
        this.context = game.context;
        this.gameMap = map;
        this.objectsMap = objectsMap;
        this.objectsMapCopy = [...objectsMap];
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
                name: "background-boundaries",
                colour: "#91A8A9",
                floor: this.floorTypes.solid,
                sprite: [{
                    x: 140,
                    y: 70,
                    w: 70,
                    h: 70,

                }]
            },
            1: {
                name: "regular-path",
                colour: "#91a8a9",
                floor: this.floorTypes.path,
                sprite: [{
                    x: 0,
                    y: 0,
                    w: 70,
                    h: 70,
                }]
            },
            2: {
                name: "ending-level-path",
                colour: "#8AA7A9",
                floor: this.floorTypes.path,
                sprite: [{
                    x: 975,
                    y: 0,
                    w: 63,
                    h: 63,
                }]
            },
            3: {
                name: "rock-boundaries",
                colour: "#394041",
                floor: this.floorTypes.solid,
                sprite: [{
                    x: 140,
                    y: 70,
                    w: 70,
                    h: 70,
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
                colour: "#A7C1C2",
                floor: this.floorTypes.ice,
                sprite: [{
                    x: 630,
                    y: 280,
                    w: 70,
                    h: 70,
                }]
            }
        };


        this.playerStartX = playerStartX;
        this.playerStartY = playerStartY;

        this.tileset = new Image();
        this.tileset.src = "https://i.imgur.com/S5QsFAF.png";
        // this.tileset.src = "https://i.imgur.com/DXMcSlx.png";


    }

    draw() {
        for (let y = 0; y < this.mapH; y++) {

            for (let x = 0; x < this.mapH; x++) {
                let tile = this.tileTypes[this.gameMap[this.toIndex(x, y)]];

                game.context.fillStyle = tile.colour;
                game.context.fillRect(x * this.tileW, y * this.tileH, this.tileW, this.tileH);

                if (tile.colour === "#8AA7A9") {
                    game.context.drawImage(this.tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h, x * this.tileW + 2.5, y * this.tileH + 2.5, this.tileW - 5, this.tileH - 5)
                } else {
                    game.context.drawImage(this.tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h, x * this.tileW, y * this.tileH, this.tileW, this.tileH)
                }



                for (let i = 0; i < this.objectsArr.length; i++) {
                    this.objectsArr[i].draw();
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

                let tile = this.objectsMap[this.toIndex(x, y)];

                //creates objects based on objects level map
                if (tile !== 0) {
                    let tempObject = new Object(game);
                    tempObject.placeAt(x, y);
                    
                    if (tile === 1) {
                        tempObject.special = true;
                    }
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