package play

import (
	"fmt"
	"github.com/landazuripaul/ardus/pkg/dictionary"
	log "github.com/sirupsen/logrus"
	"math/rand"
)

const roomIdLength = 5

type Room struct {
	Id           string
	GuessWord    string
	AttemptCount int
}

// FIXME: this map never clears
// TODO: have a proper TTL cache system
var roomMap map[string]*Room

func init() {
	roomMap = make(map[string]*Room)
}

func GetRoom(roomId string) (*Room, error) {
	room, ok := roomMap[roomId]
	if !ok {
		return nil, fmt.Errorf("no room found for id: %v", roomId)
	}
	return room, nil
}

func DeleteRoom(roomId string) {
	delete(roomMap, roomId)
}

func CreateRoom() *Room {
	id := newRoomId()
	room := &Room{
		Id:           id,
		GuessWord:    dictionary.GetRandomWord(),
		AttemptCount: 0,
	}
	roomMap[id] = room
	log.Infof("new room created with id %s", id)
	return room
}

func newRoomId() string {
	for {
		roomId := generateRoomId()
		_, err := GetRoom(roomId)
		if err != nil {
			return roomId
		}
	}
}

func generateRoomId() string {
	bytes := make([]byte, roomIdLength)
	for i := 0; i < roomIdLength; i++ {
		bytes[i] = byte(randInt(65, 90))
	}
	return string(bytes)
}

func randInt(min int, max int) int {
	return min + rand.Intn(max-min)
}
