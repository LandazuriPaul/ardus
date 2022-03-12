package dictionary

import (
	"bufio"
	"math/rand"
	"os"
	"path"
	"time"
)

type Lang int

const (
	Undefined Lang = iota
	French
)

func (l Lang) String() string {
	switch l {
	case French:
		return "french"
	}
	return "undefined"
}

const dictionariesDefaultPath = "dictionaries"

var ValidWordList []string

func Load(lang Lang) error {
	dictFilename := lang.String() + ".txt"
	dictPath := path.Join(dictionariesDefaultPath, dictFilename)
	file, err := os.Open(dictPath)
	if err != nil {
		return err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		ValidWordList = append(ValidWordList, scanner.Text())
	}
	return scanner.Err()
}

func GetRandomWord() string {
	rand.Seed(time.Now().UnixNano())
	i := rand.Intn(len(ValidWordList))
	return ValidWordList[i]
}
