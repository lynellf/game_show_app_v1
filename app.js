// In this project, you'll create a word guessing game. Players will click letters from an onscreen keyboard to try to guess a random phrase. 
// The player’s goal is to guess all the letters in the phrase. A player can keep choosing letters until they make five incorrect guesses. 
// Letters guessed correctly will appear in the phrase. Letters guessed incorrectly will be counted at the bottom of the screen.

// Get the elements you’ ll need from your HTML

//     Get the element with the ID of qwerty and save it to a variable.
const qwerty = document.querySelector('#qwerty'),
//     Get the element with the ID of phrase and save it to a variable.
phrase = document.querySelector('#phrase');
//     Create a missed variable, initialized to 0, that you’ ll use later to keep track of the number of guesses the player has missed
//         (remember,if the player guesses wrong 5 times, they lose the game)
let missed = 0;
const startButton = document.querySelector('.btn__reset');;

// Attach a event listener to the“ Start Game” button to hide the start screen overlay.
startButton.addEventListener('click', (event) => {
    const startOverlay = event.target.parentNode,
    oldLetters = document.querySelector('letter')
    if(startOverlay.className === 'start' || startOverlay.className === 'win' || startOverlay.className === 'lose') {
        restart();
        startOverlay.style.display = 'none';
    }
});

// Function to wipe the letters and start fresh

function restart() {
    const phraseUl = phrase.childNodes[0].nextElementSibling,
    chosen = document.querySelectorAll('.chosen');
    oldLetters = phraseUl.childNodes;
    while (oldLetters.length > 0) {
        oldLetters.forEach(letter => {
            letter.remove();
        });
    }
    for (let i = 0; i < chosen.length; i++) {
        chosen[i].className = '';
    }
    getRandomPhraseAsArray(phrases);
    addPhrasetoDisplay(phraseArray);
}

// Create a phrases array that contains at least 5 different phrases as strings.
//     Make sure that each phrase contains only letters and spaces, so players won’ t need to guess punctuation or special characters.
const phrases = ['I Love Coding', 'JavaScript is Awesome', 'Learn to Refactor', 'Ramen and Pizza Diet', 'A Life of Learning'],

// Create a getRandomPhraseAsArray function.

// This function should randomly choose a phrase from the phrases array and split that phrase into a new array of characters.
// The function should then return the new character array.
// Keep in mind that you’ ll need to write this function so that it is reusable--meaning that it can take any given array of strings(with no special characters) and
// return an array of characters. To do that, you’ ll write the function so that it takes an array as an parameter:

// function getRandomPhraseArray(arr) {
//     //do stuff to any arr that is passed in 
// }

// and to use the function, you’ll pass in the phrases array as an argument when you call the function:

// getRandomPhraseAsArray(phrases);
getRandomPhraseAsArray = (array) => {
    const max = (Math.floor(array.length));
    const min = 0;
    let randomNum = Math.floor(Math.random() * (max - min) + min);
    return array[randomNum];
},

// Set the game display.

// Create an addPhraseToDisplay function that loops through an array of characters.Inside the loop,
// for each character in the array, you’ ll create a list item, put the character inside of the list item,
// and append that list item to the# phrase ul in your HTML.
// If the character in the array is a letter and not a space, 
// the function should add the class“ letter” to the list item.
// You’ ll need to write the addPhraseToDisplay function so that it can take any array of letters and add it to the display.
// To do that, the function will need to take an array as a parameter:

// function addPhraseToDisplay(arr){
//     // do stuff any arr that is passed in, and add to `#phrase ul`
// }

addPhrasetoDisplay = (string) => {
    const phraseList = phrase.childNodes[0].nextElementSibling;
    for(let i = 0; i < string.length; i++) {
        let listItem = document.createElement('li'),
        listContent = document.createTextNode(string[i]);
        if(string[i] !== ' ') {
            listItem.className = 'letter';
        }
        listItem.appendChild(listContent);
        phraseList.appendChild(listItem);
    }
},

// To use the function, you’ll get the value returned by the getRandomPhrasesArray, save it to a variable, and pass it to addPhraseToDisplay as an argument:

phraseArray = getRandomPhraseAsArray(phrases);
// addPhrasetoDisplay(phraseArray);
addPhrasetoDisplay(phraseArray);


// Create a checkLetter function.

// The checkLetter function will be used inside of the event listener you’ ll write in the next step.
// This function should have one parameter: the button the player has clicked when guessing a letter.

// The checkLetter function should get all of the elements with a class of “letter”(remember that we added the letter class to all of the letters and none of the spaces when we made the game display).
// The function should loop over the letters and check if they match the letter in the button the player has chosen.

// If there’ s a match, the function should add the“ show” class to the list item containing that letter, 
// store the matching letter inside of a variable, and return that letter.
// If a match wasn’ t found, the function should return null.


// Add an event listener to the keyboard.

// Use event delegation to listen only to button events from the keyboard.When a player chooses a letter, 
// add the“ chosen” class to that button so the same letter can’ t be chosen twice.

// Note that button elements have an attribute you can set called“ disabled” that when set to true will not respond to user clicks.See the MDN documentation for more details. Pass the button to the checkLetter
// function, and store the letter returned inside of a variable called letterFound.At this point, you can open the index.html file, click any of the letters on the keyboard, and start to see the letters appear in the phrase.

qwerty.addEventListener('click', (event) => {
    let button,
    letterFound = '';
    const checkLetter = (letter) => {
        let letters = document.querySelectorAll('.letter');
        // for(let i = 0; i < letters.length; i++) {
        //     let currentLetter = letters[i].innerHTML.toLowerCase();
        //     if(letter === currentLetter) {
        //         letterFound = letter;
        //         letters[i].className += ' show';
        //         return letterFound;
        //     } else if (letter !== currentLetter) {
        //         letterFound = null;
        //         return letterFound;
        //     }
        // }
        letters.forEach(item => {
            let currentLetter = item.innerHTML.toLowerCase();
            if (currentLetter === letter) {
                item.className += ' show';
            }
        });
    },
    checkWin = () => {
        const revealedLetters = document.querySelectorAll('.show'),
        lettersInPhrase = document.querySelectorAll('.letter');
        let startOverlay = document.querySelector('#overlay'),
        overlayTitle = document.querySelector('.title');

        if(revealedLetters == lettersInPhrase) {
            startOverlay.style.display = '';
            startOverlay.className = 'win';
            overlayTitle.textContent = 'You Win!';
        } else if (missed <= -5) {
            startOverlay.style.display = '';
            startOverlay.className = 'lose';
            overlayTitle.textContent = 'You Lose!';
        }
    };
    if (event.target.tagName === "BUTTON") {
        button = event.target.textContent.toLowerCase();
        event.target.className = 'chosen';
    }
    checkLetter(button);
    if (letterFound === null) {
        missed -= 1;
    }
    checkWin();
    
})


// Count the missed guesses in the game.

// If the checkLetter function returns a null value, the player has guessed the wrong letter.

// In the keyboard event listener, after checkLetter is called, write a statement to check the value of the letterFound variable.
// If the value is null, remove one of the tries from the scoreboard.

// If you haven 't created it yet, make sure you have a missed variable to store the state of the scoreboard (initialized to 0). 
// When you remove a try from the scoreboard, make sure to increase the missed count by 1.


// Create a checkWin function.

// Each time the player guesses a letter, this
// function will check whether the game has been won or lost. At the very end of the keyboard event listener, you’ ll run this  function to check

// if the number of letters with class“ show” is equal to the number of letters with class“ letters”.If they’ re equal, show the overlay screen with the“ win” class and appropriate text.
// Otherwise, if the number of misses is equal to or greater than 5, show the overlay screen with the“ lose” class and appropriate text.

