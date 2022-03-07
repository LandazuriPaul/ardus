package word_validator

import (
	"fmt"
	"strings"
)

// TODO:
// - translate code to english :)
// - call the functions from cmd/cli/cli.go

func fusionneListesTriees(liste1 []string, liste2 []string) []string {
	var liste, ssliste1, ssliste2, finliste []string
	if len(liste1) == 0 {
		return liste2
	}
	if len(liste2) == 0 {
		return liste1
	}
	test := strings.Compare(liste1[0], liste2[0])
	if test <= 0 {
		liste = append(liste, liste1[0])
		ssliste1 = liste1[1:]
		ssliste2 = liste2
	} else {
		liste = append(liste, liste2[0])
		ssliste1 = liste1
		ssliste2 = liste2[1:]
	}
	finliste = fusionneListesTriees(ssliste1, ssliste2)
	liste = append(liste, finliste...)
	return liste
}

func triRapide(listeDepart []string) []string {
	l := len(listeDepart)
	if l <= 1 {
		return listeDepart
	}

	var liste1, liste2 []string
	var rgpivot int
	rgpivot = l / 2
	liste1 = triRapide(listeDepart[0:rgpivot])
	liste2 = triRapide(listeDepart[rgpivot:l])

	return fusionneListesTriees(liste1, liste2)
}

func appartientMotListeTriee(mot string, liste []string) bool {
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
		result = appartientMotListeTriee(mot, ssliste)
	case 1:
		ssliste = liste[rgpivot:l]
		result = appartientMotListeTriee(mot, ssliste)
	}
	return result
}

func nbLettresBienPlacees(mot string, tentative string) int {
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
