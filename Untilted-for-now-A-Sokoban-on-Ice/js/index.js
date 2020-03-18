const canvas = document.querySelector("canvas");
let currentLevel = level1;

const game = new Game(canvas, currentLevel);

window.addEventListener("keypress", event => {
    if (event.keyCode === 13) {
        game.start();
    }
});

