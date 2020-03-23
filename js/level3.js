const mapLevelThree = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 1, 5, 5, 5, 5, 5, 1, 0, 0,
    0, 1, 5, 5, 5, 1, 5, 1, 0, 0,
    0, 1, 5, 5, 5, 5, 5, 0, 0, 0,
    0, 1, 5, 5, 5, 1, 5, 2, 0, 0,
    0, 1, 5, 5, 5, 5, 5, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

const objectsLevelThree = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];


const level3 = new Tilemap(game, mapLevelThree, objectsLevelThree, 1, 1);