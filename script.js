let secretNumber;
let attempts = 10;
let timer = 20;
let timerInterval;

function startSinglePlayer() {
    const digits = parseInt(prompt("Enter the number of digits for the secret number:"));
    secretNumber = generateRandomNumber(digits);
    showGame();
    startTimer();
    document.getElementById('question').innerText = `Guess the ${digits}-digit number:`;
}

function startTwoPlayer() {
    secretNumber = parseInt(prompt("Player 1: Enter the secret number:"));
    showGame();
    startTimer();
    document.getElementById('question').innerText = "Player 2: Guess the number:";
}

function generateRandomNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showGame() {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.game').style.display = 'block';
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = `Time Left: ${timer} seconds`;
        if (timer === 0) {
            endGame("Time's up! You lose.");
        }
    }, 1000);
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guess').value);
    attempts--;

    if (guess === secretNumber) {
        endGame("Congratulations! You guessed the number.");
    } else if (attempts === 0) {
        endGame(`Out of attempts. The secret number was ${secretNumber}. You lose.`);
    } else if (guess < secretNumber) {
        document.getElementById('message').innerText = "Try again! Your guess is too low.";
        document.getElementById('attempts').innerText = `Attempts Left: ${attempts}`;
    } else {
        document.getElementById('message').innerText = "Try again! Your guess is too high.";
        document.getElementById('attempts').innerText = `Attempts Left: ${attempts}`;
    }
}

function endGame(message) {
    clearInterval(timerInterval);
    document.getElementById('message').innerText = message;
    document.getElementById('guess').disabled = true;
    document.querySelector('button').disabled = true;
}
