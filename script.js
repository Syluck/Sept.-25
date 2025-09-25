// Global variables for game state
let scores, currentScore, activePlayer, gamePlaying;

// Select elements from the DOM
const newGameBtn = document.getElementById('new-game-btn');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const recordBtn = document.getElementById('record-btn');
const totalScore0 = document.getElementById('total-0');
const totalScore1 = document.getElementById('total-1');
const currentScore0 = document.getElementById('current-0');
const currentScore1 = document.getElementById('current-1');
const title = document.getElementById('title');

// Event listeners for the buttons
newGameBtn.addEventListener('click', init);
rollDiceBtn.addEventListener('click', rollDice);
recordBtn.addEventListener('click', recordScore);

// Initialize the game
init();

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // Reset UI elements
  totalScore0.textContent = '0';
  totalScore1.textContent = '0';
  currentScore0.textContent = '0';
  currentScore1.textContent = '0';
  title.textContent = 'New Game';

  // Set initial dice image
  document.getElementById('dice-0').src = 'images/dice6.png';
  document.getElementById('dice-1').src = 'images/dice6.png';

  // Highlight player 1 as the starting player
  document.getElementById('player-0-box').classList.add('active-player');
  document.getElementById('player-1-box').classList.remove('active-player');
}

function rollDice() {
  if (!gamePlaying) return;

  // 1. Generate a random dice number
  const dice = Math.floor(Math.random() * 6) + 1;

  // 2. Display the correct dice image
  const activeDiceImg = document.getElementById(`dice-${activePlayer}`);
  activeDiceImg.src = `images/dice${dice}.png`;

  // 3. Check for a roll of 1
  if (dice !== 1) {
    // Add dice value to current score
    currentScore += dice;
    document.getElementById(`current-${activePlayer}`).textContent = currentScore;
  } else {
    // If dice is 1, no score and skip turn
    currentScore = 0;
    document.getElementById(`current-${activePlayer}`).textContent = 'SKIPPED';
    setTimeout(nextPlayer, 1500); // Wait for message to show
  }
}

function recordScore() {
  if (!gamePlaying) return;

  // Add current score to total score
  scores[activePlayer] += currentScore;
  document.getElementById(`total-${activePlayer}`).textContent = scores[activePlayer];
  
  // Check if player won
  if (scores[activePlayer] >= 100) {
    gamePlaying = false;
    title.textContent = 'Game Over';
    document.getElementById(`player-${activePlayer}-box`).classList.add('winner');
    document.getElementById(`player-${activePlayer === 0 ? 1 : 0}-box`).classList.remove('active-player');
  } else {
    nextPlayer();
  }
}

function nextPlayer() {
  // Reset current score and switch to the next player
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = '0';
  activePlayer = activePlayer === 0 ? 1 : 0; // Switch player
  
  // Toggle active player highlight
  document.getElementById('player-0-box').classList.toggle('active-player');
  document.getElementById('player-1-box').classList.toggle('active-player');
  title.textContent = `Player ${activePlayer + 1}'s Turn`;
}