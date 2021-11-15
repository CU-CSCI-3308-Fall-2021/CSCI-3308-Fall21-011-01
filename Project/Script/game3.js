var score = 1000;
var scoreBoard = document.getElementById("score");


let level1 = [
            {q: 'If Jamie has three apples and gives two of them away, how many apples does she have?',
            right: '1',
            c1: '1',
            c2: '2',
            c3: '3',
            c4: '4',
        },
            {q: 'If Vix has five potions and he buys three more, how many potions does he have?',
            right: '8',
            c1: '7',
            c2: '8',
            c3: '5',
            c4: '4',
        },
            {q: 'If Jimmy needs seven pages of paper, and he has three now, how many pages does he need?',
            right: '4',
            c1: '7',
            c2: '3',
            c3: '4',
            c4: '8',
        },
    ]

let level2 = [
            {q: 'Ash has one-hundred fifty one pocket monsters, but can only hold six at a time.  The pocket monsters he can’t hold are kept with the professor.  How many pocket monsters are being kept with the professor if Ash is carrying six pocket monsters?',
            right: '145',
            c1: '6',
            c2: '145',
            c3: '151',
            c4: '157',
        },
            {q: 'Kylie is taking 16 credits total this semester in college, if she decides to add another class that is four credits, how many credits will she be taking?',
            right: '20',
            c1: '16',
            c2: '12',
            c3: '20',
            c4: '4',
        },
            {q: 'Harry is supposed to take seven years of wizarding school, if he does not complete his last year, how many years will he have taken?',
            right: '6',
            c1: '1',
            c2: '6',
            c3: '8',
            c4: '7',
        },
    ]

    let level3 = [
        {q: 'Max has three baskets, each filled with five apples.  How many apples does Max have?',
        right: '15',
        c1: '15',
        c2: '5',
        c3: '8',
        c4: '153',
    },
        {q: 'Ms. Dailey is a teacher and has three kids in her class.  If there are seven classes just like hers, how many students are at the school?',
        right: '21',
        c1: '37',
        c2: '73',
        c3: '21',
        c4: '10',
    },
        {q: 'Chelsea has two rollerblades, each have four wheels, how many wheels does she have in total?',
        right: '8',
        c1: '2',
        c2: '4',
        c3: '8',
        c4: '6',
    },
]

let level4 = [
    {q: 'Susan has three bags full of baseballs.  There are fifteen baseballs in each bag.  How many Baseballs does Susan have in all three bags?',
    right: '45',
    c1: '15',
    c2: '25',
    c3: '35',
    c4: '45',
},
    {q: 'Steve has three full stacks, each stack has 64 diamonds.  How many diamonds does Steve have in total?',
    right: '192',
    c1: '193',
    c2: '191',
    c3: '192',
    c4: '194',
},
    {q: 'There are Seventy Seven pears in a basket, if there are two baskets how many pears are there?',
    right: '154',
    c1: '1414',
    c2: '154',
    c3: '77',
    c4: '2',
},
]

let level5 = [
    {q: 'Max has twenty apples and four baskets.  If he wants to have an equal number of apples in each basket how many apples will there be in each basket?',
    right: '5',
    c1: '4',
    c2: '2',
    c3: '3',
    c4: '5',
},
    {q: 'Davis has twenty math problems to solve, if he solves four an hour, how many hours will it take for him to solve all of the math problems?',
    right: '5',
    c1: '5',
    c2: '3',
    c3: '6',
    c4: '8',
},
    {q: 'If Riley’s wrestling record for the season is thirty wins and three losses, what is his win to loss ratio?',
    right: '10',
    c1: '3',
    c2: '10',
    c3: '0.333',
    c4: '0.1',
},
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

function redir(path, method='POST') {
    user=document.getElementById("usernamedropdown").innerHTML
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = 'username';
    hiddenField.value = user;
    form.appendChild(hiddenField);
    document.body.appendChild(form);
    form.submit();
  }

//on load game start
function startGame() { /* sets all the vars to their intitial vals*/
     questionCounter = 0;
     score = 1000;
     loadQuestion(); 
     countDown();
}

var question = document.getElementById('question');
var choice1 = document.getElementById("C1");
var choice2 = document.getElementById("C2");
var choice3 = document.getElementById("C3");
var choice4 = document.getElementById("C4");


function loadQuestion(){


    var randomVar = Math.floor(Math.random() * 3);
    current_question = randomVar;

    if (score <= 900)
        {
            question.innerHTML = level1[randomVar].q;
            choice1.innerHTML = level1[randomVar].c1;
            choice2.innerHTML = level1[randomVar].c2;
            choice3.innerHTML = level1[randomVar].c3;
            choice4.innerHTML = level1[randomVar].c4;
        }
    else if (score <= 950)
        {
            question.innerHTML = level2[randomVar].q;
            choice1.innerHTML = level2[randomVar].c1;
            choice2.innerHTML = level2[randomVar].c2;
            choice3.innerHTML = level2[randomVar].c3;
            choice4.innerHTML = level2[randomVar].c4;
        }
    else if (score <= 1000)
        {
            question.innerHTML = level3[randomVar].q;
            choice1.innerHTML = level3[randomVar].c1;
            choice2.innerHTML = level3[randomVar].c2;
            choice3.innerHTML = level3[randomVar].c3;
            choice4.innerHTML = level3[randomVar].c4;
        }
    else if (score <= 1050)
        {
            question.innerHTML = level4[randomVar].q;
            choice1.innerHTML = level4[randomVar].c1;
            choice2.innerHTML = level4[randomVar].c2;
            choice3.innerHTML = level4[randomVar].c3;
            choice4.innerHTML = level4[randomVar].c4;
        }
    else 
        {
            question.innerHTML = level5[randomVar].q;
            choice1.innerHTML = level5[randomVar].c1;
            choice2.innerHTML = level5[randomVar].c2;
            choice3.innerHTML = level5[randomVar].c3;
            choice4.innerHTML = level5[randomVar].c4;
        }

}

function checkRight1(){
    //alert(response);

    if (score <= 900)
        {
            if (level1[current_question].right == level1[current_question].c1)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else if (score <= 950)
        {
            if (level2[current_question].right == level2[current_question].c1)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else if (score <= 1000)
        {
            if (level3[current_question].right == level3[current_question].c1)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else if (score <= 1050)
        {
            if (level4[current_question].right == level4[current_question].c1)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else 
        {
            if (level5[current_question].right == level5[current_question].c1)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    
    scoreBoard.innerHTML = score;
    loadQuestion();
}
function checkRight2(){
    //alert(response);

    if (score <= 900)
        {
            if (level1[current_question].right == level1[current_question].c2)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else if (score <= 950)
        {
            if (level2[current_question].right == level2[current_question].c2)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else if (score <= 1000)
        {
            if (level3[current_question].right == level3[current_question].c2)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else if (score <= 1050)
        {
            if (level4[current_question].right == level4[current_question].c2)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else 
        {
            if (level5[current_question].right == level5[current_question].c2)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    scoreBoard.innerHTML = score;
    loadQuestion();
}
function checkRight3(){
    //alert(response);

    if (score <= 900)
        {
            if (level1[current_question].right == level1[current_question].c1)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else if (score <= 950)
        {
            if (level2[current_question].right == level2[current_question].c3)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else if (score <= 1000)
        {
            if (level3[current_question].right == level3[current_question].c3)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else if (score <= 1050)
        {
            if (level4[current_question].right == level4[current_question].c3)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else 
        {
            if (level5[current_question].right == level5[current_question].c3)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    scoreBoard.innerHTML = score;+
    loadQuestion();
}
function checkRight4(){
    //alert(response);

    if (score <= 900)
        {
            if (level1[current_question].right == level1[current_question].c4)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else if (score <= 950)
        {
            if (level2[current_question].right == level2[current_question].c4)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else if (score <= 1000)
        {
            if (level3[current_question].right == level3[current_question].c4)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else if (score <= 1050)
        {
            if (level4[current_question].right == level4[current_question].c4)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    else 
        {
            if (level5[current_question].right == level5[current_question].c4)
                {
                    //alert(score);
                    score = score + 10;
                }
            else
                {
                    //alert('wrong');
                    score = score - 10;
                }
        }
    scoreBoard.innerHTML = score;
    loadQuestion();
}


var timer = document.getElementById('time');
var timerID = setInterval(countDown, 1000);
var current_time = 1 * 10;
var min;
var sec;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function countDown(){
    if (current_time < 0)
        {
            user=document.getElementById("usernamedropdown").innerHTML
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/game3", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                username: user,
                value: Math.round(score)
            }));
            sleep(1000);
            redir("/scoresB");
        }
    else
        {
            min = Math.floor(current_time / 60);
            sec = current_time % 60;
            timer.innerHTML = min + ':' + sec;
            current_time--;
        }
}


