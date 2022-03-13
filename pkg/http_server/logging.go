package http_server

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"net"
	"net/http"
	"strings"
)

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip, err := getRequestIP(r)
		for k, v := range r.Header {
			log.Debugf("Header %v: %v\n", k, v)
		}
		if err != nil {
			log.Errorf("error extracting IP from request: %v", err)
		}
		log.Infof("request received on endpoint `%s` from %s", r.RequestURI, ip)
		next.ServeHTTP(w, r)
	})
}

func getRequestIP(r *http.Request) (string, error) {
	// Get IP from the X-Real-Ip header
	realIP := r.Header.Get("X-Real-Ip")
	netIP := net.ParseIP(realIP)
	if netIP != nil {
		return realIP, nil
	}

	// Get IP from X-Forwarded-For header
	forwardedIpList := r.Header.Get("X-Forwarded-For")
	splitIps := strings.Split(forwardedIpList, ",")
	for _, forwardedIp := range splitIps {
		netIP = net.ParseIP(forwardedIp)
		if netIP != nil {
			return forwardedIp, nil
		}
	}

	// Get IP from RemoteAddr
	remoteIP, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return "", err
	}
	netIP = net.ParseIP(remoteIP)
	if netIP != nil {
		return remoteIP, nil
	}

	return "", fmt.Errorf("no valid IP found in request's headers (X-Real-Ip, X-Forwarded-For) or request's RemoteAddr")
}
