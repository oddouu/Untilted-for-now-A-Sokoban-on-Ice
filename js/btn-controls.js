// select command buttons through DOM
const buttonClicked = {
    13: document.getElementById("en-btn"),
    37: document.getElementById("lx-btn"),
    38: document.getElementById("up-btn"),
    39: document.getElementById("rx-btn"),
    40: document.getElementById("dn-btn"),
    90: document.getElementById("ax-btn")
};

const $prev = document.getElementById("prev-lv");
const $next = document.getElementById("next-lv");


// set command buttons through onclick event listeners. using timeouts in order to not interfere with keyboard commands.
window.onload = () => {


    // console.log(buttonClicked)

    buttonClicked[13].onclick = () => {
        game.start();
    };
    buttonClicked[37].onclick = () => {
        game.player.keysDown[37] = true;
        setTimeout(() => {
            game.player.keysDown[37] = false;
        }, 10);
    };
    buttonClicked[38].onclick = () => {
        game.player.keysDown[38] = true;
        setTimeout(() => {
            game.player.keysDown[38] = false;
        }, 10);
    };
    buttonClicked[39].onclick = () => {
        game.player.keysDown[39] = true;
        setTimeout(() => {
            game.player.keysDown[39] = false;
        }, 10);
    };
    buttonClicked[40].onclick = () => {
        game.player.keysDown[40] = true;
        setTimeout(() => {
            game.player.keysDown[40] = false;
        }, 10);
    };
    buttonClicked[90].onclick = () => {
        game.player.keysDown[90] = true;
        setTimeout(() => {
            game.player.keysDown[90] = false;
        }, 500);
    };

    $prev.onclick = () => {
        if (indexLevels !== 0) {
            indexLevels--;
            game.gameOn = false;
            game = new Game(canvas, levels[indexLevels].map);
            drawLevelName();
            game.start();
        } else {
            // play error sound
        }


    };

    $next.onclick = () => {
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

    };
    
};
