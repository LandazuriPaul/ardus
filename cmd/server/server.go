package main

import (
	"github.com/landazuripaul/ardus/pkg/config"
	"github.com/landazuripaul/ardus/pkg/dictionary"
	"github.com/landazuripaul/ardus/pkg/http_server"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func main() {
	config.Load()

	// could be changed / dynamically set
	lang := dictionary.French
	err := dictionary.Load(lang)
	if err != nil {
		log.Fatalf("an error occurred when loading the %s dictionary: %s", lang, err)
	}

	// get the router
	router := http_server.Router()

	// set up chef
	httpServerAddress := config.HttpServer.Address()
	server := &http.Server{
		Addr: config.HttpServer.Address(),
		// Good practice to set timeouts to avoid Slowloris attacks.
		IdleTimeout:  config.HttpServer.IdleTimeout,
		ReadTimeout:  config.HttpServer.ReadTimeout,
		WriteTimeout: config.HttpServer.WriteTimeout,
		Handler:      router,
	}

	// launch the chef
	log.Infof("> Ardus server is now ready to serve on %s", httpServerAddress)
	log.Fatal(server.ListenAndServe())
}
