
function openModal() {
   
    var myInput = document.getElementById("psw");
    var confirmMyInput = document.getElementById("cpsw");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    var match = document.getElementById("match");
  
    // When the user starts to type something inside the password field
    myInput.onkeyup = function () {
     // console.log(letter.classList);
  
  
      var lowerCaseLetters = /[a-z]/g; 
      var numbers = /[0-9]/g; 
 
  
      // Validate lowercase letters
      if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
      }
  
      // Validate numbers
      if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
      } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
      }
     
    };

    confirmMyInput.onkeyup = function () {
  

      if (myInput.value == confirmMyInput.value) {
        match.classList.remove("invalid");
        match.classList.add("valid");
      } else {
        match.classList.remove("valid");
        match.classList.add("invalid");
      }

      //enableButton(letter, capital, number, length);
    };

  }
  
  function enableButton(letter, capital, number, length, match) {
    
    var button = document.getElementById("submitbutton");
    
    if (letter.classList.contains("valid") == true &&  number.classList.contains("valid") ) {
      //button.disabled = false;
      
    } 
  
  } 
  
  function onClickFunction() {
    alert("Hey! I'm all green! Well done.");
  }
  
  // dropdown btn
  function dropdownfunc() {
    console.log("did it");
    var but = document.getElementById("myDropdown")
    if(but.style.visibility=="visible")
    {
      but.style.visibility = "hidden";
    }
    else
    {
      but.style.visibility = "visible";
    }
  }
  
 