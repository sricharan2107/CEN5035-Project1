package controllers

import (
	"BACKEND/Data"
	"BACKEND/services"
	"net/http"
	"github.com/gin-gonic/gin"
)

// GetQuizTopics retrieves quiz topics for a specific category and subcategory
func GetQuizTopics(c *gin.Context) {
	collection := Data.GetCollection("SkillArcade", "Quizzes")
	categoryName := c.Param("category")
	subCategoryName := c.Param("sub_category")
	// Fetch quiz topics from the service
	quizTopics, err := services.FetchQuizTopics(c, categoryName, subCategoryName,collection)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"quiz_topics": quizTopics})
}

func QuizTopicRouter(r *gin.Engine) {
	r.GET("/categories/:category/subcategories/:sub_category/quiz_topics", GetQuizTopics)  
}
