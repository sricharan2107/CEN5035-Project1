package services_test

import (
	"context"
	"testing"
	"BACKEND/models"
	"BACKEND/services"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/integration/mtest"
	"github.com/stretchr/testify/assert"
)

func TestFetchQuizTopics(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	mt.Run("success", func(mt *mtest.T) {
		expectedQuizTopics := []models.QuizTopic{
			{QuizTopicID: "1", QuizTopicName: "Topic 1"},
			{QuizTopicID: "2", QuizTopicName: "Topic 2"},
		}

		mt.AddMockResponses(mtest.CreateCursorResponse(1, "dbname.categories", mtest.FirstBatch, bson.D{
			{Key: "category", Value: "Math"},
			{Key: "sub_categories", Value: bson.A{
				bson.D{
					{Key: "sub_category", Value: "Algebra"},
					{Key: "quiz_topics", Value: expectedQuizTopics},
				},
			}},
		}))

		collection := mt.Coll
		result, err := services.FetchQuizTopics(context.Background(), "Math", "Algebra", collection)

		assert.NoError(t, err)
		assert.Equal(t, expectedQuizTopics, result)
	})

	mt.Run("category_not_found", func(mt *mtest.T) {
		mt.AddMockResponses(mtest.CreateCursorResponse(0, "dbname.categories", mtest.FirstBatch))

		collection := mt.Coll
		result, err := services.FetchQuizTopics(context.Background(), "NonexistentCategory", "SubCategory", collection)

		assert.Error(t, err)
		assert.Nil(t, result)
		assert.Contains(t, err.Error(), "error finding category or subcategory")
	})

	mt.Run("subcategory_not_found", func(mt *mtest.T) {
		mt.AddMockResponses(mtest.CreateCursorResponse(1, "dbname.categories", mtest.FirstBatch, bson.D{
			{Key: "category", Value: "Math"},
			{Key: "sub_categories", Value: bson.A{
				bson.D{
					{Key: "sub_category", Value: "Geometry"},
					{Key: "quiz_topics", Value: bson.A{}},
				},
			}},
		}))

		collection := mt.Coll
		result, err := services.FetchQuizTopics(context.Background(), "Math", "Algebra", collection)

		assert.Error(t, err)
		assert.Nil(t, result)
		assert.Contains(t, err.Error(), "subcategory 'Algebra' not found under category 'Math'")
	})
}
