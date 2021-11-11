/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
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
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

// Login Page:

// Route to login page
app.get('/login', (req, res) => {
    res.sendFile('/Login/login.html');
});

// Get entered user data from registry and insert into table

app.post('/Login/login', (req, res) => {
    
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email
    
    var taken = "SELECT COUNT(*) FROM user_table WHERE username='{username}'";

    // see if username is already in database
    if(taken == 0){
        var insert = "INSERT INTO user_table(username, pass_word, email) VALUES ('"+username+"','"+password+"','"+email+"') ON CONFLICT DO NOTHING";
    }else{
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

        res.render('Home/home',{
            // render home page after they registered

           
        })  

    })
    .catch(err =>{

        // display error message on screen
        console.log('error happened');

    });

});