package version

import (
	"encoding/json"
	"fmt"
	"runtime"
)

const versionFormat = "ardus version %s (commit: %s, date: %s, go version: %s, platform: %s/%s)"

var Version = "development"

var Arch string
var CommitShortHash string
var Os string
var Time string

type FullVersion struct {
	Arch            string `json:"arch"`
	BuildTime       string `json:"build_time"`
	CommitShortHash string `json:"commit_short_hash"`
	Os              string `json:"os"`
	Version         string `json:"version"`
}

func String() string {
	return fmt.Sprintf(versionFormat, Version, CommitShortHash, Time, runtime.Version(), Os, Arch)
}

func Json() ([]byte, error) {
	v := FullVersion{
		Version:         Version,
		BuildTime:       Time,
		CommitShortHash: CommitShortHash,
		Os:              Os,
		Arch:            Arch,
	}
	b, err := json.Marshal(v)
	if err!=nil {
		return nil, err
	}
	return b, nil
}
