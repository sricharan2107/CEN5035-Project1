package services

import (
	// "BACKEND/Data"
	"BACKEND/models"
	"context"
	"fmt"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
)
func FetchQuizTopics(c context.Context, categoryName, subCategoryName string,collection *mongo.Collection) ([]models.QuizTopic, error) {
	// collection := Data.GetCollection("SkillArcade", "Quizzes")
	categoryName = strings.TrimSpace(categoryName) //for removing leading spaces
	subCategoryName = strings.TrimSpace(subCategoryName)
	filter := bson.M{
		"category":                 categoryName,
		"sub_categories.sub_category": subCategoryName,
	}
	var category models.Category
	err := collection.FindOne(c, filter).Decode(&category)
	if err != nil {
		return nil, fmt.Errorf("error finding category or subcategory: %v", err)
	}
	for _, subCategory := range category.SubCategories {
		if subCategory.SubCategoryName == subCategoryName {
			return subCategory.QuizTopics, nil
		}
	}

	return nil, fmt.Errorf("subcategory '%s' not found under category '%s'", subCategoryName, categoryName)
}
