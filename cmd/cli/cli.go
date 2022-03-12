package main

import (
	"log"

	"github.com/LandazuriPaul/ardus/pkg/dictionary"
	"github.com/LandazuriPaul/ardus/pkg/word_validator"
)

// TODO:
// - translate code to english :)
// - call the functions from cmd/cli/cli.go

//

func main() {
	// could be changed / dynamically set
	lang := dictionary.French

	err := dictionary.Load(lang)
	if err != nil {
		log.Fatalf("an error occurred when loading the %s dictionary: %s", lang, err)
	}

	mysteriousWord := dictionary.GetRandomWord()
	word_validator.GuessMysteriousWord(mysteriousWord)
}
