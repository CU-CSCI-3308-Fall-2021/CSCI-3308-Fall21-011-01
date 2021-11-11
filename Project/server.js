/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
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
	port: 3306,
	database: 'tables',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

app.set('view engine', 'html');
//app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory



// -------- Login Page: --------------

// Route to login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/Login/login.html');
});

// Get entered user data from registry and insert into table

app.post('/Login/login', (req, res) => {
    
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email
    
    var taken = "SELECT COUNT(*) FROM user_table WHERE username='"+username+"';";

    // see if username is already in database

    if(taken == 0){
        var insert = "INSERT INTO user_table(username, pass_word, email) VALUES ('"+username+"','"+password+"','"+email+"') ON CONFLICT DO NOTHING";
    }else{
        console.log('taken username');
        // give error message saying username is taken
    }

    // insert into database
    
    db.task('get-everything', task =>{
        return task.batch([
            task.any(insert)
        ]);
    })

    .then(info => {
        
        console.log('success register');

        res.render('Login/login.html',{

            // render home page after they registered

           
        })  

    })
    .catch(err =>{

        // display error message on screen
        console.log('error happened');

    });

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