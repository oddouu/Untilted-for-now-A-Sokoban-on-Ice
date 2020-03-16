const canvas = document.querySelector("canvas");
const game = new Game(canvas);

function imageOnLoad() {
    game.draw();
}

window.addEventListener("keypress", event => {
    if (event.keyCode === 13) {
        game.start();
    }
});