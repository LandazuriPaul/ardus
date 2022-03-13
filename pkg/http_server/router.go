package http_server

import (
	"github.com/gorilla/mux"
	"net/http"
)

const staticDir = "web"

func Router() *mux.Router {
	r := mux.NewRouter()

	// version endpoint
	r.Path("/version").HandlerFunc(versionHandler)

	// game
	r.HandleFunc("/game", GetGameHandler).Methods("GET")
	r.HandleFunc("/game", PostGameHandler).Methods("POST")

	// static files
	r.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir(staticDir))))

	// add middlewares
	r.Use(loggingMiddleware)

	return r
}
