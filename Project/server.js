/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
//

var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
const path = require("path");
app.use(express.static(__dirname + '/Style'));//This line is necessary for us to use relative paths and access our resources directory
app.use(express.static(__dirname + '/Script'));

app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies\


var pgp = require('pg-promise')();

const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'project_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

// --- HOME PAGHR -----



// -------- Login Page: --------------

// Route to login page
app.get('/login', (req, res) => { //go to login page
    res.render(__dirname + '/Views/login');
});

// Get entered user data from registry and insert into table


app.post('/game1', (req, res) => { //input score, half implemented
    let score = req.body.value;
    let username=req.body.username;
    var update = "UPDATE user_table_better SET game1_score = '"+score+"' WHERE username = '"+username+"';"; //edit plays and highscore
    db.task('update', task =>{
        return task.batch([
            task.any(update),
        ]);
    })
});

app.post('/home', (req, res) => { //input score, half implemented
    let username=req.body.username;
    res.render(__dirname + '/Views/home.ejs',{
        user: username
    });
});

app.post('/login', (req, res) => { //input score, half implemented
    res.render(__dirname + '/Views/login.ejs',{
    });
});

app.post('/boatGame', (req, res) => {  //to boat game
    let username=req.body.username;
    res.render(__dirname + '/Views/game1H.ejs',{
        user: username
    });
});

app.post('/Login/check', (req, res) => {  //add user and redirect to home

    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    var taken = "SELECT COUNT(*) FROM user_table_better WHERE username='"+username+"';";
    var insert = "INSERT INTO user_table_better(username, pass_word, email, supervisor_variable, game1_score, game1_attempts,game2_score, game2_attempts,game3_score, game3_attempts,reported_variable ) VALUES ('"+username+"','"+password+"','"+email+"',0,0,0,0,0,0,0,0) ON CONFLICT DO NOTHING";
   
    db.task('get-everything', task =>{
        return task.batch([
            task.any(taken),
            task.any(insert)
        ]);
    })
    .then(data => {
        result = data[0][0].count,
        console.log(result)
        console.log("printed in .then");
        if(result==0)
        {
            //worked, user is in the database, direct to the home page
            res.render(__dirname + '/Views/home.ejs',{
				user: username
			})
        }
        else
        {
            //failed, redirect to the login page and complain about the username being taken
            res.render(__dirname + '/Views/login.ejs');
        }
    })
    
});

app.post('/Login/login', (req, res) => { //currently disabled
    
    let username = req.body.usrlogin;
    let password = req.body.passlogin;
    console.log("user: "+String(username)+" is trying to login with pass: "+ String(password)+" \n \n");
    var queery = "SELECT COUNT(*) FROM user_table_better WHERE username='"+username+"' and pass_word = '"+password+"';";
    db.task('get-everything', task =>{
        return task.batch([
            task.any(queery),
        ]);
    })
    .then(data => {
        result = data[0][0].count,
        console.log(result)
        console.log("printed in .then");
        if(result==0)
        {
            //failed, redirect to the login page and complain about not being in the database with that combo
            res.render(__dirname + '/Views/login.ejs');
        }
        else
        {
            //worked send to home
            res.render(__dirname + '/Views/home.ejs',{
				user: username
			})
        }
    })

});


// --------- Game 3: ------------

app.get('/game3', (req, res) => {
    res.sendFile(path.join(__dirname, "Games/game_3/game3.html"));
});
app.get('/game33.html', (req, res) => {
    res.sendFile(path.join(__dirname, "Games/game_3/game33.html"));
});


app.listen(3000);

// TO DO:

// app get for scores page
// app post for scores

// app get and post for game 1 2 3