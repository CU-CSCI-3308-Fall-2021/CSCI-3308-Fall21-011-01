var score = 1000; 
var right = 0;
var wrong = 0;
var skipped = 0;
var sec = 15; // time you start out with for each game
var time = setInterval(gameTimer, 1000);

const riddles = [1,2,3,4,5,6,7,8,9,10]; // array of riddles

function gameTimer(){
    document.getElementById('timer').innerHTML = sec + "sec left";
    sec--;
    if (sec < 0){
        clearInterval(time);
        alert("Out of time");
    }
}