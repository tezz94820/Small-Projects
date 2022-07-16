let userScore = 0;
let computerScore = 0;
const button_r = document.querySelector('#r');
const button_p = document.querySelector('#p');
const button_s = document.querySelector('#s');
const userScore_span = document.querySelector('#userScore');
const computerScore_span = document.querySelector('#computerScore');
const decision_div = document.querySelector('.decision >p');
const scoreBoard_div = document.querySelector('.scoreBoard');
const graphicBox = document.querySelector('.graphicBox');
const userIcon = document.querySelector('#userIcon');
const computerIcon = document.querySelector('#computerIcon');



//random number creator and assigning it to r , p ,s 
function computerChoice() {
    const choices = ['r', 'p', 's'];
    let random = Math.floor(Math.random() * 3);
    return choices[random];
}

function nameChanger(name) {
    switch (name) {
        case 'r':
            return "Rock";
            break;
        case 's':
            return "Scissor";
            break;
        case 'p':
            return "Paper";
            break;
    }
}

function iconChanger(userChoice, computerChoiceConst) {
    const array = ['fas fa-hand-rock', 'fas fa-hand-paper', 'fas fa-hand-scissors'];
    let userClass;
    let computerClass;

    switch (userChoice) {
        case 'r':
            userClass = array[0];
            break;
        case 'p':
            userClass = array[1];
            break;
        case 's':
            userClass = array[2];
            break;
    }
    switch (computerChoiceConst) {
        case 'r':
            computerClass = array[0];
            break;
        case 'p':
            computerClass = array[1];
            break;
        case 's':
            computerClass = array[2];
            break;
    }
    userIcon.className = userClass;
    computerIcon.className = computerClass;

}

function win(userChoice, computerChoiceConst) {
    userScore++;
    console.log("winner");
    userScore_span.innerHTML = userScore;
    decision_div.innerHTML = `you choosed ${nameChanger(userChoice)} and computer choosed ${nameChanger(computerChoiceConst)} <br></br>    you win !`;
    scoreBoard_div.style.backgroundColor = "green";
}

function lose(userChoice, computerChoiceConst) {
    computerScore++;
    console.log("looser");
    computerScore_span.innerHTML = computerScore;
    decision_div.innerHTML = `you choosed ${nameChanger(userChoice)} and computer choosed ${nameChanger(computerChoiceConst)} <br></br>   you Lose !`;
    scoreBoard_div.style.backgroundColor = "rgb(179, 47, 47)";

}

function draw(userChoice, computerChoiceConst) {
    console.log("draw");
    decision_div.innerHTML = `you choosed ${nameChanger(userChoice)} and computer choosed ${nameChanger(computerChoiceConst)} <br></br>   DRAW ! `;
    scoreBoard_div.style.backgroundColor = "white";

}



function game(userChoice) {
    const computerChoiceConst = computerChoice();
    console.log(`you selected ${userChoice}`);
    console.log(`computer selected ${computerChoiceConst}`);

    if (userChoice == 'r')
        switch (computerChoiceConst) {
            case 's':
                win(userChoice, computerChoiceConst);
                break;
            case 'r':
                computerChoiceConst
                draw(userChoice, computerChoiceConst);
                break;
            case 'p':
                lose(userChoice, computerChoiceConst);
                break;
        }

    else if (userChoice == 'p')
        switch (computerChoiceConst) {
            case 'r':
                win(userChoice, computerChoiceConst);
                break;
            case 'p':
                draw(userChoice, computerChoiceConst);
                break;
            case 's':
                lose(userChoice, computerChoiceConst);
                break;
        }

    else if (userChoice == 's')
        switch (computerChoiceConst) {
            case 'p':
                win(userChoice, computerChoiceConst);
                break;
            case 's':
                draw(userChoice, computerChoiceConst);
                break;
            case 'r':
                lose(userChoice, computerChoiceConst);
                break;
        }
    iconChanger(userChoice, computerChoiceConst);
}




function main() {

    button_r.addEventListener('click', function() {
        game('r');
        graphicBox.style.visibility = "visible";
    })

    button_p.addEventListener('click', function() {
        game('p')
        graphicBox.style.visibility = "visible";

    })

    button_s.addEventListener('click', function() {
        game('s');
        graphicBox.style.visibility = "visible";

    })
}

main();