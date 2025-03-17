# Sprint 2 Report


## Visual Demo Links
- [DEMO](https://tinyurl.com/mrykh238)



## User Stories:
- Created 4 user stories spanning the features/user requirements of the Skill Arcade application. 
- Additional user stories will be introduced in the Later sprints to address emerging requirements, refine existing features, and ensure better alignment with project goals and user needs.
- These user stories can be found under the issues tab with the label [userstories](https://github.com/NavyaDurgam98/SkillArcade/issues) in this repository.



## Detailed Devlopment
### Backend Development  
- **Database**:
  - Quizzes Collection - This collection includes categories of technologies, their sub-categories and Quiz topics under each sub category. Each quiz topic has quiz_topic_name and a unique quiz_topic_id.  
  - QuizQuestions Collection - This collection includes all the questions for a particular quiz topic.
  - QuizQuestions collection's _id corresponds to quiz_topic_id in Quizzes Collection.
  
Quizzes Collection  
```json
{
  "_id": {
    "$oid": "67c5fd94b35fea672a80a3ea"
  },
  "category": "Computer Science",
  "sub_categories": [
    {
      "sub_category": "Programming Languages",
      "quiz_topics": [
        {
          "quiz_topic_id": {
            "$oid": "67c5fd91b35fea672a80a3e1"
          },
          "quiz_topic_name": "C++"
        },
        {
          "quiz_topic_id": {
            "$oid": "67c5fd91b35fea672a80a3e2"
          },
          "quiz_topic_name": "Java"
        },
        {
          "quiz_topic_id": {
            "$oid": "67c5fd92b35fea672a80a3e3"
          },
          "quiz_topic_name": "Python"
        },
        {
          "quiz_topic_id": {
            "$oid": "67c5fd92b35fea672a80a3e4"
          },
          "quiz_topic_name": "C#"
        }
      ]
    },
    {
      "sub_category": "Data Structures and Algorithms",
      "quiz_topics": [
        {
          "quiz_topic_id": {
            "$oid": "67c5fd92b35fea672a80a3e5"
          },
          "quiz_topic_name": "Arrays & Strings"
        },
        {
          "quiz_topic_id": {
            "$oid": "67c5fd92b35fea672a80a3e6"
          },
          "quiz_topic_name": "Graphs"
        }
      ]
    }
  ]
}
```
QuizQuestions Collection
```json
{
  "_id": {
    "$oid": "67c5fd91b35fea672a80a3e1"
  },
  "quiz_topic": "C++",
  "questions": [
    {
      "question": "What is the output of 'std::cout << 5/2;' in C++?",
      "options": [
        { "option_id": { "$numberInt": "1" }, "value": "2" },
        { "option_id": { "$numberInt": "2" }, "value": "2.5" },
        { "option_id": { "$numberInt": "3" }, "value": "2" },
        { "option_id": { "$numberInt": "4" }, "value": "Compilation Error" }
      ],
      "correct_option": { "$numberInt": "1" }
    },
    {
      "question": "Which keyword is used to prevent a function from being overridden?",
      "options": [
        { "option_id": { "$numberInt": "1" }, "value": "static" },
        { "option_id": { "$numberInt": "2" }, "value": "const" },
        { "option_id": { "$numberInt": "3" }, "value": "final" },
        { "option_id": { "$numberInt": "4" }, "value": "volatile" }
      ],
      "correct_option": { "$numberInt": "3" }
    },
    {
      "question": "Which of the following is not a valid C++ access specifier?",
      "options": [
        { "option_id": { "$numberInt": "1" }, "value": "public" },
        { "option_id": { "$numberInt": "2" }, "value": "protected" },
        { "option_id": { "$numberInt": "3" }, "value": "private" },
        { "option_id": { "$numberInt": "4" }, "value": "internal" }
      ],
      "correct_option": { "$numberInt": "4" }
    },
    {
      "question": "What does the 'new' keyword do in C++?",
      "options": [
        { "option_id": { "$numberInt": "1" }, "value": "Allocates memory" },
        { "option_id": { "$numberInt": "2" }, "value": "Deallocates memory" },
        { "option_id": { "$numberInt": "3" }, "value": "Initializes a variable" },
        { "option_id": { "$numberInt": "4" }, "value": "None of the above" }
      ],
      "correct_option": { "$numberInt": "1" }
    },
    {
      "question": "Which of the following is a C++ STL container?",
      "options": [
        { "option_id": { "$numberInt": "1" }, "value": "Stack" },
        { "option_id": { "$numberInt": "2" }, "value": "Queue" },
        { "option_id": { "$numberInt": "3" }, "value": "Vector" },
        { "option_id": { "$numberInt": "4" }, "value": "All of the above" }
      ],
      "correct_option": { "$numberInt": "4" }
    }
  ]
}
```
- **Dataset**:
  -Quiz Dataset: This dataset used in this project was custom-built by us to ensure it aligns with the project's needs.
- **API**'s:
  Implemented API's to fetch quiz data like names of categories, sub-categories of each category, the quiz topics and the corresponding questions.

### Backend Testing
- **Testify & mtest**:
  - Used **testify** suite for structured testing and **mtest** for mocking mongoDB interactions.
  - The tests structure allows to thoroughly test database interactions , covering success and various failure scenarios, all without needing a real database.
  - Code includes a complete test suite covering all services to validate their functionality and performance. These tests help maintain code quality and prevent regressions.

## TestFetchQuizQuestions
-  **Success**: Fetches quiz questions successfully.
-  **not_found**: Handles case where quiz questions are not found.
-  **database_error**: Handles database failure scenario.

## TestFetchSubCategories
-  **Success**: Successfully retrieves subcategories.
-  **not_found**: Handles case where subcategories are not found.
-  **database_error**: Handles database failure scenario.

## TestFetchQuizTopics
-  **Success**: Successfully fetches quiz topics.
-  **not_found**: Handles case where quiz topics are not found.
-  **database_error**: Handles database failure scenario.

## TestFetchCategories
-  **Success**: Retrieves categories successfully.
-  **not_found**: Handles case where categories are not found.
-  **database_error**: Handles database failure scenario.


### Frontend Development  
- Implemented **Technology Panels** with the following features:
  - **Dashboard Component** - Displays all the **domains** in Computer Science Engineering.
  - **Technology Category Panel** - Fetches categories dynamically and renders them.
  - **Sub-Technology Category Panel** - Displays relevant **quiz topics** based on the selected category.
- Developed **Quiz Component** with the following functionalities:
  - Clicking on a **quiz topic** opens a page to **take the quiz**.
  - Implemented **quiz rendering** when clicking the **Start button**.
  - Built browser-side **validation** to check quiz answers.
  - **Redirected users** to quiz topics after quiz completion.
- **Data Integration**:
  - Integrated the backend API to fetch **categories and quiz topics**.
  - Ensured smooth **state management** for navigation.
 
### Frontend Testing:([[List of Frontend Unit Tests & cypress Tests](https://github.com/NavyaDurgam98/SkillArcade/issues/41)](https://github.com/NavyaDurgam98/SkillArcade/issues/41))
- **Jasmine & Karma Unit Tests**:
  - Developed test cases for **Login, Signup, Dashboard, Category, Quiz and TakeQuiz Components**.
  - Ensured each component met expected functionality and behavior.
- **Cypress E2E Testing**:
  - Conducted **end-to-end tests** for **Login**.
  - Validated **form submission, routing, error handling, and UI consistency**.








## Stories & Issues Planned to Address  
 
### User Authentication Implementation  
- Develop APIs for **SignUp, SignIn, Forgot Password, and Reset Password**.  
- Implement **JWT authentication** for session-based login.  
- Validate **user input** and handle errors during authentication.  

### Frontend Development  
- Set up **Angular** and configure the project structure.  
- Implement **routing** between login and signup pages.  
- Develop **user input validation** and display appropriate error messages.  
- Integrate the frontend with **backend authentication APIs**.  

### Database Integration  
- Connect the **Go backend to MongoDB** for data storage.  
- Ensure **efficient querying and data handling**.  

### Bug Fixes and UI Enhancements  
- Resolve **Angular routing issues** preventing navigation between components.  
- Improve the **UI for a better user experience**.  

### Testing and Debugging  
- Use **Postman** to test APIs and validate database interactions.  
- Debug issues related to **form validation, authentication, and API responses**.  



## Development:
### Backend:  
- Set up Go using the Gin/Gonic framework and MongoDB as the database.  
- Established a database connection and implemented four API routes.  
- Created test API's with a POST operation to store data in the database.  
- Developed SignUp, SignIn, Forgot Password, and Reset Password APIs.  
- Implemented JWT authentication for session-based sign-in.  
- Integrated Twilio (a third-party mailing API) to handle Forgot Password requests.
#### Testing:
- Tested test-API using Postman and validated respective changes in DB.
- Tested CRUD operations in DB by calling APIs through Postman.
- Tested the User Interface by hosting on a localhost server.
### FrontEnd:
- Set up Angular by installing Node.js and Angular CLI, creating a project with ng new, and running ng serve.  
- Created three components: App, Login, and Signup, where the App component is the main one, and routing happens here.   
- Validation for all pages is done, and the user is displayed with error messages when they miss the required fields.

## Issues Not Completed and Reasons  

While significant progress was made, the following issues were not completed due to time constraints and learning curve challenges:  

### Frontend Out of Scope Tasks  
- **Dashboard development is still in progress** *(out of Sprint 1 scope)*.  
- **CORS issues** are causing API request failures *(out of Sprint 1 scope)*.  

### Backend Pending Tasks  
- **CORS implementation** is pending. *(out of Sprint 1 scope)*
- **Password hashing/encryption** is not yet implemented.  
- **Full API integration with the frontend** is still ongoing.  

## Reasons for Incompletion  

- Since team was working with **Go** and **Angular** for the first time, a significant portion of the sprint was spent learning these technologies, setting up the project structure, and understanding best practices.  

- Initial time was spent getting familiar with **Git workflows** and setting up the directory structure properly.  

- Integrating **MongoDB with Go** and structuring **API requests for the frontend** required additional time and debugging.  

- Issues like **routing errors in Angular** and **API CORS restrictions** delayed progress in API integration.  



## Closing Note  

Despite these challenges, **Sprint 1 was successful** in establishing a solid foundation for the project.  

Moving forward, our focus will be on:  
- Completing the **Backlog tasks**.  
- Resolving **CORS issues**.  
- Further improving **frontend-backend integration**.  

