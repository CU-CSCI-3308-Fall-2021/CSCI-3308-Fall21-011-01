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
app.get('/login', (req, res) => { //go to login page
    res.render(__dirname + '/Views/login');
});

app.get('', (req, res) => { //go to login page
    res.render(__dirname + '/Views/login');
});

// going to home page as user   
app.post('/home', (req, res) => { 
    let username=req.body.username;
    if(username=="no user")
    {
        res.render(__dirname + '/Views/login.ejs')
    }
    res.render(__dirname + '/Views/home.ejs',{
        user: username
    });
});

// going to login page
app.post('/login', (req, res) => { 
    res.render(__dirname + '/Views/login.ejs',{
    });
});

app.post('/Login/login', (req, res) => { //login as current user
    
    let username = req.body.usrlogin;
    let password = req.body.passlogin;
    var queery = "SELECT COUNT(*) FROM user_table_better WHERE username='"+username+"' and pass_word = '"+password+"';";
    db.task('get-everything', task =>{
        return task.batch([
            task.any(queery),
        ]);
    })
    .then(data => {
        result = data[0][0].count
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

// going to scores page
app.post('/scores', (req, res) => { 
    let username=req.body.username;
    let sortby=req.body.sortby;
    let requested=req.body.want;

    if(sortby==undefined)
    {
        sortby="game1_score";
    }
    if(requested==undefined)
    {
        requested="5";
    }

    requested=parseInt(requested);
    var issuperuser = "SELECT COUNT(*) FROM user_table_better WHERE username='"+username+"' AND supervisor_variable = '1';";
    var highScores1 = "SELECT * FROM user_table_better ORDER BY reported_variable, "+sortby+" DESC;";

    db.task('get-everything', task => {
		return task.batch([
			task.any(highScores1),
            task.any(issuperuser)
		]);
	})
    
    .then(data => {
        var supervise = data[1][0].count;
        var length = data[0].length;
        var end=requested;
        var display=[];
        var self;
        var rank=0;
        const displayranks=[requested-4,requested-3,requested-2,requested-1,requested];
        for(i=0;i<5;i++)
        {

            if((data[0][i+requested-5])==undefined)
            {
                display[i]=["","","","","","","","","","",""]
            }
            else
            {
                display[i]=Object.values(data[0][i+requested-5])
            }
            
        }
        var found= false;
        i=0
        while(!found)
        {   
            if(Object.values(data[0][i])[0]==username)
            {
                self=Object.values(data[0][i]);
                rank=i+1;
                break;
            }
            i++
        }
        var lastrow =[]
        for(i=0;i<5;i++)
        {
            lastrow[i]=""
        }
        bonusname=""
        if(supervise==1)
        {
            for(i=0;i<5;i++)
            {
                if(display[i][10]==1)
                {
                    lastrow[i]=" 1 <a class='btn btn-default' type='button' onclick="+"unreport('"+display[i][0]+"')"+"> unflag?  <span class='sr-only'>(current)</span></a>"
                }
                else
                {
                    lastrow[i]=" 0 <a class='btn btn-default' type='button' onclick="+"report('"+display[i][0]+"')"+"> flag?  <span class='sr-only'>(current)</span></a>"
                }
            }
            bonusname="reported?"
        }
        res.render(__dirname + '/Views/scores.ejs',{
            user: username,
            bonusrow: lastrow,
            report: bonusname,
            userplace: self,
            userrank: rank,
            score: display,
            maxsize: length,
            max: end,
            ranks:displayranks
        });
	})

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
        result = data[0][0].count
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

// -- GAME 1-----

//inputting score
app.post('/game1', (req, res) => { 
    let score = req.body.value;
    let username=req.body.username;
    var update = "UPDATE user_table_better SET game1_score = '"+score+"' WHERE username = '"+username+"' AND game1_score < '"+score+"';"; //edit plays and highscore
    var incriment = "UPDATE user_table_better SET game1_attempts=game1_attempts+1 WHERE username = '"+username+"';";
    db.task('update', task =>{
        return task.batch([
            task.any(update),
            task.any(incriment),
        ]);
    })
});

app.post('/report', (req, res) => { 
    let changeval = req.body.to;
    let username=req.body.username;
    var update = "UPDATE user_table_better SET reported_variable = '"+changeval+"' WHERE username = '"+username+"';"; //edit plays and highscore
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

app.post('/riddles', (req, res) => {  //to riddle game
    let username=req.body.username;
    res.render(__dirname + '/Views/game33.ejs',{
        user: username
    });
});


app.listen(3000);

