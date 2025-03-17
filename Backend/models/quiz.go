
package models
type CategoryOnly struct {
    CategoryName string `json:"category" bson:"category"`
}

// Category represents the category structure with subcategories and quiz topics.
type Category struct {
	CategoryName  string        `json:"category" bson:"category"`
	SubCategories []SubCategory `json:"sub_categories" bson:"sub_categories"`
}

// SubCategory represents a subcategory in the category, which contains quiz topics.
type SubCategory struct {
	SubCategoryName string      `json:"sub_category" bson:"sub_category"`
	QuizTopics      []QuizTopic `json:"quiz_topics" bson:"quiz_topics"`
}

// QuizTopic represents a quiz topic within a subcategory.
type QuizTopic struct {
	QuizTopicID   string `json:"quiz_topic_id" bson:"quiz_topic_id"`
	QuizTopicName string `json:"quiz_topic_name" bson:"quiz_topic_name"`
}
