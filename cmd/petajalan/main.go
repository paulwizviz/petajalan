package main

import (
	"fmt"
	"log"
	"net/http"
	"petajalan/internal/handler"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	//handler.RunWeb(router)
	handler.RunWeb(router)
	log.Fatal(http.ListenAndServe(fmt.Sprintf("0.0.0.0:%v", 3030), router))
}
