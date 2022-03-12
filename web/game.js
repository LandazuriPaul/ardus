"use strict";

const MAX_TENTATIVES = 16;
const root = document.getElementById("game-container");

let guessesList = [];
let clueList = [];
let currentGuess = '';

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
}

function addGuess() {
    console.log('Vous avez appuye sur ENTER.');
    if (currentGuess.length == 5) {
        guessesList.push(currentGuess);
        clueList.push(0); // il faudra que ce soit autre chose que 0 !
        currentGuess = '';
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
        <div class="score-container">0</div>
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
render();