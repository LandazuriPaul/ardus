package http_server

import (
	log "github.com/sirupsen/logrus"
	"net/http"
)

func serverError(w http.ResponseWriter, err error) {
	log.Errorf("server error (%d response): %v", http.StatusInternalServerError, err)
	w.WriteHeader(http.StatusInternalServerError)
}
