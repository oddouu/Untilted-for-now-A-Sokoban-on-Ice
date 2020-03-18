const mapLevelOne = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 5, 5, 5, 1, 5, 5, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 5, 5, 5, 5, 5, 5, 1, 0,
    0, 1, 5, 5, 5, 5, 5, 5, 1, 0,
    0, 1, 5, 5, 5, 5, 5, 5, 1, 0,
    0, 1, 5, 5, 5, 5, 5, 5, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

// let objectsLevelOne = [];

// objectsLevelOne.push (new Object(game));
// objectsLevelOne[0].placeAt(2,4);
// objectsLevelOne.push (new Object(game));
// objectsLevelOne[1].placeAt(6,4)


const objectsLevelOne = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];


const level1 = new Tilemap(game, mapLevelOne, objectsLevelOne);