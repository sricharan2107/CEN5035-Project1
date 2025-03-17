package tests

import (
	"BACKEND/models"
	"BACKEND/services"
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/integration/mtest"
)

type QuizQuestionServiceTestSuite struct {
	suite.Suite
	mt *mtest.T
}

func TestQuizQuestionServiceTestSuite(t *testing.T) {
	suite.Run(t, new(QuizQuestionServiceTestSuite))
}

func (s *QuizQuestionServiceTestSuite) SetupTest() {
	s.mt = mtest.New(s.T(), mtest.NewOptions().ClientType(mtest.Mock))
}

func (s *QuizQuestionServiceTestSuite) TestFetchQuizQuestions() {
	s.mt.Run("success", func(mt *mtest.T) {
		expectedQuiz := &models.Quiz{
			QuizTopic: "TestTopic",
			Questions: []models.Question{
				{
					Question: "Test Question",
					Options: []models.Option{
						{OptionID: 1, Value: "Option A"},
						{OptionID: 2, Value: "Option B"},
						{OptionID: 3, Value: "Option C"},
						{OptionID: 4, Value: "Option D"},
					},
					CorrectOption: 1,
				},
			},
		}

		mt.AddMockResponses(mtest.CreateCursorResponse(1, "dbname.collection", mtest.FirstBatch, bson.D{
			{Key: "quiz_topic", Value: expectedQuiz.QuizTopic},
			{Key: "questions", Value: expectedQuiz.Questions},
		}))
		result, err := services.FetchQuizQuestions(context.Background(), mt.Coll, "TestTopic")
		assert.NoError(s.T(), err)
		assert.Equal(s.T(), expectedQuiz, result)
	})

	s.mt.Run("not_found", func(mt *mtest.T) {
		mt.AddMockResponses(mtest.CreateCursorResponse(0, "dbname.collection", mtest.FirstBatch))
		result, err := services.FetchQuizQuestions(context.Background(), mt.Coll, "NonExistentTopic")
		assert.Error(s.T(), err)
		assert.Nil(s.T(), result)
		assert.Contains(s.T(), err.Error(), "mongo: no documents in result")
	})

	s.mt.Run("database_error", func(mt *mtest.T) {
		mt.AddMockResponses(mtest.CreateCommandErrorResponse(mtest.CommandError{
			Code:    12345,
			Message: "Test database error",
		}))
		result, err := services.FetchQuizQuestions(context.Background(), mt.Coll, "TestTopic")
		assert.Error(s.T(), err)
		assert.Nil(s.T(), result)
		assert.Contains(s.T(), err.Error(), "Test database error")
	})
}
