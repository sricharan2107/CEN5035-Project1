package main

import (
	"BACKEND/Data"
	"BACKEND/controllers"
	"BACKEND/middlewares"
	"log"
	"net/http" // handles http requests and responses

	"github.com/gin-gonic/gin" // for using gin framework
	"github.com/joho/godotenv"
)

func main() {

	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Initialize DB connection
	Data.ConnectToDB()

	// Initialize Gin router for handling incoming API requests
	r := gin.Default()

	// Apply CORS middleware globally
	r.Use(middlewares.CORSMiddleware())

	// User authentication routes
	controllers.UserLoginRouter(r)
	controllers.UserRegisterRouter(r)
	controllers.ForgotRouter(r)
	controllers.ResetRouter(r)
	controllers.CategoryRouter(r)
	controllers.SubCategoryRouter(r)
	controllers.QuizTopicRouter(r)
	controllers.QuizQuestionsRouter(r)

	// Protected routes (require JWT authentication)
	protected := r.Group("/api")
	protected.Use(middlewares.JWTMiddleware())
	{
		protected.GET("/dashboard", func(c *gin.Context) {
			username, _ := c.Get("username")
			c.JSON(http.StatusOK, gin.H{"message": "Welcome to the Dashboard!", "user": username})
		})
	}

	// Run server on port 8080
	r.Run(":8080")
}
