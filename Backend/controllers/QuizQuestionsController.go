package controllers

import (
	"BACKEND/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func QuizQuestionsRouter(r *gin.Engine) {
	r.GET("/quiz/:quizTopic", GetQuizQuestions)
}

func GetQuizQuestions(c *gin.Context) {
	quizTopic := c.Param("quizTopic")
	collection := Data.GetCollection("SkillArcade", "QuizQuestions")
	quiz, err := services.FetchQuizQuestions(c, collection, quizTopic)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, quiz)
}
