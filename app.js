// Required HTML elements
    // QUERTY element keyboard selector
    // Phrase element selector
    // Start button element selector
    
    const qwerty = document.querySelector('#qwerty'),
    phrase = document.querySelector('#phrase'),
    startButton = document.querySelector('.btn__reset'),

// Phrase array containing at least 5 different phrases.
    // All letters and spaces. No numbers or special characters. 
    phrases = [
        'I Love Coding',
        'JavaScript is Awesome',
        'Learn to Refactor',
        'Ramen and Pizza Diet',
        'A Life of Learning'
    ],

// Function which randomly selects a phrase from a given array of strings and returns a single string.
    getRandomPhraseAsArray = (array) => {
        const max = (Math.floor(array.length));
        const min = 0;
        let randomNum = Math.floor(Math.random() * (max - min) + min);
        return array[randomNum];
    },



// Function shall iterate through the string parameter.
    // Each iteration shall create a li element with a character as its content
    // All li elements shall have a class of 'letter' with the exception of spaces
    addPhrasetoDisplay = (string) => {
        const phraseList = phrase.childNodes[0].nextElementSibling;
        for (let i = 0; i < string.length; i++) {
            let listItem = document.createElement('li'),
                listContent = document.createTextNode(string[i]);
            if (string[i] !== ' ') {
                listItem.className = 'letter';
            } else {
                listItem.className = 'space';
            }
            listItem.appendChild(listContent);
            phraseList.appendChild(listItem);
        }
    },

// Function to restart the entire game.
    restart = () => {
        const phraseUl = phrase.childNodes[0].nextElementSibling,
        buttons = document.querySelectorAll('button');
        oldLetters = phraseUl.childNodes,
        tryList = document.querySelector('ol'),
        tries = document.querySelectorAll('.tries'),
        heartImg = 'images/liveHeart.png';
        let newPhrases = [
            'I Love Coding',
            'JavaScript is Awesome',
            'Learn to Refactor',
            'Ramen and Pizza Diet',
            'A Life of Learning'
        ];

        while (oldLetters.length > 0) {
            oldLetters.forEach(letter => {
                letter.remove();
            });
        }
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = '';
            buttons[i].disabled = false;
        }
        if(tries.length !== 5) {
            for (let i = 0; i < (5 - tries.length); i++) {
                const attempt = document.createElement('li'),
                image = new Image(36.5, 35);
                image.src = heartImg;
                image.className = '__web-inspector-hide-shortcut__';
                tryList.appendChild(attempt);
                attempt.appendChild(image);
            }
        const listofTries = document.querySelectorAll('ol > li');
            listofTries.forEach(attempt => {
                attempt.className = 'tries';
            });
        }
        missed = 0;
        phraseArray = getRandomPhraseAsArray(newPhrases);
        addPhrasetoDisplay(phraseArray);
    };
// Counter for missed attempts
    let missed = 0,

// To use the function, you’ll get the value returned by the getRandomPhrasesArray, save it to a variable, and pass it to addPhraseToDisplay as an argument:
    phraseArray = getRandomPhraseAsArray(phrases);

// Function call to automatically display a phrase upon initialization.
    addPhrasetoDisplay(phraseArray);

// An event listener which will hide the initial overlay upon clicking the start button.
// The event listener will call for a restart of the game if one has already completed.
    startButton.addEventListener('click', (event) => {
        const startOverlay = event.target.parentNode,
            oldLetters = document.querySelector('letter')
        if (startOverlay.className === 'start' || startOverlay.className === 'win' || startOverlay.className === 'lose') {
            restart();
            startOverlay.style.display = 'none';
        }
    });

// Event listener on the QWERTY elements. The event listener shall execute a series of functions upon mouse click.
    qwerty.addEventListener('click', (event) => {
        if (event.target.tagName === "BUTTON") {
            let button,
            letterFound = '',
            tries = document.querySelectorAll('.tries');

            // Function shall compare the clicked letter with each letter contained within the generated li elements.
                // If there is a match, li elements with matched contents shall have its class appended to display its content.
                // If there is not a match, the function shall set the letterFound variable to null.
                const checkLetter = (letter) => {
                    let letters = document.querySelectorAll('.letter'),
                    matchedLetterCount = 0;
                    letters.forEach(item => {
                        let currentLetter = item.innerHTML.toLowerCase();
                        if (currentLetter === letter) {
                            item.className += ' show';
                            matchedLetterCount += 1;
                        }
                    });
                    if (matchedLetterCount === 0) {
                        letterFound = null;
                        matchedLetterCount = 0;
                    } else if(matchedLetterCount > 0) {
                        letterFound = letter;
                        matchedLetterCount = 0;
                    }
                },
            
            // Function shall compare the length of all li elements with the class 'show' with the length of the phrase.
                // The function shall also evaluate the 'missed' variable.
                // The overlay will reappaer with the 'win' class if the array lengths match.
                // Alternatively, the overlay will reappear with the 'lose' class if the 'missed' variable equals 5.
                checkWin = () => {
                    const revealedLetters = document.querySelectorAll('.show'),
                    lettersInPhrase = document.querySelectorAll('.letter');
                    let startOverlay = document.querySelector('#overlay'),
                    overlayTitle = document.querySelector('.title');
            
                    if(revealedLetters.length === lettersInPhrase.length) {
                        startOverlay.style.display = '';
                        startOverlay.className = 'win';
                        overlayTitle.textContent = 'You Win!';
                    } else if (missed === 5) {
                        startOverlay.style.display = '';
                        startOverlay.className = 'lose';
                        overlayTitle.textContent = 'You Lose!';
                    }
                };

            // The series of methods and functions which are executed upon the click of a QWERTY element.
                // The content of the QWERTY element is passed as a parameter to the 'checkLetter' function.
                // Additionally, the letter will have the class 'chosen' appended to it, denoting it has been chosen.
                // The clicked letter is also disabled, preventing additional clicks until reset.
                // If the clicked letter causes the 'checkLetter' function to return a null value, the missed counter increases by 1.
                    // If the player missed an attempt, the li items with the class 'tries' will be removed from the DOM by 1. 
                // Lastly, the 'checkWin' function is called to determine the player's current standing.
                button = event.target.textContent.toLowerCase();
                event.target.className = 'chosen';
                event.target.disabled = true;
                checkLetter(button);
                if (letterFound === null) {
                    let counter = missed;
                    tries[0].remove();
                    missed += 1;
                }
                checkWin();
        }
    });


