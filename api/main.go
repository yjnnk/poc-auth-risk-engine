package main

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/rs/cors"
)

var (
	serverStartTime  time.Time
	someBFFCallCount int
	mu               sync.Mutex
)

type ResponseFromPolling struct {
	AuthenticatedByUser bool `json:"authenticatedByUser"`
}

type ResponseFromBff struct {
	Challenge string `json:"challenge,omitempty"`
	Data      string `json:"data,omitempty"`
}

func main() {

	serverStartTime = time.Now()
	mux := http.NewServeMux()
	mux.HandleFunc("/api/check-authentication", checkAuthenticationHandler)
	mux.HandleFunc("/api/some-bff", someBFFHandler)

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"*"},
	})

	handler := c.Handler(mux)

	log.Println("servidor na porta 3000.")
	err := http.ListenAndServe(":3000", handler)
	if err != nil {
		log.Fatalf("Erro no servidor: %v", err)
	}

}

func checkAuthenticationHandler(w http.ResponseWriter, r *http.Request) {

	elapsedTime := time.Since(serverStartTime)

	var response ResponseFromPolling
	if elapsedTime < 10*time.Second {
		response = ResponseFromPolling{AuthenticatedByUser: false}
	} else {
		response = ResponseFromPolling{AuthenticatedByUser: true}
	}

	jsonResponse, err := json.Marshal(response)

	if err != nil {
		http.Error(w, "Error generating JSON response", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func someBFFHandler(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	w.Header().Set("Content-Type", "application/json")

	riskHeader := r.Header.Get("x-custom-header")
	isAuthorized := riskHeader == "true"

	someBFFCallCount++

	var response ResponseFromBff

	if isAuthorized {
		response = ResponseFromBff{Challenge: "URA"}
		w.WriteHeader(http.StatusExpectationFailed)
	} else {
		response = ResponseFromBff{Data: "ok, autenticado: sua resposta do BFF"}
		w.WriteHeader(http.StatusOK)
	}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Err", http.StatusInternalServerError)
		return
	}

	w.Write(jsonResponse)
}
