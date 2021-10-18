var player=
{
  x: 500,
  y: 0,
}


var rocklist=[
  {

  },
];

var rocklen=0

var c;
var ctx;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

var drawcount=0;
var rockfrequency=70;
var nextrock = 0;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var score = 0;

// player width and height
var plwidth=10;
var plheight=50;

var ded=false;
var canvaswidth;

const spdincfrq=1000;
const spdinc=1;
var nextspd=0;
var spd=1;

function addrock(rockx)
{
  var rockt=
  {
    x: rockx, // adds rock at random x coord
    y: player.y-400, // adds rock at top of screen
    in: true,
  }
  for(var i=0;i<rocklen;i++)
  {
    if(rocklist[i].in==false)
    {
      rocklist[i]=rockt;
      return(1)
    }
  }

  rocklist[rocklen]=rockt;
  rocklen++;

}

function addstage()
{
  var options = Math.round(Math.random())+2
  var option1x=Math.round(Math.random()/options)
}

function removerock(id)
{
  id.in=false;
}

function keyDownHandler(event) {
  if(event.keyCode == 39) {
      rightPressed = true;
  }
  if(event.keyCode == 37) {
      leftPressed = true;
  }
  if(event.keyCode == 40) {
    downPressed = true;
  }
  if(event.keyCode == 38) {
    upPressed = true;
  }
}

function keyUpHandler(event) {
  if(event.keyCode == 39) {
      rightPressed = false;
  }
  if(event.keyCode == 37) {
      leftPressed = false;
  }
  if(event.keyCode == 40) {
    downPressed = false;
  }
  if(event.keyCode == 38) {
    upPressed = false;
  }
}

function draw() {

  if(!ded)
  {

    // add rock when 
    if(player.y<=nextrock)
    {
      addrock(Math.random()*(canvaswidth-rxwidth));
      nextrock-=rockfrequency;
      console.log("rocks: " + rocklen);
    }

    // speed stuff?
    if(player.y<=nextspd)
    {
      spd+=spdinc;
      nextspd-=spdincfrq;
      console.log("speed: " + spd);
    }

    ctx.clearRect(0, 0, c.width, c.height);
    player.y-=spd;

    // move with arrows
    if(rightPressed) {
        player.x += 5;
    }
    if(leftPressed) {
        player.x -= 5;
    }
    if(upPressed) {
        player.y-= 5;
    }
    if(player.x<0)
    {
      player.x=0;
    }

    // if player gets to edge of screen
    if(player.x+plwidth>canvaswidth)
    {
      player.x=canvaswidth-plwidth;
    }

    // adds player to screen
    ctx.drawImage(plimage,player.x,500)

    // working with rocks
    for(var i=0;i<rocklen;i++)
    {

      // removes rocks once they go off screen
      if(rocklist[i].y-player.y>800)
      {
        removerock(rocklist[i]);
      }

      // if player hits a rock
      if(rocklist[i].y-player.y+rxheight>=500&&rocklist[i].y-player.y<=500+plheight)
      {
        console.log("rock y close");

        if(rocklist[i].x+rxwidth>=player.x&&rocklist[i].x<=player.x+plwidth)
        {
          console.log("nice throw loser");

          openModal();
          document.body.style.backgroundColor = "#555";

          ded=true;
        }

      }

      ctx.drawImage(rximage,rocklist[i].x,rocklist[i].y-player.y);
      //ctx.strokeText(rocklist[i].y-player.y,rocklist[i].x+5,rocklist[i].y-player.y+20)

    }

    ctx.strokeText(Math.abs(player.y),10,20)
    window.requestAnimationFrame(draw);

  }
}

function drawcanvas()
{
  c = document.getElementById("myCanvas");
  canvaswidth=c.width;

  ctx = c.getContext("2d");
  plimage = document.getElementById('playerimage');
  plwidth=plimage.width;
  console.log("player width: " + plwidth);
  plheight=plimage.height;
  console.log("player height: " + plheight);

  rximage = document.getElementById('rockimage');
  rxwidth=rximage.width;
  console.log("rock width: " + rxwidth);
  rxheight=rximage.height;
  console.log("rock height: " + rxheight);
  draw();

}

function openModal(){

var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");

modal.style.display = "block";

span.onclick = function() {
  modal.style.display = "none";
}

randomEquation();

}

function randomEquation(){

var symbol = [
  "+",
  "-"
];

var chosensymbol = symbol[Math.floor(Math.random() * 2)];
var randomnum1 = Math.floor(Math.random() * 10);
var randomnum2 = Math.floor(Math.random() * 10);

var equationstring = String(randomnum1) + " " + String(chosensymbol) + " " + String(randomnum2);

document.getElementById("fart").innerHTML = equationstring;



}