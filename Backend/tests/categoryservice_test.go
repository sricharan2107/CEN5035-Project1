package services_test

import (
	"context"
	"testing"
	"BACKEND/services" 
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/integration/mtest"
	"github.com/stretchr/testify/assert"
)

func TestFetchCategories(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))
	

	expectedCategories := []services.CategoryOnly{
		{CategoryName: "Math"},
		{CategoryName: "Science"},
	}

	mt.Run("success", func(mt *mtest.T) {
		mt.AddMockResponses(
			mtest.CreateCursorResponse(1, "dbname.categories", mtest.FirstBatch, 
				bson.D{{Key: "category", Value: "Math"}},
				bson.D{{Key: "category", Value: "Science"}},
			),
			mtest.CreateCursorResponse(0, "dbname.categories", mtest.NextBatch),
		)
	
		collection := mt.Coll
		result, err := services.FetchCategories(context.Background(), collection)
	
		t.Logf("Result: %+v", result)
		t.Logf("Error: %v", err)
	
		assert.NoError(mt, err)
		assert.Equal(mt, expectedCategories, result)
	})
	

	mt.Run("no_categories", func(mt *mtest.T) {
		// Simulate an empty collection (no results)
		mt.AddMockResponses(mtest.CreateCursorResponse(0, "dbname.categories", mtest.FirstBatch))

		// Call FetchCategories function
		collection := mt.Coll // Use the mock collection
		result, err := services.FetchCategories(context.Background(), collection)

		assert.NoError(t, err)
		assert.Empty(t, result)
	})

	mt.Run("database_error", func(mt *mtest.T) {
		mt.AddMockResponses(mtest.CreateCommandErrorResponse(mtest.CommandError{
			Code:    12345,
			Message: "Database error",
		}))

		collection := mt.Coll // Use the mock collection
		result, err := services.FetchCategories(context.Background(), collection)

		assert.Error(t, err)
		assert.Nil(t, result)
		assert.Contains(t, err.Error(), "error fetching categories")
	})
}
