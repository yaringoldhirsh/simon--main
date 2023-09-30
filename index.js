
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];//To Know With Pattern Is Chosen
var userClickedPattern = [];// User Click

var started = false;
var level = 0;

//In Any Keypress Strat The Game
$(document).keypress(function() {
  if (!started) {
    $("#title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".start-game").click(function(){
  if (!started) {
    $("#title").text("Level " + level);
    $(".start-game").text("Start Game");
    nextSequence();
    started = true;
  }
})


//Catch The User Click 
$(".btn").click(function() {  

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//Check The User Answer
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#title").text("Game Over, Press Any Key to Restart");
      $(".start-game").text("Play Again");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//Create The Button Animate When Chosen
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}