const mapLevelFour = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 5, 5, 5, 5, 5, 5, 1, 0,
    0, 1, 5, 5, 5, 3, 5, 5, 1, 0,
    0, 1, 5, 3, 5, 5, 5, 5, 1, 0,
    0, 1, 5, 5, 5, 2, 3, 5, 1, 0,
    0, 1, 5, 5, 3, 5, 5, 5, 1, 0,
    0, 1, 5, 5, 5, 5, 5, 5, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

const objectsLevelFour = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];


let level4 = new Tilemap(game, mapLevelFour, objectsLevelFour, 1, 1);