const wordList = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'pink',
    'magenta',
    'oxeye',
    'azure',
    'lily',
    'poppy',
    'orchid',
    'wither',
    'peony',
    'birch',
    'petals',
    'daisy',
    'tulip',
    'lime',
    'rose',
    'lilac',
    'dandelion',
    'allium',
    'cornflower',
    'sunflower',
    'beehive',
    'mellohi',
    'noteblock',
    'suspicious',
    'torchflower',
    'azalea',
    'blossom',
    'bee',
    'dyes',
    'grass'
]

//setting game variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6

function startGame(level) {
    selectedWord = getRandomWord(level)

    //update difficulty display
    updateDifficultyDisplay(level)

    //create placeholder's for the selected word
    displayedWord = '_'.repeat(selectedWord.length)

    //display updated word length
    document.getElementById('wordDisplay').textContent = displayedWord
        .split('')
        .join(' ')


    //hide difficulty selection and show game area & difficulty box

    //add d-none to difficulty selection div 
    document.getElementById('difficultySelection').classList.add('d-none')
    //remove d-none from difficultyBox & gameArea
    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.remove('d-none')
    // add d-block to difficultyBox & gameArea
    document.getElementById('gameArea').classList.add('d-block')
    document.getElementById('difficultyBox').classList.add('d-block')


    function getRandomWord(level) {
        let filteredWords = wordList.filter(word => {
            if (level === 'easy') return word.length <= 5 //easy words
            if (level === 'medium') return word.length >= 6 && word.length <= 8 //medium words
            if (level === 'hard') return word.length >= 9 //hard words
        })

        return filteredWords[Math.floor(Math.random() * filteredWords.length)]

    }
}

function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox')

    //remove any previous difficulty classes

    difficultyBox.classList.remove('easy', 'medium', 'hard')

    //set text & apply class dynamically using template literals
    difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`

    //apply css style for chosen difficulty
    difficultyBox.classList.add(level)

}

function guessLetter() {
    let inputField = document.getElementById('letterInput')
    let guessedLetter = inputField.value.toLowerCase()

    //check if input is a valid letter (a-z)
    if (!guessedLetter.match(/^[a-z]$/)) {
        alert('guess a letter between a-z')
        inputField.value = '' //clear input field
        return //exit function

    }

    //check if letter was already guessed using .includes()
    if (guessedLetters.includes(guessedLetter)) {
        alert('you already guessed that one!')
        inputField.value = '' //clear input field
        return //exit function
    } else {
        //stored guessed letter in guessedLetters array
        guessedLetters.push(guessedLetter)
    }

    //check if guessed letter is in selected word
    if (selectedWord.includes(guessedLetter)) {
        correctGuess(guessedLetter)
    } else {
        wrongGuess(guessedLetter)
    }

    inputField.value = '' //clear input field
    inputField.focus() //refocus input field for next guess
}

function wrongGuess(guessedLetter) {
    wrongGuesses++   //increment number of wrong guesses
    document.getElementById('wrongLetters').textContent += ` ${guessedLetter}`  //add guessed letter to HTML

    document.getElementById('heart').src = `imgs/heart${6 - wrongGuesses}.png`




    if (wrongGuesses === maxMistakes) {
        endGame(false)
    }
}

function correctGuess(guessedLetter) {
    let newDisplayedWord = ''

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
            newDisplayedWord += guessedLetter
        } else {
            newDisplayedWord += displayedWord[i]
        }
    }

    displayedWord = newDisplayedWord
    document.getElementById('wordDisplay').textContent = displayedWord
        .split('')
        .join(' ')

    if (!displayedWord.includes('_')) {
        endGame(true)
    }

}

function endGame(won) {
    if (won === true) {
        setTimeout(() => alert('yippee! you win'), 100)
    } else {

    }
}

function restartGame() {
    location.reload()
}