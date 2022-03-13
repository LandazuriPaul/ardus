package http_server

import (
	"encoding/json"
	"fmt"
	"github.com/landazuripaul/ardus/pkg/play"
	log "github.com/sirupsen/logrus"
	"io"
	"net/http"
)

type GameInfo struct {
	RoomId       string `json:"room-id"`
	AttemptCount int    `json:"attempt-count"`
}

type GameMove struct {
	RoomId    string `json:"room-id"`
	GuessWord string `json:"guess-word"`
}

func GetGameHandler(w http.ResponseWriter, r *http.Request) {
	newRoom := play.CreateRoom()

	data := GameInfo{RoomId: newRoom.Id, AttemptCount: newRoom.AttemptCount}
	response, err := json.Marshal(data)
	if err != nil {
		serverError(w, fmt.Errorf("encoding the JSON response: %w", err))
	}

	// send response
	w.Write(response)
}

func PostGameHandler(w http.ResponseWriter, r *http.Request) {
	// read body
	defer r.Body.Close()
	body, err := io.ReadAll(r.Body)
	if err != nil {
		serverError(w, fmt.Errorf("reading the body: %w", err))
		return
	}

	// pars body
	var move GameMove
	err = json.Unmarshal(body, &move)
	if err != nil {
		serverError(w, fmt.Errorf("unmarshalling body in PostGameHandler: %w", err))
		return
	}

	// TODO: replace this log by actual game move
	log.Infof("let's play the word %v in room %v", move.RoomId, move.GuessWord)

	// send response
	w.WriteHeader(http.StatusOK)
}
