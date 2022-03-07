package main

import (
	"fmt"
	"github.com/LandazuriPaul/ardus/pkg/dictionary"
	"log"
)

func main() {
	// could be changed / dynamically set
	lang := dictionary.French

	err := dictionary.Load(lang)
	if err != nil {
		log.Fatalf("an error occurred when loading the %s dictionary: %s", lang, err)
	}

	mysteriousWord := dictionary.GetRandomWord()
	fmt.Printf("Mot à découvrir : %s\n", mysteriousWord)
}
