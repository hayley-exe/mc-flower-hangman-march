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
let selectWord = ''
let displayWord = ''
let wrongGuess = 0
let guessedLetters = []
const maxMistakes = 6

function startGame(level) {
    selectWord = getRandomWord(level)

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





