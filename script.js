const wordList = [
    'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'magenta',
    'oxeye', 'azure', 'lily', 'poppy', 'orchid', 'wither', 'peony', 'birch',
    'petals', 'daisy', 'tulip', 'lime', 'rose', 'lilac', 'dandelion', 'allium',
    'cornflower', 'sunflower', 'beehive', 'mellohi', 'noteblock', 'suspicious',
    'torchflower', 'azalea', 'blossom', 'bee', 'dyes', 'grass'
];

let selectedWord = '';
let displayedWord = '';
let wrongGuesses = 0;
let guessedLetters = [];
const maxMistakes = 6;

let lifeSystem; // Declare the life system globally

// Heart life system functions
function createHeartLifeSystem(maxLives = 6) {
    let currentLives = maxLives;
    const heartContainer = document.getElementById('heart-container');

    function updateDisplay() {
        heartContainer.innerHTML = ''; // Clear existing hearts

        for (let i = 0; i < currentLives; i++) {
            const heart = document.createElement('span');
            heart.innerHTML = `<img src="imgs/heart.png">`;
            heart.classList.add('heart');
            heartContainer.appendChild(heart);
        }

        for (let i = currentLives; i < maxLives; i++) {
            const emptyHeart = document.createElement('span');
            emptyHeart.innerHTML = `<img src="imgs/withered.png">`;
            emptyHeart.classList.add('empty-heart');
            heartContainer.appendChild(emptyHeart);
        }
    }

    function loseLife() {
        if (currentLives > 0) {
            currentLives--;
            updateDisplay();
        } else {
            endGame(false); // Trigger Game Over
        }
    }

    function resetLives() {
        currentLives = maxLives;
        updateDisplay();
    }

    updateDisplay();

    return {
        loseLife,
        resetLives
    };
}

// Word game logic
function startGame(level) {
    selectedWord = getRandomWord(level);
    displayedWord = '_'.repeat(selectedWord.length);

    // Update the difficulty display
    updateDifficultyDisplay(level);

    // Display the word with placeholders
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ');

    // Hide the difficulty selection and show the game area
    document.getElementById('difficultySelection').classList.add('d-none');
    document.getElementById('gameArea').classList.remove('d-none');

    // Initialize heart life system
    lifeSystem = createHeartLifeSystem();

    // Clear wrong guesses
    document.getElementById('wrongLetters').textContent = 'Wrong Guesses:';
}

function getRandomWord(level) {
    let filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 5;
        if (level === 'medium') return word.length >= 6 && word.length <= 8;
        if (level === 'hard') return word.length >= 9;
    });

    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox');
    difficultyBox.classList.remove('easy', 'medium', 'hard');
    difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`;
    difficultyBox.classList.add(level);
}

function guessLetter() {
    let inputField = document.getElementById('letterInput');
    let guessedLetter = inputField.value.toLowerCase();

    if (!guessedLetter.match(/^[a-z]$/)) {
        alert('Guess a letter between a-z');
        inputField.value = '';
        return;
    }

    if (guessedLetters.includes(guessedLetter)) {
        alert('You already guessed that one!');
        inputField.value = '';
        return;
    } else {
        guessedLetters.push(guessedLetter);
    }

    if (selectedWord.includes(guessedLetter)) {
        correctGuess(guessedLetter);
    } else {
        wrongGuess(guessedLetter);
    }

    inputField.value = '';
    inputField.focus();
}

function wrongGuess(guessedLetter) {
    wrongGuesses++;
    document.getElementById('wrongLetters').textContent += ` ${guessedLetter}`;
    lifeSystem.loseLife(); // Update the heart life system
    incorrectSound.play()
    if (wrongGuesses === maxMistakes) {
        endGame(false); // End the game if the player loses
    }
}

function correctGuess(guessedLetter) {
    let newDisplayedWord = '';
    correctSound.play()
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
            newDisplayedWord += guessedLetter;
        } else {
            newDisplayedWord += displayedWord[i];
        }
    }

    displayedWord = newDisplayedWord;
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ');

    if (!displayedWord.includes('_')) {
        endGame(true); // End the game if the player wins
    }
}

function endGame(won) {
    if (won) {
        setTimeout(() => alert('Yippee! You win!'), 100);
    } else {
        setTimeout(() => alert('Game Over! You lost!'), 100);
    }
}

function restartGame() {
    // Reset all variables and UI elements
    document.getElementById('difficultySelection').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.add('d-none');
    document.getElementById('gameArea').classList.add('d-none');

    // Reset UI elements
    document.getElementById('wordDisplay').innerText = '_ _ _ _'; // Reset word display
    document.getElementById('wrongLetters').innerText = 'Wrong Guesses:'; // Clear wrong guesses
    document.getElementById('heart-container').innerHTML = ''; // Clear hearts

    // Reset game variables
    currentWord = '';
    guessedLetters = [];
    wrongGuesses = [];
    attemptsLeft = maxAttempts;
}

// enter btn
document.getElementById('letterInput').addEventListener('keydown', function (event) {
    // If Enter key (key code 13 or 'Enter') is pressed, call guessLetter
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default action (like form submission)
        guessLetter(); // Trigger guessLetter function
    }
});


// Define a variable for the correct guess sound
const correctSound = new Audio('exp.mp3');

// Define a variable for the incorrect guess sound
const incorrectSound = new Audio('hit.mp3');

// Inside the guessLetter function:
if (wordToGuess.includes(guessedLetter)) {
    // Play the correct sound
    correctSound.play();
} else {
    // Play the incorrect sound
    incorrectSound.play();
}


