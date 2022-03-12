"use strict";

const MAX_TENTATIVES = 16;
const root = document.getElementById("game-container");
const announcements = document.getElementById("announcements");
const rulesButton = document.getElementById("rules-toggle");
const rulesText = document.getElementById("rules-text");

let guessesList = [];
let clueList = [];
let currentGuess = '';
let displayRules = false;

rulesButton.addEventListener('onclick', (event) => {
    toggleDisplayRules();
});

function renderRulesContainer () {
    const template = `Vous devez trouver un nom commun singulier de cinq lettres choisi au hasard par l'ordinateur. Pour cela, vous disposez d'autant de tentatives que vous le souhaitez : une tentative est un mot de cinq lettres, qui n'est pas forcément un nom commun singulier. Lorsque vous tapez les lettres de votre tentative au clavier et validez avec le bouton <i>Entrée</i>, l'ordinateur vous annonce le nombre de lettres bien placées.`;
    if (displayRules == false) {
        rulesText.innerHTML = "";
    } else {
        rulesText.innerHTML = template;
    }
}

function toggleDisplayRules() {
    if (displayRules == false) {
        displayRules = true;
    } else {
        displayRules = false;
    }
    renderRulesContainer();
}

document.addEventListener('keydown', (event) => {
    var codeValue = event.code;
    var keyValue = event.key;

    //console.log("code: ", codeValue);
    //console.log("key: ", keyValue);

    if (codeValue == "Enter") {
        addGuess();
    } else {
        updateGuess(keyValue);
    }
    render();
});


function updateGuess(c) {
    if (c == "Backspace") {
        currentGuess = currentGuess.substring(0,currentGuess.length - 1);
    }
    else {
        if (currentGuess.length < 5) {
            if (c == "a" || c == "b" || c == "c" || c == "d" || c == "e" || c == "f" || c == "g" || c == "h" || c == "i" || c == "j" || c == "k" || c == "l" || c == "m" || c == "n" || c == "o" || c == "p" || c == "q" || c == "r" || c == "s" || c == "t" || c == "u" || c == "v" || c == "w" || c == "x" || c == "y" || c == "z") {
                currentGuess += c.toUpperCase();
            }
        }
    }
    announcements.innerHTML = "";
}

function addGuess() {
    console.log('Vous avez appuye sur ENTER.');
    if (currentGuess.length == 5) {
        guessesList.push(currentGuess);
        clueList.push(0); // il faudra que ce soit autre chose que 0 !
        currentGuess = '';
    } else {
        announcements.innerHTML = "Le mot est trop court !";
    }
}

function templateRenderGuess(i) {
    if (i>= guessesList.length) {
        console.log("Attention, il n'y a que ", guessesListe.length, "tentatives.");
        return '';
    } else {
        const template = `
    <div class="guess-container">
        <div class="letter-container">${guessesList[i].charAt(0)}</div>
        <div class="letter-container">${guessesList[i].charAt(1)}</div>
        <div class="letter-container">${guessesList[i].charAt(2)}</div>
        <div class="letter-container">${guessesList[i].charAt(3)}</div>
        <div class="letter-container">${guessesList[i].charAt(4)}</div>
        <div class="score-container">${clueList[i]}</div>
      </div>
      <br>
    `;
    return template;
    }
}

function templateRenderGuessList() {
    let template = "";
    for (let i=0; i<guessesList.length; i++) {
        template += templateRenderGuess(i);
    }
    return template;
}

function templateRenderCurrentGuess() {
    const template = `
    <div class="guess-container">
        <div class="letter-container">${currentGuess.charAt(0)}</div>
        <div class="letter-container">${currentGuess.charAt(1)}</div>
        <div class="letter-container">${currentGuess.charAt(2)}</div>
        <div class="letter-container">${currentGuess.charAt(3)}</div>
        <div class="letter-container">${currentGuess.charAt(4)}</div>
        <div class="score-container"></div>
      </div>
    `;

    return template;
}

function render() {
    console.log("Etat de currentGuess: ", currentGuess);
    console.log("Etat de guessesList: ", guessesList);

    /*
    root.innerHTML = "";
    for (let i=0; i<5; i++) {
        const letterContainer = document.createElement("div");
        letterContainer.className = "letter-container";
    }*/
    root.innerHTML = templateRenderGuessList();
    root.innerHTML += templateRenderCurrentGuess();
}

// initial render
renderRulesContainer();
announcements.innerHTML = "";
render();