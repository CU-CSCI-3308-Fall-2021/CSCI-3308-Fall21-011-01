// global variables
var timeLeft = 30;
var levelScore = 0;
var gameScore = 0;
var Level = 1;
// array of problems (0-19)
const problems = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,22,25,28,33,42
]
// show game
function showGame(id, toggle){
    if (toggle == 0){
        document.getElementById(id).style.visibility = "hidden";
        document.getElementById(id).style.height = "0";
    }
    else{
        document.getElementById(id).style.visibility = "visible";
        document.getElementById(id).style.height = "auto";   
    }
}

// timer function 
var elem = document.getElementById('some_div');
var timerId = setInterval(countdown, 1000);
function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timerId);
    } else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
}
//run game function
function runGame(){
    console.log("run game");
    timeLeft = 30;
    // countdown();
    console.log("timer");
    console.log(timeLeft);
    levelScore = 0;
    while (timeLeft >= 0){
        loadProblem(Level);
    }
    console.log("loaded problem")
    if (levelScore >= (Level*10)){

    }
}

function getRandomInt (min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

//load problem function
function loadProblem(Level){
    var solution;
    // randomize addition, subtraction, or multiplication
    var mathSymbol = getRandomInt(1,3);
    var x, y;
    // generate the numbers for the problemss
    if (Level == 1){
        // load problem from indexes 0-9
        x = getRandomInt(0,9);
        y = getRandomInt(0,9);
    }
    else if (Level == 2){
        // load problem from indexes 5-15
        x = getRandomInt(5,15);
        y = getRandomInt(5,15);
    }
    else if (Level == 3){
        // load problem from indexes 10-19
        x = getRandomInt(9,19);
        y = getRandomInt(9,19);
    }
    
    // calculate the solution and display the digits and math symbol on the screen
    switch(mathSymbol){
        case 1: // addition
            // calculate the correct answer
            solution = x + y;
            // display x, y, and mathSymbol in the correct place on the screen
            document.getElementById("firstNum").innerHTML = x;
            document.getElementById("secondNum").innerHTML = y;
            document.getElementById("mathSymbol").innerHTML = " + "
            break;
        case 2: // subtraction
            // calculate the correct answer
            solution = x - y;
            // display x, y and mathSymbol in the correct place on the screen
            document.getElementById("firstNum").innerHTML = x;
            document.getElementById("secondNum").innerHTML = y;
            document.getElementById("mathSymbol").innerHTML = " - "
            break;
        case 3: //multiplication
            // calculate the correct answer
            solution = x * y;
            // display x, y and mathSymbol in the correct places on the screen
            document.getElementById("firstNum").innerHTML = x;
            document.getElementById("secondNum").innerHTML = y;
            document.getElementById("mathSymbol").innerHTML = " * "
            break;
    }
}
//answer function
function checkAnswer(solution, answer, Level, mathSymbol){
    // if the answer is correct
    if (answer == solution){
        switch(mathSymbol){
            case 1: // addition
                levelScore += (1*Level);
                break;
            case 2: // subtraction
                levelScore += (2*Level);
                break;
            case 3: // multiplication
                levelScore += (3*Level);
                break;
        }
    }
    // if the answer is not correct
    else{
    }
}


