package word_validator

import (
	"fmt"
	"strings"

	"github.com/LandazuriPaul/ardus/pkg/dictionary"
)

// TODO:
// - translate code to english :)
// - call the functions from cmd/cli/cli.go

func belongsWordSortedList(mot string, liste []string) bool {
	var result bool
	var l, rgpivot int
	var pivot string

	l = len(liste)
	if l == 0 {
		return false
	}

	if l == 1 {
		if liste[0] == mot {
			return true
		}
		if liste[0] != mot {
			return false
		}
	}
	rgpivot = l / 2
	pivot = liste[rgpivot]
	test := strings.Compare(mot, pivot)
	var ssliste []string

	switch test {
	case 0:
		result = true
	case -1:
		ssliste = liste[0:rgpivot]
		result = belongsWordSortedList(mot, ssliste)
	case 1:
		ssliste = liste[rgpivot:l]
		result = belongsWordSortedList(mot, ssliste)
	}
	return result
}

func compareWords(mot string, tentative string) int {
	if len(mot) != 5 {
		fmt.Println("le mot a trouver est cense etre de longueur 5 zebi")
	}
	if len(tentative) != 5 {
		fmt.Println("votre tentative ne fait pas 5 lettres starfoulilah")
	}

	var i, result int
	result = 0
	for i = 0; i < 5; i++ {
		if mot[i] == tentative[i] {
			result++
		}
	}
	return result
}

func isWordPlayable(word string) bool {
	if len(word) != 5 {
		fmt.Println("Le mot n'a pas cinq lettres.")
		return false
	}
	if belongsWordSortedList(word, dictionary.ValidWordList) == false {
		fmt.Println("Le mot n'est pas dans le dictionnaire.")
		return false
	}
	return true
}

func askGuessWordUntilPlayable() string {
	var word string
	fmt.Scanln(&word)
	for isWordPlayable(word) == false {
		fmt.Scanln(&word)
	}
	return word
}

func makeGuess(mysteriousWord string) bool {
	result := false
	var guessWord string
	var n int
	guessWord = askGuessWordUntilPlayable()
	n = compareWords(mysteriousWord, guessWord)
	if n == 5 {
		result = true
		fmt.Println("Bravo !")
	} else {
		if n < 2 {
			fmt.Println("Il y a ", n, " lettres bien placee.")
		} else {
			fmt.Println("Il y a ", n, " lettres bien placees.")
		}
	}
	return result
}

func GuessMysteriousWord(mysteriousWord string) {
	var nbGuesses int
	var hasWon bool

	hasWon = false
	nbGuesses = 0

	for hasWon == false {
		nbGuesses++
		fmt.Println("Tentative", nbGuesses)
		hasWon = makeGuess(mysteriousWord)
	}
}
