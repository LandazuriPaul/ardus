package config

import "github.com/spf13/viper"

func setDefaultConfigValues() {
	// HTTP server defaults
	viper.SetDefault("HTTP_HOST", "localhost")
	viper.SetDefault("HTTP_IDLE_TIMEOUT", 60)
	viper.SetDefault("HTTP_PORT", "8080")
	viper.SetDefault("HTTP_READ_TIMEOUT", 15)
	viper.SetDefault("HTTP_WRITE_TIMEOUT", 15)

	// logger defaults
	viper.SetDefault("LOG_LEVEL", "info")

	// DB defaults
	viper.SetDefault("POSTGRES_DATABASE", "postgres")
	viper.SetDefault("POSTGRES_HOST", "localhost")
	viper.SetDefault("POSTGRES_PORT", 5432)
	viper.SetDefault("POSTGRES_PASSWORD", "postgres")
	viper.SetDefault("POSTGRES_USER", "postgres")

	viper.SetDefault("MQTT_CLIENT_ID", "mqtt")
	viper.SetDefault("MQTT_PORT", 1883)
	viper.SetDefault("MQTT_PASSWORD", "")
	viper.SetDefault("MQTT_USER", "")
}
