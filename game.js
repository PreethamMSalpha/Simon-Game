var started = false;

var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var randomNumber;

var userClickedPattern = [];

var randomChosenColour;

$(document).keypress(function (){
	if (!started) {
		started = true;
		
		$("h1").text("Level "+level);

		nextSequence();
	}
});


$(".btn").click(function() {
	var userChosenColour = this.id;
	//var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);

	$("#"+userChosenColour).fadeOut(100).fadeIn(100); 

	playSound(userChosenColour);

	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length - 1);


});


function nextSequence(){
	userClickedPattern = [];

	level++;
	$("#level-title").text("Level " + level);

	randomNumber = Math.floor(Math.random()*4);
	//console.log(randomNumber);
	randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);


	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour);


}

function checkAnswer(currentLevel) {

	//to check if the most recent user answer is the same as the game pattern.
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

		if (userClickedPattern.length === gamePattern.length) {

			setTimeout(function(){
				nextSequence();
			}, 1000);

		}


	} else {
		playSound("wrong");

		$("body").addClass("game-over");

		setTimeout(function() {
			$("body").removeClass("game-over");
		}, 2000);

		$("#level-title").text("Game Over, Press Any Key to Restart");

		startOver();
	}
}


function playSound(name){
	var audio = new Audio("sounds/"+name+".mp3");
	audio.play();

}

function animatePress(currentColour){
	$("#" + currentColour).addClass("pressed");
	setTimeout(function() {$("#" + currentColour).removeClass("pressed");}, 100 );
}

function startOver(){
	level = 0;
	started = false;
	gamePattern = [];
}