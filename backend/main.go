package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/kamisettysudheer/ampcloudranger/backend/routes"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	router := gin.Default()
	routes.RegisterRoutes(router)

	err = router.Run(":8080")
	if err != nil {
		log.Fatal("Failed to run server: ", err)
	}

}
