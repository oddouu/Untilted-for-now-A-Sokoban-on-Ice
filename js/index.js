// selects the canvas through DOM and saves it into a variable
const canvas = document.getElementById("game");

// selects hud canvas thorugh DOM and saves it into a different variable
// const $canvasHud = document.getElementById("hud");
// $canvasHud.context = $canvasHud.getContext("2d");

// loads all levels into an array. each one of them is contained in separated files, each one has its own map.
const levels = [
    level1,
    // level2,
    // level3
];

// initialize the index for the levels array to zero
let indexLevels = 0;

// creates 'game' variable by using the canvas stored previously and the 'levels' array, initially at position 0 (level 1) 
let game = new Game(canvas, levels[indexLevels]);


let t1 = setInterval(() => {
    game.context.fillStyle = "black";
    game.context.fillRect(0, 0, game.width, game.height);
    game.context.font = "10pt sans-serif";
    game.context.fillStyle = "white";
    game.context.fillText("Press ENTER to start", 140, 400);
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

    // draws on HUD


    // game.context.clearRect(400,400,400,100)
    // game.context.font = "10pt sans-serif";
    // game.context.fillStyle = "#ff0000";
    // game.context.fillText("push: " + game.player.pushCount, 20, 450);



    // iterates through levels once the level has been completed. If it's the last level, should show a "thanks for playing screen/animation"
    if (game.levelCompleted === true) {

        if (indexLevels !== levels.length - 1) {
            indexLevels++;
            game.gameOn = false;
            game = new Game(canvas, levels[indexLevels]);
            game.start();
        } else {
            game.gameOn = false;
            game.gameOver();
        }

    }
});