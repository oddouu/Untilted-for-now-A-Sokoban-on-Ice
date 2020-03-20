// selects the canvas through DOM and saves it into a variable
const canvas = document.querySelector("canvas");

// loads all levels into an array. each one of them is contained in separated files, each one has its own map.
const levels = [
    level1,
    level2,
    level3
];

// initialize the index for the levels array to zero
let indexLevels = 0;

// creates 'game' variable by using the canvas stored previously and the 'levels' array, initially at position 0 (level 1) 
let game = new Game(canvas, levels[indexLevels]);

// event listener for starting the game -> should be a button, but for now is the enter key
window.addEventListener("keypress", event => {
    if (event.keyCode === 13) {
        game.start();
    }

    // iterates through levels once the level has been completed. If it's the last level, should show a "thanks for playing screen/animation"
    if (game.levelCompleted === true) {

        if (indexLevels!==levels.length-1) {
            indexLevels++;
            game = new Game(canvas, levels[indexLevels]);
            game.start();
        } else {
            // location.reload();
        }
        
    }
});



