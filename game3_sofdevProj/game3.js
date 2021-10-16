var score = 1000; 
var right = 0;
var wrong = 0;
var skipped = 0;
/*
var sec = 15; // time you start out with for each game
var time = setInterval(gameTimer, 1000);
*/

// creates structure of questions
class Question {
    constructor(level, question, answer, wrong1, wrong2, wrong3) {
        this.level = level;
        this.question = question;
        this.answer = answer;
        this.wrong1 = wrong1;
        this.wrong2 = wrong2;
        this.wrong3 = wrong3;
    }
}

//all level one questions
var level1 = [
    new Question ('1', 'If Jamie has three apples and gives two of them away, how many apples does she have?', '1', '2', '3', '4'),
    new Question ('1', 'If Vix has five potions and he buys three more, how many potions does he have?', '8', '2', '5', '3')
];

var level2 = [
    new Question ('2', 'Ash has one-hundred fifty one pocket monsters, but can only hold six at a time.  The pocket monsters he can’t hold are kept with the professor.  How many pocket monsters are being kept with the professor if Ash is carrying six pocket monsters?', '145', '157', '6', '151'),
    new Question ('2', 'Kylie is taking 16 credits total this semester in college, if she decides to add another class that is four credits, how many credits will she be taking?', '20', '16', '4', '12')
];

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

//timer function
var timer = document.getElementById('time');
var timerID = setInterval(countDown, 1000);
var current_time = 5 * 60;
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
            timer.innerHTML =  min + ':' + sec;
            current_time--;
        }
}
///

//load questions
function loadQuestion() {
    var randomVar;
    var question = document.getElementById('question');
    if (score <= 800)
        {
            //generate question 700-800 range
            randomVar = getRandomInt(0,1);
            question.innerHTML = level1[randomVar].question;
        }
    else if (score <= 900)
        {
            randomVar = getRandomInt(0,1);
            question.innerHTML = level2[randomVar].question;
        }
    else if (score <= 1000)
        {
            randomVar = getRandomInt(0,1);
            question.innerHTML = level2[0].question;
        }
    else
        {
            randomVar = getRandomInt(0,1);
            question.innerHTML = level2[randomVar].question;
        }
}
///

// check if right

function checkRight()
    {
        //if right
            // add to score
        //else
            // sub from score
        loadQuestion(score);
    }


