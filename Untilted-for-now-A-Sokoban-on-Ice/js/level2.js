const mapLevelTwo = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 5, 0,
    0, 5, 5, 5, 3, 5, 5, 5, 5, 0,
    0, 5, 5, 5, 5, 5, 5, 5, 5, 0,
    0, 5, 5, 5, 5, 5, 2, 5, 5, 0,
    0, 5, 5, 3, 5, 5, 5, 5, 5, 0,
    0, 5, 5, 5, 5, 5, 5, 5, 5, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

// let objectsLevelOne = [];

// objectsLevelOne.push (new Object(game));
// objectsLevelOne[0].placeAt(2,4);
// objectsLevelOne.push (new Object(game));
// objectsLevelOne[1].placeAt(6,4)


const objectsLevelTwo = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];


const level2 = new Tilemap(game, mapLevelTwo, objectsLevelTwo, 1, 2);