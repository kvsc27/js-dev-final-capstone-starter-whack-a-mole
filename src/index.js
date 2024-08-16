const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector("#score");
const timerDisplay = document.querySelector("#timer");

let time = 15;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "easy";

//Generates a random number within a range
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Sets a time delay given a difficulty parameter
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else {
    return randomInteger(600, 1200);
  }
}

//Chooses a random hole from a list of holes. Returns one of the 9 holes that is defined
function chooseHole(holes) {
const index = randomInteger(0, 8);
const hole = holes[index];
if (hole === lastHole) {
  return chooseHole(holes);
}
  lastHole = hole;
  return hole;
}

//Calls the showUp function if time > 0 and stops the game if time = 0.This determines if the game should continue or stop. The game continues if(time) >0.
//If there is still time then the 'showUp()' needs to be called afain so that it sets a different delay and different hole.
//If there is no more time the 'stopGame()' function is called and return the timeoutId if the game continues or the string "game stopped" if game is over
function gameOver() {
  if (time > 0) {
    timeoutId = showUp();
    return timeoutId;
  } else {
    gameStopped = stopGame ();
    return gameStopped;
  }
}  
//This funciton calls the showAndHide() function with a specific delay and a hole.
function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

//This function shows and hides the mole given a delay time and the hole where the mole was hidden. The function calls 'toggleVisibility' to show or hide the mole.
function showAndHide(hole, delay){
  toggleVisibility(hole);
  
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole); 
    gameOver();
  }, delay); 
  return timeoutID;
}

//This function  adds or removes the 'show' class that is defined in styles.css to a given hole. It returns a hole.
function toggleVisibility(hole){
  hole.classList.toggle("show");
  return hole;
}

//This function increments the points variable and updates the scoreboard
function updateScore() {
  points += 1;
  score.textContent = points;
  return points;
}

//This function clears the score by setting 'points = 0' and also updates the board using 'score.textContent = points'. It should return the points.
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

//This function updates the board with the timer if time > 0.
function updateTimer() {
	if (time > 0) {
		time -= 1;
		timerDisplay.textContent = time;
	}
	return time;
}

//This function starts the timer using setInterval. For each 1000ms (1 second). The updateTimer function is called and already implemented.
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

//This is the event handler that gets called when a player clicks on a mole. The setEventListeners use this event handler for each of the moles.
function whack(event) {
  updateScore()
  return points;
}

//This funciton adds the 'click' event listeners to the moles.
function setEventListeners() {
	moles.forEach((mole) => mole.addEventListener("click", whack));
	return moles;
}

//This function sets the duration of the game. The time limit, in seconds, that a player has to click on the moles.
function setDuration(duration) {
  time = duration;
  return time;
}

//This function is called when the game is stopped. It clears the imer using clearInterval. Returns "Game Over'.
function stopGame() {
  clearInterval(timer);
  time = 15;
  return "Game Over";
}

//This function starts the game when the 'Start' button is clicked
function startGame() {
  setDuration(time);
  showUp();
  clearScore();
  setEventListeners();
  startTimer();
  return "Let's get WHACKIN";
}

startButton.addEventListener("click", startGame);
}


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
