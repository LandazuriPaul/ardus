"use strict";

class ardus {
    constructor(word,maxTentatives) {
        this.gameWord = word;
        this.areRulesDisplayed = false;
        this.hasWon = false;
        this.hasLost = false;
        this.currentGuess = "";
        this.guessList = [];
        this.scoreList = [];
        this.annotationsList = [];
        this.maxTentatives = maxTentatives;
    }

    guessesCount() {
        return this.guessList.length;
    }

    switchRulesDisplayStatus() {
        if (this.areRulesDisplayed === true) {
            this.areRulesDisplayed = false;
        }
        if (this.areRulesDisplayed === false) {
            this.areRulesDisplayed = true;
        }
    }

    addWordToGuessList(word) {
        this.guessList.append(word);
    }

    updateCurrentGuess(c) {
        if (c === "Backspace") {
            this.currentGuess = this.currentGuess.substring(0,this.currentGuess.length - 1);
        }
        else {
            if (this.currentGuess.length < 5) {
                if (c === "a" || c === "b" || c === "c" || c === "d" || c === "e" || c === "f" || c === "g" || c === "h" || c === "i" || c === "j" || c === "k" || c === "l" || c === "m" || c === "n" || c === "o" || c === "p" || c === "q" || c === "r" || c === "s" || c === "t" || c === "u" || c === "v" || c === "w" || c === "x" || c === "y" || c === "z") {
                    this.currentGuess += c.toUpperCase();
                }
            }
        }
    }

    validateCurrentGuess() {
        if (this.currentGuess.length != 5) {
            console.log("Erreur !");
        }
        else {
            // check if word is in the list! TODO TODO TODO TODO
            this.guessList.push(this.currentGuess);
            this.annotationsList.push([0,0,0,0,0]);
            let count = howManyLetters(this.gameWord,this.currentGuess);
            this.scoreList.push(count);
            if (count === 5) {
                this.hasWon = true;
            }
            if (count !== 5 && this.guessList.length === this.maxTentatives) {
                this.hasLost = true;
            }
            this.currentGuess = "";
        }
    }

    incrementAnnotation(i,j) {
        game.annotationsList[i][j] = (game.annotationsList[i][j] + 1) % 5;
    }
}

//
let game = new ardus("PAIRE",20);
// game.guessList = ["PIPIS","CACAS","ZOBIE","KIKIS"];
// game.scoreList = ["1","3","1","2"];
// game.annotationsList = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
// game.currentGuess = "AYA";

const root = document.getElementById("game-container");
const announcements = document.getElementById("announcements");
const rulesButton = document.getElementById("rules-toggle");
rulesButton.addEventListener('click', (event) => {
    game.switchRulesDisplayStatus();
});
const rulesContainer = document.getElementById("rules-text");

/* the following functions make HTML objects */

function newNumberContainer(i) {
    let numberContainer = document.createElement("div");
    numberContainer.className = "question-number-container";
    numberContainer.innerHTML = `${i}`;

    return numberContainer;
}

function newLetterContainer(i,j,letter,annotation) {
    let letterContainer = document.createElement("div");
    letterContainer.className = "letter-container";
    letterContainer.innerHTML = letter;
    letterContainer.style.backgroundColor = annotationToColor(annotation);
    letterContainer.setAttribute("id", `letter-${i}${j}`);
    letterContainer.addEventListener('click', (event) => {
        game.incrementAnnotation(i,j);
        renderArdus(game);
    });

    return letterContainer;
}

function newScoreContainer(s) {
    let scoreContainer = document.createElement("div");
    scoreContainer.className = "score-container";
    scoreContainer.innerHTML = `${s}`;

    return scoreContainer;
}

function newGuessContainer(i,letters,annotations,s) {
    let guessContainer = document.createElement("div");
    guessContainer.className = "guess-container";
    guessContainer.setAttribute("id",`guess-container-${i}`);

    guessContainer.appendChild(newNumberContainer(i+1));
    for (let j=0; j<5; j++) {
        guessContainer.appendChild(newLetterContainer(i,j,letters.charAt(j),annotations[j]));
    }
    guessContainer.appendChild(newScoreContainer(s));

    return guessContainer;
}

function newCurrentNumberContainer(i) {
    let numberContainer = document.createElement("div");
    numberContainer.className = "question-number-container";
    numberContainer.innerHTML = `${i}`;

    return numberContainer;
}

function newCurrentLetterContainer(j,letter) {
    let letterContainer = document.createElement("div");
    letterContainer.className = "current-letter-container";
    letterContainer.setAttribute("id", `current-letter-${j}`);
    letterContainer.innerHTML = `${letter}`;

    return letterContainer;
}

function newCurrentScoreContainer() {
    let scoreContainer = document.createElement("div");
    scoreContainer.className = "current-score-container";
    scoreContainer.innerHTML = "";

    return scoreContainer;
}

function newCurrentGuessContainer(i,guessWord) {
    let currentGuessContainer = document.createElement("div");
    currentGuessContainer.className = "current-guess-container";
    currentGuessContainer.setAttribute("id","current-guess-container");

    currentGuessContainer.appendChild(newCurrentNumberContainer(i));
    for (let j=0; j<5; j++) {
        let s = guessWord.charAt(j);

        if (s !== undefined) {
            currentGuessContainer.appendChild(newCurrentLetterContainer(j,guessWord.charAt(j)));
        }
        else {
            currentGuessContainer.appendChild(newCurrentLetterContainer(j,""));
        }
    }
    currentGuessContainer.appendChild(newCurrentScoreContainer());

    return currentGuessContainer;
}

/* gestion des annotations */

function annotationToColor(i) {
    switch (i) {
        case 0: return "var(--blue8)"; break;
        case 1: return "var(--annot1)"; break;
        case 2: return "var(--annot2)"; break;
        case 3: return "var(--annot3)"; break;
        case 4: return "var(--annot4)"; break;
        default: return "var(--blue8)";
    }
}

/* the following function is for testing purposes only */

/* the following functions are the rendering functions */

function renderRulesContainer (game) {
    const template = `Vous devez trouver un nom commun singulier de cinq lettres choisi au hasard par l'ordinateur. Pour cela, vous disposez d'autant de tentatives que vous le souhaitez : une tentative est un mot de cinq lettres, qui n'est pas forcément un nom commun singulier. Lorsque vous tapez les lettres de votre tentative au clavier et validez en appuyant sur la touche <i>Entrée</i>, l'ordinateur vous annonce le nombre de lettres bien placées.
    <br>
    <br>
    Pour le confort du jeu, il est souvent pratique d'annoter des lettres de tentatives passées : c'est possible ici en cliquant plusieurs fois sur une lettre pour changer la couleur de son arrière-plan.`;
    if (game.areRulesDisplayed === false) {
        rulesContainer.innerHTML = "";
    } else {
        rulesContainer.innerHTML = template;
    }
}

function renderArdus(game) {
    root.innerHTML = "";

    let guess = "";
    let s = 0;
    let arr = [];
    for (let i=0; i<game.guessesCount(); i++) {
        guess = game.guessList[i];
        s = game.scoreList[i];
        arr = game.annotationsList[i];
        root.appendChild(newGuessContainer(i,guess,arr,s));
    }

    if (game.hasWon === false && game.hasLost === false) {
        root.appendChild(newCurrentGuessContainer(game.guessesCount() +1, game.currentGuess));
        console.log("On devrait afficher un truc !");
    } else {
        console.log("Euh");
    }

    if (game.hasLost === true) {
        announcements.innerHTML = "Perdu !";
    }

    if (game.hasWon === true) {
        announcements.innerHTML = "Gagné !";
    }
}

renderArdus(game);

document.addEventListener('keydown', (event) => {
    var codeValue = event.code;
    var keyValue = event.key;

    if (game.guessList.length < game.maxTentatives) {
        if (codeValue === "Enter") {
            game.validateCurrentGuess();
            renderArdus(game);
        } else {
            game.updateCurrentGuess(keyValue);
            renderArdus(game);
        }
    }
});

function howManyLetters(word1,word2) {
    let count = 0;
    for (let i=0; i<5; i++) {
        if (word1.charAt(i) === word2.charAt(i)) {
            count++;
        }
    }
    
    return count;
}

/*

function stringToArray(string) {
    let l = string.length;
    let arr = [];

    for (let i=0; i<l; i++) {
        arr.push(string.charAt(i));
    }
    return arr;
}

*/