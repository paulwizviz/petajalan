package handler

import (
	"embed"
	"net/http"

	"github.com/gorilla/mux"
)

const (
	URLRootPath = "/"
)

//go:embed index.html
//go:embed bundle.js
//go:embed images
var web embed.FS

func RunWeb(router *mux.Router) {
	router.PathPrefix(URLRootPath).Handler(http.FileServer(http.FS(web)))
}
