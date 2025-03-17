package services

import (
	// "BACKEND/Data"
	"BACKEND/models"
	"context"
	"fmt"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
)
func FetchSubCategories(c context.Context, categoryName string,collection *mongo.Collection) ([]models.SubCategory, error) {
	// collection := Data.GetCollection("SkillArcade", "Quizzes")
	categoryName = strings.TrimSpace(categoryName)
	filter := bson.M{"category": categoryName}

	var category models.Category
	err := collection.FindOne(c, filter).Decode(&category)
	if err != nil {
		return nil, fmt.Errorf("error finding category: %v", err)
	}
	return category.SubCategories, nil
}
