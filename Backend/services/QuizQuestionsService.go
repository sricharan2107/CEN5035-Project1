package services

import (
	"BACKEND/Data"
	"BACKEND/models"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func FetchQuizQuestions(c context.Context, collection *mongo.Collection, quizTopic string) (*models.Quiz, error) {
	filter := bson.M{"quiz_topic": quizTopic}
	var quiz models.Quiz

	err := collection.FindOne(c, filter, options.FindOne()).Decode(&quiz)
	if err != nil {
		return nil, fmt.Errorf("quiz not found")
	}
	return &quiz, nil
}
