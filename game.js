userClickedPattern=[];
var gamePattern=[];

var buttonColors=["red", "blue", "green", "yellow"];
var level=0;
var started=false;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+ level).css("animation-play-state","paused");
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentLevel){
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
}
else{

playSound("wrong");
$("body").addClass("game-over");
setTimeout(function(){
    $("body").removeClass("game-over");;
}, 200);
$("h1").text("Game Over, Press Any Key to Restart");
startOver();
}
}

function startOver(){
level=0;
gamePattern=[];
started=false;
}

function playSound(name){
    var audio=new Audio("sounds/" + name +".mp3");
    audio.play();
}

function animatePressed(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    },100);
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level).css("animation-play-state","paused");
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
}

$(".btn").click(function(){
var userChosenColour= $(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePressed(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});
