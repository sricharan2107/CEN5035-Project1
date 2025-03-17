package Data

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client
var DBName string

// ConnectToDB connects to MongoDB Atlas and sets the global Client variable
func ConnectToDB() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Get MongoDB credentials from environment variables
	mongoUser := os.Getenv("MONGO_USER")
	mongoPassword := os.Getenv("MONGO_PASSWORD")
	mongoCluster := os.Getenv("MONGO_CLUSTER")

	//connect to DB
	ctx, cancel := context.WithTimeout(context.Background(), 1000*time.Second)
	defer cancel()
	uri := fmt.Sprintf("mongodb+srv://%s:%s@%s/?retryWrites=true&w=majority",
		mongoUser, mongoPassword, mongoCluster)

	// Create a new MongoDB client
	Client, err = mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal("Error creating MongoDB client:", err)
	}

	// Connect to MongoDB
	err = Client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Error connecting to MongoDB:", err)
	}
	fmt.Println("Connected to MongoDB!")

	passwordResetTokenCollection := GetCollection("SkillArcade", "PasswordResetToken")
	indexModel := mongo.IndexModel{
		Keys:    bson.M{"expires_at": 1},                  // Index on "expires_at" field
		Options: options.Index().SetExpireAfterSeconds(0), // Auto-delete expired documents
	}

	_, err = passwordResetTokenCollection.Indexes().CreateOne(ctx, indexModel)
	if err != nil {
		log.Fatal("Error creating TTL index:", err)
	}

}

// GetDatabase returns a MongoDB database
func GetDatabase(dbName string) *mongo.Database {
	return Client.Database(dbName)
}

// GetCollection returns a collection from the specified database
func GetCollection(dbName, collectionName string) *mongo.Collection {
	return GetDatabase(dbName).Collection(collectionName)
}

