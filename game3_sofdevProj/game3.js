const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));// gets an array of all the choices
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {} /* used let bc now when you call startgame() at the bottom*/
let acceptingAnswers = true /* these are the exact values used */
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [ /* used let, so you can't redeclare questions*/
    {
        question: "What is 2*2",
        choice1: '2',
        choice2: '4',
        choice3: '20',
        choice4: '16',
        answer: 2, /*this associates the answer with choice2 */ 
    },
    {
        question: "What is 40+40",
        choice1: '40',
        choice2: '82',
        choice3: '80',
        choice4: '0',
        answer: 3,
    },
    {
        question: "What is 2^2",
        choice1: '2',
        choice2: '4',
        choice3: '200',
        choice4: '16',
        answer: 2,
    },
    {
        question: "What is 2*20 + 2",
        choice1: '2',
        choice2: '40',
        choice3: '44',
        choice4: '42',
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

//on load game start
startGame = () => { /* sets all the vars to their intitial vals*/
     questionCounter = 0
     score = 0
     availableQuestions = [questions] /* there needs to be a way to update available question
     in the getNewQuestion function*/
     getNewQuestion() 
}

getNewQuestion = () => {
    //score
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){ /* checks if you've reached all the questions*/
        /*save the user's score and go to a new page where it displays the user's
        results and also has a button to get you back to the home page or game3.html */ 
    }
    // progress bar
    questionCounter++
    // use backticks `` in order to include the values of the variables
    progressText.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}` // progressText should now update to i.e. "Question 2 of 4"
    progressBarFull.innerHTML  = `${(questionCounter/MAX_QUESTIONS) * 100}%`// user innerText instead of innerHTMl to select the text between the start and end tag
    const questionsIndex = Math.floor(Math.random() = availableQuestions.length) // randomly selects the question to prompted 
    currentQuestion = availableQuestions[questionsIndex]
    question.innerHTML = currentQuestion.question // this should display the actual question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1) // update the available questions

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => { // answer you click on
        if(!acceptingAnswers) return // no longer can answer

        acceptingAnswers = false // answer is in, can't re-do your answer
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number'] // accesses the correct answer for the question

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect' // figure out if right or wrong

        if(classToApply === 'correct'){ // correct answer chosen
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply) // not sure what I was doing here
            // might have to delete these
        setTimeout(() => { // or here either
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

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

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()


