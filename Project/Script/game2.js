// global variables
var timeLeft = -3;
var levelScore = 0;
var gameScore = 0;
var Level = 1;
var mathSymbol;
var x;
var y;
// array of problems (0-19)
const problems = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
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
        document.getElementById("start-btn").style.visibility = "hidden";
    }
}

// timer function:
var elem = document.getElementById('some_div');
var timerId = setInterval(countdown, 1000);
function countdown() {
    if (timeLeft == -3){
        console.log("start");
    }
    else if (timeLeft == -1) {
        showGame('game', 0);
        showGame('contain', 1);
        checkNext();
        timeLeft = -3;
        // showGame('game',1);
        //clearTimeout(timerId);
    } 
    else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        console.log(timeLeft);
        timeLeft--;
    }
}
//run game function
function runGame(){
    document.getElementById("answer").value = '';
    showGame('game',1);
    showGame('restart-btn', 1);
    showGame('contain', 1);
    //console.log("run game");
    timeLeft = 30;
    countdown();
    levelScore = 0;
    document.getElementById("levelScore").innerHTML = 0;
    document.getElementById("gameScore").innerHTML = gameScore;
    document.getElementById("currLevel").innerHTML = Level;
    loadProblem(Level);
    
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
    mathSymbol = getRandomInt(1,4);
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
        x = getRandomInt(9,20);
        y = getRandomInt(9,20);
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
function checkAnswer(answer){

    console.log("check answer");
    console.log(answer);
    var solution;
    switch(mathSymbol){
        case 1:
            solution = x+y;
            break;
        case 2:
            solution = x-y;
            break;
        case 3:
            solution = x*y;
            break;
    }
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
        document.getElementById("answer").value = '';
        document.getElementById("levelScore").innerHTML = levelScore;
        loadProblem(Level);
    }
    // if the answer is not correct
    else{
        alert("Wrong answer. Try again!");
        document.getElementById("answer").value = '';
    }
}

// check for next level
function checkNext(){
    document.getElementById("levelScore").innerHTML = levelScore;
    document.getElementById("gameScore").innerHTML = gameScore;
    if (levelScore >= (15*Level)){
        if (Level == 3){
            alert("Congratulations! You have completed all the levels!");
            showGame('restart-btn', 1);
            showGame('send-btn', 1);
        }
        else{
            alert("Congratulations! You passed level " + Level);
            showGame('next-btn', 1);
            showGame('restart-btn', 1);
        }
    }
    else{
        showGame('restart-btn', 1);
        alert("You needed " + (Level*15 - levelScore) + " more points to pass the level.");
        
    }
}

function nextLevel(){
    Level++;
    gameScore += levelScore;
    showGame('game', 1);
    showGame('next-btn', 0);
    showGame('contain', 1);
    runGame();
    document.getElementById("gameScore").innerHTML = gameScore;
}

function pushScores(){
    user = document.getElementById("usernamedropdown").innerHTML;
    console.log("in push scores");
    var xhr = new XMLHttpRequest();
      xhr.open("POST", "/game2", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
          username: user,
          value: gameScore
      }));
      showGame('newGame-btn', 1);
}

function newGame(){
    gameScore = 0;
    Level = 1;
    showGame('send-btn', 0);
    showGame('game', 1);
    showGame('next-btn', 0);
    showGame('contain', 1);
    runGame();
}

