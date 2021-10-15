var score = 1000; 
var right = 0;
var wrong = 0;
var skipped = 0;
/*
var sec = 15; // time you start out with for each game
var time = setInterval(gameTimer, 1000);
*/

// creates structure of questions
function Question(level, question, answer, wrong1, wrong2, wrong3){
    this.level = level;
    this.question = question;
    this.answer = answer;
    this.wrong1 = wrong1;
    this.wrong2 = wrong2;
    this.wrong3 = wrong3;
}

//all level one questions
var level1 = [
    new Question ('1', 'If Jamie has three apples and gives two of them away, how many apples does she have?', '1', '2', '3', '4')
    new Question ('1', 'If Vix has five potions and he buys three more, how many potions does he have?', '8', '2', '5', '3')
]

/*
function gameTimer(){
    document.getElementById('time').innerHTML = sec + "sec left";
    sec--;
    if (sec < 0){
        clearInterval(time);
        alert("Out of time");
    }
}
*/

var timer = document.getElementById('time');
var timerID = setInterval(countDown, 1000);
var current_time = 6 * 60;
var min;
var sec;

function countDown(){
    if (current_time <= 0)
        {
            alert('Game Over');
        }
    else
        {
            min = Math.floor(current_time / 60);
            sec = current_time % 60;
            timer.innerHTML = min + ':' + sec;
            current_time--;
        }
}




