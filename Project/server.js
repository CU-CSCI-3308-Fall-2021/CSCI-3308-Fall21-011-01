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


//--- APP GET AND POST THINGS------------------------------------------


// -----Route to LOGIN page-----

app.get('/home', (req, res) => { //go to gome 
    res.render(__dirname + '/Views/home');
});

app.get('/login', (req, res) => { //go to login page
    res.render(__dirname + '/Views/login');
});


// -- route to SCORES page---
app.get('/scores', (req, res) => { 
    res.render(__dirname + '/Views/scores.ejs');
});



// going to home page as user   
app.post('/home', (req, res) => { 
    let username=req.body.username;
    res.render(__dirname + '/Views/home.ejs',{
        user: username
    });
});

// going to login page
app.post('/login', (req, res) => { 
    res.render(__dirname + '/Views/login.ejs',{
    });
});

// going to scores page
app.post('/scores', (req, res) => { 
    res.render(__dirname + '/Views/scores.ejs',{
    });
});

// -- adds USER and redirects to HOME ----
app.post('/Login/check', (req, res) => {  

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


//---- GAME 3-----

app.get('/game3', (req, res) => {
    res.sendFile(path.join(__dirname, "Games/game_3/game3.html"));
});
app.get('/game33.html', (req, res) => {
    res.sendFile(path.join(__dirname, "Games/game_3/game33.html"));
});



//---- SCORES PAGE-----

app.get('/scores/1topscores', function(req, res){
    console.log("happen");
    var highScores1 = "SELECT game1_score FROM user_table_better ORDER BY game1_score DESC LIMIT 5;";
    db.task('get-everything', task => {
		return task.batch([
			task.any(highScores1),
		]);
	})
    .then(data => {
        console.log("poop:"+data[0].username);
		res.render(__dirname + '/Views/scores.ejs',{
			display: data[0]
		})
	})
    .catch(err => {
		// display error message in case an error
			console.log('error', err);
            res.render(__dirname + '/Views/scores.ejs');
	});

    


});


app.get('/scores/2topscores', function(req, res){
    var highScores2 = "SELECT game2_score FROM user_table_better ORDER BY game2_score DESC LIMIT 5;";
    db.task('get-everything', task => {
		return task.batch([
			task.any(highScores2),
		]);
	})
    .then(data => {
		// console.log(data);
		res.render(__dirname + '/Views/scores.ejs',{
			display: data[0]
		})
	})
    .catch(err => {
		// display error message in case an error
			console.log('error', err);
            res.render(__dirname + '/Views/scores.ejs');
	});

});


app.get('/scores/3topscores', function(req, res){
    var highScores3 = "SELECT game3_score FROM user_table_better ORDER BY game3_score DESC LIMIT 5;";
    db.task('get-everything', task => {
		return task.batch([
			task.any(highScores3),
		]);
	})
    .then(data => {
		// console.log(data);
		res.render(__dirname + '/Views/scores.ejs',{
			display: data[0]
		})
	})
    .catch(err => {
		// display error message in case an error
			console.log('error', err);
            res.render(__dirname + '/Views/scores.ejs');
	});

});




// -- GAME 1-----

//inputting score
app.post('/game1', (req, res) => { 
    let score = req.body.value;
    let username=req.body.username;
    var update = "UPDATE user_table_better SET game1_score = '"+score+"' WHERE username = '"+username+"';"; //edit plays and highscore
    db.task('update', task =>{
        return task.batch([
            task.any(update),
        ]);
    })
});

// 
app.post('/boatGame', (req, res) => {  //to boat game
    let username=req.body.username;
    res.render(__dirname + '/Views/game1H.ejs',{
        user: username
    });
});


app.listen(3000);

