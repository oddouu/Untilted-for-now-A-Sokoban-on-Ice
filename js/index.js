// selects the canvas through DOM and saves it into a variable
const canvas = document.getElementById("game");
let start = false;

// loads all levels into an array of objects. each one of them is contained in separated files, each one has its own map.
let levels = [{
        name: "Level 1-1",
        map: level1,
        completed: false
    },
    {
        name: "Level 1-2",
        map: level2,
        completed: false
    },
    {
        name: "Level 1-3",
        map: level3,
        completed: false

    },
    {
        name: "level 1-4",
        map: level4,
        completed: false

    },
    {
        name: "level 1-5",
        map: level5,
        completed: false

    },
    {
        name: "level 2-1",
        map: level6,
        completed: false

    },
    {
        name: "level 2-2",
        map: level7,
        completed: false

    },
    {
        name: "level 2-3",
        map: level8,
        completed: false

    },
    {
        name: "level 2-4",
        map: level9,
        completed: false

    },
    {
        name: "level 2-5",
        map: level10,
        completed: false

    }
];

// // function to reset levels condition
// function refreshLevels() {

//     level1 = new Tilemap(game, mapLevelOne, objectsLevelOne, 3, 4);
//     level2 = new Tilemap(game, mapLevelTwo, objectsLevelTwo, 1, 2);
//     level3 = new Tilemap(game, mapLevelThree, objectsLevelThree, 1, 1);
//     level4 = new Tilemap(game, mapLevelFour, objectsLevelFour, 1, 1);
//     level5 = new Tilemap(game, mapLevelFive, objectsLevelFive, 5, 7);
//     level6 = new Tilemap(game, mapLevelSix, objectsLevelSix, 3, 4);
//     level7 = new Tilemap(game, mapLevelSeven, objectsLevelSeven, 0, 1);
//     level8 = new Tilemap(game, mapLevelEight, objectsLevelEight, 1, 5);
//     level9 = new Tilemap(game, mapLevelNine, objectsLevelNine, 0, 3);
//     level10 = new Tilemap(game, mapLevelTen, objectsLevelTen, 1, 1);

//     levels = [{
//             name: "Level 1-1",
//             map: level1,
//             completed: false
//         },
//         {
//             name: "Level 1-2",
//             map: level2,
//             completed: false
//         },
//         {
//             name: "Level 1-3",
//             map: level3,
//             completed: false

//         },
//         {
//             name: "level 1-4",
//             map: level4,
//             completed: false

//         },
//         {
//             name: "level 1-5",
//             map: level5,
//             completed: false

//         },
//         {
//             name: "level 2-1",
//             map: level6,
//             completed: false

//         },
//         {
//             name: "level 2-2",
//             map: level7,
//             completed: false

//         },
//         {
//             name: "level 2-3",
//             map: level8,
//             completed: false

//         },
//         {
//             name: "level 2-4",
//             map: level9,
//             completed: false

//         },
//         {
//             name: "level 2-5",
//             map: level10,
//             completed: false

//         }
//     ];

// }

// function to draw level name
function drawLevelName() {
    game.context.fillStyle = "black";
    game.context.fillRect(300, 400, 100, 100)

    game.context.fillStyle = "white";
    game.context.font = "10px 'Press Start 2P'";
    game.context.fillText(levels[indexLevels].name, 300, 450);

}

function highlightCompleted() {
    if (levels[indexLevels].completed) {
        game.context.fillStyle = "green";
    } else {
        game.context.fillStyle = "red";
    }
    game.context.fillRect(390,490,10,10);
}

// initialize the index for the levels array to zero
let indexLevels = 0;

// creates 'game' variable by using the canvas stored previously and the 'levels' array, initially at position 0 (level 1) 
let game = new Game(canvas, levels[indexLevels].map);


let t1 = setInterval(() => {
    game.context.fillStyle = "black";
    game.context.fillRect(0, 0, game.width, game.height);
    game.context.font = "10px 'Press Start 2P'";
    game.context.fillStyle = "white";
    game.context.fillText("Press ENTER to start", 100, 400);
}, 500);

let t2 = setInterval(() => {
    game.context.fillStyle = "black";
    game.context.fillRect(0, 0, game.width, game.height);
}, 1000);


// event listener for starting the game -> should be a button, but for now is the enter key
window.addEventListener("keypress", event => {
    if (event.keyCode === 13 && !start) {
        game.start();
        clearInterval(t1);
        clearInterval(t2);
        start = true;

    }

    // draws on HUD the level name
    drawLevelName();



    // iterates through levels once the level has been completed. If it's the last level, should show a "thanks for playing screen/animation"
    if (game.levelCompleted === true) {
        levels[indexLevels].completed = true;
        if (indexLevels !== levels.length - 1) {
            console.log(levels);
            indexLevels++;
            game.gameOn = false;
            game = new Game(canvas, levels[indexLevels].map);
            game.start();
            drawLevelName();
            highlightCompleted();
        } else {
            let completedLevels = 0;
            for (let i = 0; i < levels.length; i++) {
                if (levels[i].completed) {
                    completedLevels++;
                }
            }

            if (levels.length === completedLevels) {
                game.gameOver();
            }

        }

    }
});