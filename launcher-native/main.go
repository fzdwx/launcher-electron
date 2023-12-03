package main

import (
	"fmt"
	"net/http"
)

func main() {
	err := http.ListenAndServe(":8080", new(Server))
	if err != nil {
		panic(err)
	}
}

type Server struct {
}

func (s Server) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	fmt.Fprintf(writer, "Hello, World! 123123")
}
