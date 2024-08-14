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

function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

function stopGame() {
  clearInterval(timer);
  time = 15;
  return "game over";
}

function checkGameStatus(time) {
  if (time > 0) {
    const timeoutID = showUp();
    const delay = getTimeDelay('normal');
    gameTimeout = setTimeout(() => checkGameStatus(time - 1), delay);
    
    return gameTimeout;
  } else {
    return stopGame();
  }  
}

function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

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

function setEventListeners() {
  moles.forEach(moles) => moles.addEventListeners("click", whack));
  return moles;
}

function setDuration(duration) {
  time = duration;
  return time;
}

function stopGame(){
  stopAudio(song);
  clearInterval(timer);
  time = 15;
  return "Game Over";
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
