package tests

import (
	"BACKEND/models"
	"BACKEND/services"
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/integration/mtest"
)

func TestFetchSubCategories(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))
	mt.Run("success", func(mt *mtest.T) {
		mockCategory := bson.D{
			{Key: "category", Value: "Computer Science"},
			{Key: "sub_categories", Value: bson.A{
				bson.D{
					{Key: "sub_category", Value: "Programming Languages"},
					{Key: "quiz_topics", Value: bson.A{
						bson.D{{Key: "quiz_topic_id", Value: "1"}, {Key: "quiz_topic_name", Value: "C++"}},
						bson.D{{Key: "quiz_topic_id", Value: "2"}, {Key: "quiz_topic_name", Value: "Java"}},
					}},
				},
				bson.D{
					{Key: "sub_category", Value: "Data Structures"},
					{Key: "quiz_topics", Value: bson.A{
						bson.D{{Key: "quiz_topic_id", Value: "3"}, {Key: "quiz_topic_name", Value: "Arrays"}},
						bson.D{{Key: "quiz_topic_id", Value: "4"}, {Key: "quiz_topic_name", Value: "Graphs"}},
					}},
				},
			}},
		}
		mt.AddMockResponses(mtest.CreateCursorResponse(1, "dbname.collection", mtest.FirstBatch, mockCategory))
		expectedSubCategories := []models.SubCategory{
			{
				SubCategoryName: "Programming Languages",
				QuizTopics: []models.QuizTopic{
					{QuizTopicID: "1", QuizTopicName: "C++"},
					{QuizTopicID: "2", QuizTopicName: "Java"},
				},
			},
			{
				SubCategoryName: "Data Structures",
				QuizTopics: []models.QuizTopic{
					{QuizTopicID: "3", QuizTopicName: "Arrays"},
					{QuizTopicID: "4", QuizTopicName: "Graphs"},
				},
			},
		}
		result, err := services.FetchSubCategories(context.Background(), "Computer Science", mt.Coll)
		assert.NoError(t, err)
		assert.Equal(t, expectedSubCategories, result)
	})

	mt.Run("category_not_found", func(mt *mtest.T) {
		mt.AddMockResponses(mtest.CreateCommandErrorResponse(mtest.CommandError{
			Code:    404,
			Message: "category not found",
		}))
		result, err := services.FetchSubCategories(context.Background(), "Nonexistent Category", mt.Coll)
		assert.Error(t, err)
		assert.Nil(t, result)
		assert.Contains(t, err.Error(), "error finding category")
	})

	mt.Run("database_error", func(mt *mtest.T) {
		mt.AddMockResponses(mtest.CreateCommandErrorResponse(mtest.CommandError{
			Code:    12345,
			Message: "database error",
		}))
		result, err := services.FetchSubCategories(context.Background(), "Computer Science", mt.Coll)
		assert.Error(t, err)
		assert.Nil(t, result)
		assert.Contains(t, err.Error(), "error finding category")
	})
}
