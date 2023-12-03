package main

import (
	"flag"
	"fmt"
	"net/http"
	"os/exec"
	"strings"
)

func main() {
	port := flag.Int("port", 8080, "port to listen on")

	server := NewServer(port)
	server.ListenAndServe()
}

type Server struct {
	port int
}

func NewServer(port *int) *Server {
	s := &Server{
		port: *port,
	}

	s.mount()
	return s
}

func (s *Server) ListenAndServe() error {
	fmt.Println(fmt.Sprintf("Listening on http://localhost:%d", s.port))
	return http.ListenAndServe(fmt.Sprintf(":%d", s.port), nil)
}

func (s *Server) mount() {
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		fmt.Fprintf(writer, "Hello, World!")
	})
	http.HandleFunc("/getSelection", s.GetSelection)
}

func (s *Server) GetSelection(w http.ResponseWriter, r *http.Request) {
	var (
		command = exec.Command("xclip", "-o")
		out     strings.Builder
	)

	command.Stdout = &out
	if err := command.Run(); err != nil {
		fmt.Fprintf(w, "error: %v", err)
		return
	}
	fmt.Fprintf(w, out.String())
}
