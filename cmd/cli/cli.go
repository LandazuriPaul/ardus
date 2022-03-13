package main

import (
	"flag"
	"fmt"
	"github.com/landazuripaul/ardus/pkg/version"
	"log"
	"os"

	"github.com/landazuripaul/ardus/pkg/dictionary"
	"github.com/landazuripaul/ardus/pkg/word_validator"
)

// TODO:
// - translate code to english :)
// - call the functions from cmd/cli/cli.go

//

func main() {
	// version check
	var isVersionCheck bool
	flag.BoolVar(&isVersionCheck, "v", false, "version")
	flag.Parse()
	if isVersionCheck {
		fmt.Println(version.String())
		os.Exit(0)
	}

	// could be changed / dynamically set
	lang := dictionary.French

	err := dictionary.Load(lang)
	if err != nil {
		log.Fatalf("an error occurred when loading the %s dictionary: %s", lang, err)
	}

	mysteriousWord := dictionary.GetRandomWord()
	word_validator.GuessMysteriousWord(mysteriousWord)
}
