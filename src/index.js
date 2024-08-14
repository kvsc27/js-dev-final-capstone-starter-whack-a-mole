const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector("#score"); // Uses querySelector() to get the score element
const timerDisplay = document.querySelector("#timer"); // uses querySelector() to get the timer element.

let time = 15;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "easy";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else {
    return randomInteger(600, 1200);
  }
}
  
function chooseHole(holes) {
const index = randomInteger(0, 8);
const hole = holes[index];
if (hole === lastHole) {
  return chooseHole(holes);
}
  lastHole = hole;
  return hole;
}

function gameOver() {
  if (time > 0) {
    timeoutId = showUp();
    return timeoutId;
  } else {
    gameStopped = stopGame ();
    return gameStopped;
  }
}  


// Define the showUp function (for example purposes)
function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

// Define the stopGame function
function stopGame() {
  clearInterval(timer);
  time = 15;
  return "game over";
}

// Function to check the game status
function checkGameStatus(time) {
  if (time > 0) {
    // Continue the game and call showUp
    const timeoutID = showUp();

    // Set a new timeout to call checkGameStatus again
    const delay = getTimeDelay('normal');  // Replace 'normal' with the desired difficulty
    gameTimeout = setTimeout(() => checkGameStatus(time - 1), delay);
    
    return gameTimeout;
  } else {
    // Stop the game
    return stopGame();
  }  
}

/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/
function showUp() {
  let delay = 0; // TODO: Update so that it uses setDelay()
  const hole = 0;  // TODO: Update so that it use chooseHole()
  return showAndHide(hole, delay);
}

/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
function showAndHide(hole, delay){
  toggleVisibility(hole);
  
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole); 
    gameOver();
  }, delay); 
  return timeoutID;
}

function toggleVisibility(hole){
  hole.classList.toggle("show");
  return hole;
}

function updateScore() {
  points += 1;
  score.textContent = points;
  return points;
}

/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

function updateTimer() {
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

function whack(event) {
  updateScore()
  return points;
}

/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners(){
  moles.forEach(moles) => moles.addEventListeners("click", whack));
  return moles;
}

function setDuration(duration) {
  time = duration;
  return time;
}

function stopGame(){
  // stopAudio(song);  //optional
  clearInterval(timer);
  time = 15;
  return "game stopped";
}

function startGame() {
  setDuration(time);
  showUp();
  clearScore();
  setEventListeners();
  startTimer();
  return "Let's get WHACKIN'";  // Returns a confirmation message
}

startButton.addEventListener("click", startGame);


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
