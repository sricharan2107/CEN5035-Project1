package services

import (
	// "BACKEND/Data"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type CategoryOnly struct {
	CategoryName string `json:"category" bson:"category"`
}

func FetchCategories(c context.Context,collection *mongo.Collection) ([]CategoryOnly, error) {
	// collection := Data.GetCollection("SkillArcade", "Quizzes")
	filter := bson.M{}
	findOptions := options.Find()
	findOptions.SetProjection(bson.M{
		"category": 1, 
		"_id":      0, 
	})

	cursor, err := collection.Find(c, filter, findOptions)
	if err != nil {
		return nil, fmt.Errorf("error fetching categories: %v", err)
	}
	defer cursor.Close(c)

	var categories []CategoryOnly
	if err = cursor.All(c, &categories); err != nil {
		return nil, fmt.Errorf("error decoding categories: %v", err)
	}

	return categories, nil
}
