"use strict";

const MAX_TENTATIVES = 3;
const root = document.getElementById("game-container");
const announcements = document.getElementById("announcements");
const rulesButton = document.getElementById("rules-toggle");
const rulesText = document.getElementById("rules-text");

// initialisation des div de la tentative courante

const currentGuessContainer = document.createElement("div");
currentGuessContainer.setAttribute("id","current-guess-container");
currentGuessContainer.className = "guess-container";

let currentNumberContainer = document.createElement("div");
currentNumberContainer.className = "question-number-container";
currentNumberContainer.setAttribute("id", "current-number-container");
currentNumberContainer.innerHTML = "1";
currentGuessContainer.appendChild(currentNumberContainer);

for (let j=0; j<5; j++) {
    let currentLetterContainer = document.createElement("div");
    currentLetterContainer.className = "letter-container";
    currentLetterContainer.setAttribute("id", `current-letter-${j}`);
    currentLetterContainer.innerHTML = "";
    currentGuessContainer.appendChild(currentLetterContainer);
}

let currentScoreContainer = document.createElement("div");
currentScoreContainer.className = "score-container";
currentScoreContainer.innerHTML = "0";
currentGuessContainer.appendChild(currentScoreContainer);

//

let guessList = [];
let clueList = [];
let currentGuessValue = '';
let displayRules = false;
let personalAnnotationsList = [];

// affichage/masquage des règles

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
    renderRulesContainer();
}

// affichage des tentatives

/*
function changeAnnotationsStyle() {
    let letterContainerTable = [];
    let letterContainerList = [];
    let template = '';
    for (let i=0; i<guessList; i++) {
        for (let j=0; j<5; j++) {
            letterContainerList.push(document.getElementById(`letter-${i}${j}`));
        }
        letterContainerTable.push(letterContainerList);
        letterContainerList = [];
    }

    console.log("voici le tableau des lettres:", letterContainerTable);

    for (let i=0; i<guessList; i++) {
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

    if (guessList.length < MAX_TENTATIVES) {
        if (codeValue == "Enter") {
            addGuess();
        } else {
            updateGuess(keyValue);
        }
    }
});

function updateGuess(c) {
    if (c == "Backspace") {
        currentGuessValue = currentGuessValue.substring(0,currentGuessValue.length - 1);
    }
    else {
        if (currentGuessValue.length < 5) {
            if (c == "a" || c == "b" || c == "c" || c == "d" || c == "e" || c == "f" || c == "g" || c == "h" || c == "i" || c == "j" || c == "k" || c == "l" || c == "m" || c == "n" || c == "o" || c == "p" || c == "q" || c == "r" || c == "s" || c == "t" || c == "u" || c == "v" || c == "w" || c == "x" || c == "y" || c == "z") {
                currentGuessValue += c.toUpperCase();
                updateCurrentGuessContainer(guessList.length+1);
            }
        }
    }
    announcements.innerHTML = "";
}

function updateCurrentGuessContainer(i) {
    currentNumberContainer.innerHTML = `${i}`;
    for (let j=0; j<5; j++) {
        let currentLetter = document.getElementById(`current-letter-${j}`); 
        currentLetter.innerHTML = currentGuessValue.charAt(j);
    }
}

// commentaire UTILE ????


// ci-dessous, vieilles fonctions

/*
function templateRenderLetter(i,j) {
    let templateClass = "";
    if (i>= guessList.length) {
        console.log("Attention, il n'y a que ", guessListe.length, "tentatives.");
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
            const template = `  <div class="${templateClass}" id="letter-${i}${j}">${guessList[i].charAt(j)}</div>
            `;
            return template;
        }
    }
} 

function templateRenderGuess(i) {
    if (i>= guessList.length) {
        console.log("Attention, il n'y a que ", guessListe.length, "tentatives.");
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
    for (let i=0; i<guessList.length; i++) {
        template += templateRenderGuess(i);
    }
    return template;
} */

/* les fonctions suivantes fabriquent des div
 pour des nombres, scores, lettres, et tentatives
*/

function newNumberContainer(i) {
    const numberContainer = document.createElement("div");
    numberContainer.className = "question-number-container";
    numberContainer.innerHTML = `${i+1}`;
    
    return numberContainer;
}

function newScoreContainer(i) {
    const numberContainer = document.createElement("div");
    numberContainer.className = "score-container";
    numberContainer.innerHTML = `${i}`;
    
    return numberContainer;
}

function newLetterContainer(i,j,c) {
    const letterContainer = document.createElement("div");
    letterContainer.className = "letter-container";
    letterContainer.setAttribute("id", `letter-${i}${j}`);
    letterContainer.innerHTML = `${c}
    `;

    return letterContainer;
}

function newGuessContainer(i,s) {
    if (i>= guessList.length) {
        console.log("Attention, il n'y a que ", guessListe.length, "tentatives.");
        return '';
    } else {
        const guessContainer = document.createElement("div");
        guessContainer.className = "guess-container";
        guessContainer.setAttribute("id", `guess-container-${i}`);

        // on ajoute le numero
        guessContainer.appendChild(newNumberContainer(i));

        // on ajoute les cinq lettres
        for (let j=0; j<5; j++) {
            guessContainer.appendChild(newLetterContainer(i,j,s.charAt(j)));
        }

        // on ajoute le score
        guessContainer.appendChild(newScoreContainer(clueList[i]));

        return guessContainer;
    }
}

function addGuess() {
    // si la tentative en cours a le bon nombre de lettres
    if (currentGuessValue.length == 5) {
        // on ajoute la tentative à la liste de strings
        guessList.push(currentGuessValue);

        // il faudra tester ici si ça gagne etc.
        clueList.push(0); // il faudra que ce soit autre chose que 0 !

        // on ajoute la tentative validee
        root.appendChild(newGuessContainer(guessList.length-1,guessList[guessList.length-1]));
        let truc_a_bouger_avant = document.getElementById(`guess-container-${guessList.length-1}`);
        let truc_a_bouger_apres = document.getElementById("current-guess-container");
        root.insertBefore(truc_a_bouger_avant, truc_a_bouger_apres);

        // on reinitialise le mot courant
        currentGuessValue = '';
        updateCurrentGuessContainer(guessList.length+1);

        // on ajoute les annotations par défaut
        personalAnnotationsList.push([0,0,0,0,0]);

        // s'il y a trop de tentatives, on fait disparaître la tentative courante, sinon on rajoute un saut de ligne
        if (guessList.length == MAX_TENTATIVES) {
            root.removeChild(currentGuessContainer);
        } else {
            root.insertBefore(document.createElement("br"), truc_a_bouger_apres);
        }

        if (guessList.length == MAX_TENTATIVES) {
            // si on a perdu...
            announcements.innerHTML = "Perdu !";
        }
    } else {
        announcements.innerHTML = "Le mot est trop court !";
    }
}

// initial render
renderRulesContainer();
announcements.innerHTML = "";

root.appendChild(currentGuessContainer);