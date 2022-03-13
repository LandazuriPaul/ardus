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

const dictionariesPath = "dictionaries"

var ValidWordList []string

func init() {
	rand.Seed(time.Now().UnixNano())
}

func Load(lang Lang) error {
	dictFilename := lang.String() + ".txt"
	dictPath := path.Join(dictionariesPath, dictFilename)
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
	i := rand.Intn(len(ValidWordList))
	return ValidWordList[i]
}
