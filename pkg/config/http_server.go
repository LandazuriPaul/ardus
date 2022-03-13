package config

import (
	"fmt"
	"github.com/spf13/viper"
	"time"
)

type HttpServerConfig struct {
	Host         string
	IdleTimeout  time.Duration
	Port         uint
	Protocol     string
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
}

var HttpServer *HttpServerConfig

func (s *HttpServerConfig) Address() string {
	return fmt.Sprintf("%s:%d", s.Host, s.Port)
}

func loadHttpServerConfig() {
	HttpServer = &HttpServerConfig{
		Host:         viper.GetString("HTTP_HOST"),
		IdleTimeout:  time.Second * time.Duration(viper.GetInt("HTTP_IDLE_TIMEOUT")),
		Port:         viper.GetUint("HTTP_PORT"),
		ReadTimeout:  time.Second * time.Duration(viper.GetInt("HTTP_READ_TIMEOUT")),
		WriteTimeout: time.Second * time.Duration(viper.GetInt("HTTP_WRITE_TIMEOUT")),
	}
}
