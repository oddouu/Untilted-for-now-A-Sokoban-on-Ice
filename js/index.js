// selects the canvas through DOM and saves it into a variable
const canvas = document.getElementById("game");

// loads all levels into an array of objects. each one of them is contained in separated files, each one has its own map.
const levels = [
    {name: "Level 1-1", map: level1},
    {name: "Level 1-2", map: level2},
    {name: "Level 1-3", map: level3}
];

// function to draw level name
function drawLevelName() {
    game.context.fillStyle = "black";
    game.context.fillRect(300, 400, 100, 100)

    game.context.fillStyle = "white";
        game.context.font = "10px 'Press Start 2P'";
     game.context.fillText(levels[indexLevels].name, 300, 450);

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

// window.addEventListener("load", event => {
//     game.map.tileset.onload = game.map.draw;
// });

// event listener for starting the game -> should be a button, but for now is the enter key
window.addEventListener("keypress", event => {
    if (event.keyCode === 13) {
        game.start();
        clearInterval(t1);
        clearInterval(t2);
    }

    // draws on HUD the level name
    drawLevelName();
   


    // iterates through levels once the level has been completed. If it's the last level, should show a "thanks for playing screen/animation"
    if (game.levelCompleted === true) {

        if (indexLevels !== levels.length - 1) {
            indexLevels++;
            game.gameOn = false;
            game = new Game(canvas, levels[indexLevels].map);
            drawLevelName();
            game.start();
        } else {
            game.gameOn = false;
            game.gameOver();
        }

    }
});