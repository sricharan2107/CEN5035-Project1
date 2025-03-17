package controllers

import (
	"BACKEND/Data"
	"BACKEND/services"
	"net/http"
	"github.com/gin-gonic/gin"
)

// GetSubCategories retrieves subcategories for a specific category
func GetSubCategories(c *gin.Context) {
	collection := Data.GetCollection("SkillArcade", "Quizzes")
	categoryName := c.Param("category")
	subCategories, err := services.FetchSubCategories(c, categoryName,collection)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	var subCategoryNames []string
	for _, subCategory := range subCategories {
		subCategoryNames = append(subCategoryNames, subCategory.SubCategoryName)
	}
	c.JSON(http.StatusOK, gin.H{"sub_categories": subCategoryNames})
}
func SubCategoryRouter(r *gin.Engine) {
	r.GET("/categories/:category", GetSubCategories)  
}
