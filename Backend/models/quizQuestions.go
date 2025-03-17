package models

type Quiz struct {
	QuizTopic string     `json:"quiz_topic" bson:"quiz_topic"`
	Questions []Question `json:"questions" bson:"questions"`
}

type Question struct {
	Question      string   `json:"question" bson:"question"`
	Options       []Option `json:"options" bson:"options"`
	CorrectOption int      `json:"correct_option" bson:"correct_option"`
}

type Option struct {
	OptionID int    `json:"option_id" bson:"option_id"`
	Value    string `json:"value" bson:"value"`
}
