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

var eqlist=[
  {

  },
];
var eqlen=0

var c;
var ctx;
var first=true;
const eqfont='40px sans-serif';
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var drawcount=0;
const icepadding=40;
var rockfrequency=500;
var nextrock = 0;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var score = 0;
var plwidth=10;
var plheight=50;
var rxheight=0;
var rxwidth=0;
var ded=false;
var canvaswidth;
const spdincfrq=1000;
const spdinc=0.1;
var nextspd=0;
var spd=2;

function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}
function geteq()
{
  t1=Math.round(Math.random()*9);
  t2=Math.round(Math.random()*9);
  ans=t2+t1;
  dis=String(t1)+ " + " + String(t2);
  wid= getTextWidth(dis,eqfont)
  var eqt=
  {
    display: dis,
    answer: ans,
    width: wid,
    in: true,
  }
  for(var i=0;i<eqlen;i++)
  {
    if(eqlist[i].in==false)
    {
      eqlist[i]=eqt;
      return(i)
    }
  }
  eqlist[eqlen]=eqt;
  eqlen++;
  return(eqlen-1);
}
function addrock(rockx,eq,wid,hit,ind)
{
  if(eq)
  {
    var rockt=
    {
      x: rockx,
      y: player.y-400,
      in: true,
      width: wid,
      height: hit,
      eq: true,
      eqpointer: ind,
    }
  }
  else
  {
    var rockt=
    {
      x: rockx,
      y: player.y-400,
      in: true,
      eq: false,
      width: rxwidth,
      height: rxheight,
      eqpointer: -1,
    }
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
function removexrange(x,width)
{
  for(i=0;i<rocklen;i++)
  {

  }
}
function addstage()
{
  var cutoff;
  var options = Math.round(Math.random())+2;
  console.log(options)
  var ind1=geteq();
  var opt1w=eqlist[ind1].width+icepadding;
  var ind2=geteq();
  var opt2w=eqlist[ind2].width+icepadding;
  if(options==2)
  {
    var optx1=Math.random()*((canvaswidth-opt1w-opt2w)/options);
    optx1=Math.round(optx1/rxwidth)*rxwidth;
    var optx2=optx1+opt1w+Math.random()*((canvaswidth-opt1w-opt2w)/options);
    optx2=Math.round((optx2-(optx1+opt1w))/rxwidth)*rxwidth+optx1+opt1w;
  }
  else
  {
    var ind3=geteq();
    var opt3w=eqlist[ind3].width+icepadding;
    var optx1=Math.random()*((canvaswidth-opt1w-opt2w-opt3w)/options);
    optx1=Math.round(optx1/rxwidth)*rxwidth;
    var optx2=optx1+opt1w+Math.random()*((canvaswidth-opt1w-opt2w-opt3w)/options);
    optx2=Math.round((optx2-(optx1+opt1w))/rxwidth)*rxwidth+optx1+opt1w;
    var optx3=optx2+opt2w+Math.random()*((canvaswidth-opt1w-opt2w-opt3w)/options);
    optx3=Math.round((optx3-(optx2+opt2w))/rxwidth)*rxwidth+optx2+opt2w;
    addrock(optx3,true,opt3w,rxheight,ind3);
  }
  addrock(optx1,true,opt1w,rxheight,ind1);
  addrock(optx2,true,opt2w,rxheight,ind2);
  cutoff=optx1/rxwidth;
  for(i=0;i<cutoff;i++)
  {
    addrock(i*rxwidth,false);
  }
  cutoff=(optx2-(optx1+opt1w))/rxwidth;
  for(i=0;i<cutoff;i++)
  {
    addrock(i*rxwidth+optx1+opt1w,false);
  }
  if(options==2)
  {
    cutoff=(canvaswidth-(optx2+opt2w))/rxwidth;
    for(i=0;i<cutoff;i++)
    {
      addrock(i*rxwidth+optx2+opt2w,false);
    }
  }
  else
  {
    cutoff=(optx3-(optx2+opt2w))/rxwidth;
    for(i=0;i<cutoff;i++)
    {
      addrock(i*rxwidth+optx2+opt2w,false);
    }
    cutoff=(canvaswidth-(optx3+opt3w))/rxwidth;
    for(i=0;i<cutoff;i++)
    {
      addrock(i*rxwidth+optx3+opt3w,false);
    }
  }
}
function removerock(id)
{
  id.in=false;
  if(id.eq==true)
  {
    eqlist[id.eqpointer].in=false;
  }
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
    if(player.y<=nextrock)
    {
      //addrock(Math.random()*(canvaswidth-rxwidth));
      addstage();
      nextrock-=rockfrequency;
      console.log("rocks: " + rocklen);
      console.log("equations: "+eqlen);
    }
    if(player.y<=nextspd)
    {
      spd+=spdinc;
      nextspd-=spdincfrq;
      console.log("speed: " + spd);
    }
    ctx.clearRect(0, 0, c.width, c.height);
    player.y-=spd;
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
    if(player.x+plwidth>canvaswidth)
    {
      player.x=canvaswidth-plwidth;
    }
    ctx.drawImage(plimage,player.x,500)
    for(var i=0;i<rocklen;i++)
    {
      if(rocklist[i].in)
      {
        if(rocklist[i].y-player.y>800)
        {
          removerock(rocklist[i]);
        }
        if(rocklist[i].y-player.y+rocklist[i].height>=500&&rocklist[i].y-player.y<=500+plheight)
        {
          console.log("rock y close");
          if(rocklist[i].x+rocklist[i].width>=player.x&&rocklist[i].x<=player.x+plwidth)
          {
            console.log("collision");
            if(rocklist[i].eq)
            {
              if(inpt.value == eqlist[rocklist[i].eqpointer].answer)
              {
                removerock(rocklist[i]);
                inpt.value=""
              }
              else
              {
                console.log("nice throw loser, correct answer was " + eqlist[rocklist[i].eqpointer].answer + ", you answered: " + inpt.value);
                ded=true;
              }
            }
            else
            {
              console.log("nice throw loser");
              ded=true;
            }
          }
        }
        if(rocklist[i].eq==false)
        {
          ctx.drawImage(rximage,rocklist[i].x,rocklist[i].y-player.y);
        }
        else
        {
          ctx.drawImage(iceimage,rocklist[i].x,rocklist[i].y-player.y,rocklist[i].width,rxheight);
          ctx.font = eqfont;
          ctx.strokeText(eqlist[rocklist[i].eqpointer].display,rocklist[i].x+icepadding/2,rocklist[i].y-player.y+40)
        }
      }
    }
    ctx.font = '10px sans-serif'
    ctx.strokeText(Math.round(Math.abs(player.y)),10,20)
    window.requestAnimationFrame(draw);
  }
  else
  {
    if(first==true)
    {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/game1", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
          username: user,
          value: Math.round(Math.abs(player.y))
      }));
      first=false;
    }
  }
}

function drawcanvas()
{
  user=document.getElementById("username").innerHTML;
  console.log(user)
  console.log("\n was user \n");
  c = document.getElementById("myCanvas");
  canvaswidth=c.width;
  ctx = c.getContext("2d");
  inpt = document.getElementById('input');
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
  iceimage=document.getElementById('iceimage');
  draw();
}