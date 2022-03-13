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
let personalAnnotationsList = [];

rulesButton.addEventListener('click', (event) => {
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
    //console.log("Il y a eu un clic !");
    renderRulesContainer();
}

/*
function changeAnnotationsStyle() {
    let letterContainerTable = [];
    let letterContainerList = [];
    let template = '';
    for (let i=0; i<guessesList; i++) {
        for (let j=0; j<5; j++) {
            letterContainerList.push(document.getElementById(`letter-${i}${j}`));
        }
        letterContainerTable.push(letterContainerList);
        letterContainerList = [];
    }

    console.log("voici le tableau des lettres:", letterContainerTable);

    for (let i=0; i<guessesList; i++) {
        for (let j=0; j<5; j++) {
            switch (personalAnnotationsList[i][j]) {
                case 1: template = 'letter-container-surely-good';
                case 2: template = 'letter-container-probably-good';
                case 3: template = 'letter-container-surely-bad';
                default: template = 'letter-container';
            }
            letterContainerTable[i][j].setAttribute("class",template);
        }
    }
}*/

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
    //console.log('Vous avez appuye sur ENTER.');
    if (currentGuess.length == 5) {
        guessesList.push(currentGuess);
        personalAnnotationsList.push([3,0,1,2,0]);
        //console.log(personalAnnotationsList);
        clueList.push(0); // il faudra que ce soit autre chose que 0 !
        currentGuess = '';
    } else {
        announcements.innerHTML = "Le mot est trop court !";
    }
}

function templateRenderLetter(i,j) {
    let templateClass = "";
    if (i>= guessesList.length) {
        console.log("Attention, il n'y a que ", guessesListe.length, "tentatives.");
        return '';
    } else {
        if (j>=5 || j<0) {
            console.log("Attention, il n'y a pas de lettre à cette place.");
        } else {
            console.log("cette lettre est annotee: ", personalAnnotationsList[i][j]);
            switch (personalAnnotationsList[i][j]) {
                case 1: templateClass = "letter-container-surely-good"; break;
                case 2: templateClass = "letter-container-probably-good"; break;
                case 3: templateClass = "letter-container-surely-bad"; break;
                default: templateClass = "letter-container";
            }
            const template = `  <div class="${templateClass}" id="letter-${i}${j}">${guessesList[i].charAt(j)}</div>
            `;
            return template;
        }
    }
}

function templateRenderGuess(i) {
    if (i>= guessesList.length) {
        console.log("Attention, il n'y a que ", guessesListe.length, "tentatives.");
        return '';
    } else {
        const template = `
    <div class="guess-container">
        <div class="question-number-container">${i+1}</div>
        ${templateRenderLetter(i,0)}
        ${templateRenderLetter(i,1)}
        ${templateRenderLetter(i,2)}
        ${templateRenderLetter(i,3)}
        ${templateRenderLetter(i,4)}
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
        <div class="question-number-container">${guessesList.length+1}</div>
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
    root.innerHTML = templateRenderGuessList();
    root.innerHTML += templateRenderCurrentGuess();
}

// initial render
renderRulesContainer();
announcements.innerHTML = "";
render();