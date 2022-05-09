// ########## Code Writen By Soumitra Saha from India ################### //
//Email Id: soumitrosaha0fficial@gmail.com
//Todo: Assign a sepecific key to all the buttons for make the game more interactive.


var buttonColours = ["red", "blue", "green", "yellow"]; // Array for the Color:
var gamePattern = []; // =>For declearing game pattern:
var userClickedPattern = []; //-> For Storing user chosen Colors.

var started = false;
var level = 0;
// ##### Game Start Conditon ####### //
$(document).on("keydown", function(event) {
  // console.log(event.key);
  if (!started) {
    if (event.key == "Enter") {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  }
})

//  #### Detecting Button Click ########## //
$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  //Pushing the userChosenColor to the empty Array
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);  // ==> For checking the code.
  playSound(userChosenColor);
  animatePress(userChosenColor);  //For animation button pressed;
  checkAnswer(userClickedPattern.length - 1);
});


//#### Main Function #### //
function nextSequence() {
  userClickedPattern = [];
  level++; // ==>For every nextSequence() level increases
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);//Storing the random Numbers in a Variable
  var randomChosenColor = buttonColours[randomNumber];//Variable for random Chosen Color
  gamePattern.push(randomChosenColor);//Pushing the random color to the empty array gamePattern[]:

  //Selecting the button id as denoted by the randomChosenColour
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);  //Playing the sound for the buttons
}

// ######## Other Functions ######### //
// ### function for playing the corresponding sound ### //
function playSound(name) {
  var btnSound = new Audio("sounds/" + name + ".mp3");
  btnSound.play();
}

// #### key press/clicked color blink function ####### //
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $(".btn").removeClass("pressed");
  }, 150);
}


// ##### Function for Checking the Answer ###### //
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(()=>{
        nextSequence();
      }, 1000)
    }
  }
  else {
    // console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("Game Over, <br><br> Press 'Enter' to Restart");
    setTimeout(()=>{$("body").removeClass("game-over");}, 250);
    startOver(); //Calling Start Over /function;
  }
}

// ######## Restart Function ##### //
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
