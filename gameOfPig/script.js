(function() {
    "use strict";

    const startgame = document.querySelector('#startgame');
    const gamecontrol = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const actionArea = document.querySelector('#actions');
    const score = document.querySelector('#score');

    const gameData = {
        dice: ['1die.jpg', '2die.jpg', '3die.jpg', '4die.jpg', '5die.jpg', '6die.jpg'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    startgame.addEventListener('click', function() {

        gameData.index = Math.round(Math.random()); //we choodes random number between 0 and 1

        gamecontrol.innerHTML = '<h2>The game has started</h2>';
        gamecontrol.innerHTML += '<button id="quit">Do you want to Quit ?</button>';

        document.querySelector('#quit').addEventListener('click', function() {
            location.reload();
        });

        //console.log(gameData.index);

        setUpTurn();

    });

    function setUpTurn() {
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
        document.querySelector('#roll').addEventListener('click', function() {

            throwDice();
        });
    }

    function throwDice() {
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src='${gameData.dice[gameData.roll1 - 1] }'>`;
        game.innerHTML += `<img src='${gameData.dice[gameData.roll2 - 1] }'>`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;


        if (gameData.roll1 == 1 && gameData.roll2 == 1) {
            game.innerHTML += "<p>Oh snap you got snake eyes </p>";
            gameData.score[gameData.index] = 0;
            gameData.index ? gameData.index = 0 : gameData.index = 1; //switching the turns 
            checkWinningCondition();
            setTimeout(setUpTurn, 2000);
        } else if (gameData.roll1 == 1 || gameData.roll2 == 1) {
            gameData.index ? gameData.index = 0 : gameData.index = 1; //switching the turns 
            game.innerHTML += `<p>you rolled a 1 .switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000)
        } else {
            gameData.score[gameData.index] += gameData.rollSum;
            actionArea.innerHTML = `<button id="rollAgain">Roll Again</button> or <button id="pass">Pass</button>`;

            document.querySelector('#rollAgain').addEventListener('click', function() {
                throwDice();
            });

            document.querySelector('#pass').addEventListener('click', function() {
                gameData.index ? gameData.index = 0 : gameData.index = 1; //switching the turns 
                setUpTurn();
            })
            checkWinningCondition();
        }
    }

    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points</h2>`;
            actionArea.innerHTML = '';
            document.querySelector('#quit').innerHTML = "Start a New Game";
        } else {
            score.innerHTML = `The score is ${gameData.players[0]} : ${gameData.score[0]} and ${gameData.players[1]} : ${gameData.score[1]}`;

        }
    }
})();