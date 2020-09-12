
// Global Variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


// Next Sequence generated by Computer function
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Check the user click button matches the computer genrated color button
$(".btn").click(function() {
  var userChoseColour = $(this).attr("id");
  userClickedPattern.push(userChoseColour);
  playSound(userChoseColour);
  animatePress(userChoseColour);
  checkAnswer(userClickedPattern.length - 1);
});

//function which plays approipiate sound per button and if its wrong.
function playSound(fileName) {
  var music = new Audio("sounds/" + fileName + ".mp3");
  music.play();
}

// function which helps to animate button on click
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Function used at staring to get anyKey press event to start game.
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Function help to check all the pattern clicked by user is coreect or wrong .
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("Game Over, Press Any Key to Reastart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

// function helps to reset the global variable when game is over.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
