package http_server

import (
	"fmt"
	"github.com/landazuripaul/ardus/pkg/version"
	"net/http"
)

func versionHandler(w http.ResponseWriter, r *http.Request) {
	content, err := version.Json()
	if err != nil {
		serverError(w, fmt.Errorf("error when marshalling the version structure: %w", err))
		return
	}
	_, err = w.Write(content)
	if err != nil {
		serverError(w, fmt.Errorf("error when writing the version body: %w", err))
		return
	}
}
