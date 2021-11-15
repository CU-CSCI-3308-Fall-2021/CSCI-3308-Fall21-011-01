
// so we can redirect with POST request in order to keep the current user logged in
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

  // sends more information to the webpage so user can view a specified amount
  function sortBy(path, sortvar,want=5,method='POST') {
    user=document.getElementById("usernamedropdown").innerHTML
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = 'username';
    hiddenField.value = user;
    form.appendChild(hiddenField);
    const bruh = document.createElement('input');
    bruh.type = 'hidden';
    bruh.name = 'sortby';
    bruh.value = sortvar;
    form.appendChild(bruh);
    const wanted = document.createElement('input');
    wanted.type = 'hidden';
    wanted.name = 'want';
    wanted.value = want;
    form.appendChild(wanted);
    document.body.appendChild(form);
    form.submit();
  }

  // calls sortBy with user inputted view they want
  function changeView(left, change=true)
  {
    maxsize=parseInt(document.getElementById("maxsize").innerHTML)
    maxsize=Math.ceil(maxsize/5)*5
    currsize=parseInt(document.getElementById("maxdisplayed").innerHTML)
    if(change==true)
    {
      if(left)
      {
        currsize-=5;
      }
      else
      {
        currsize+=5;
      }
      if(currsize<5)
      {
        currsize=5;
      }
      if(currsize>maxsize)
      {
        currsize=maxsize
      }
    }
    sortBy('/scores','game1_score',currsize);
  }

  // for supervisor, makes it so you can alter  and refresh the webpage, toggles reported var in datbase
  function report(name)
  {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/report", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        username: name,
        to: 1
    }));
    changeView(false,false)
  }

  function unreport(name)
  {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/report", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        username: name,
        to: 0
    }));
    changeView(false,false)
  }

  function showtable(){
    console.log("happen");
    var table = document.getElementById("nerdtable");
    
    if(table.style.display == "block"){
      table.style.display = "none";
    }else{
      table.style.display = "block";
    }
  }
  