import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TakequizService } from './takequiz.service';
import { RouterModule } from '@angular/router';

interface Question {
  question: string;
  options: { option_id: number; value: string }[];
  correct_option: number;
}

interface Topic {
  quiz_topic: string;
  questions: Question[];
}

@Component({
  selector: 'app-quiz',
  templateUrl: './takequiz.component.html',
  styleUrls: ['./takequiz.component.css'],
  imports: [CommonModule,RouterModule]
})
export class  TakeQuizComponent implements OnInit{

  category: string = '';
  subcategory: string = '';
  quizTopic: string = '';
  quizTopicsList: any[] = [];
  quizData: Topic | null = null; 

  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  score = 0;
  showModal = false;
  quizStarted = false;
  loading = false;


  constructor(private route: ActivatedRoute,private router: Router,private takequizService: TakequizService)
  {}
  
  ngOnInit(): void {
    // Retrieve route parameters
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.subcategory = params['subcategory'];
      this.quizTopic = params['quizTopic'];
      console.log(this.quizTopic);

      // Fetch quiz data from JSON file
      this.loadQuizData();
    });
  }

  loadQuizData() {
    this.loading = true;
  
    this.takequizService.getQuizData(this.quizTopic).subscribe(
      data => {
        console.log("Fetched API Data:", data);
  
        if (!data) {
          console.error("No quiz data found for topic:", this.quizTopic);
          this.loading = false;
          return;
        }
  
        // Store quiz data from API response
        this.quizData = data; 
        this.loading = false;
      },
      error => {
        console.error("Error fetching quiz data:", error);
        this.loading = false;
      }
    );
  }

  selectTopic(quizTopic: string): void {
    this.quizTopic = quizTopic;
    this.loading = true;
    this.quizStarted = false;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.score = 0;

    // Navigate to new quiz topic
    this.router.navigate(['/', this.category, this.subcategory, this.quizTopic, 'takequiz']).then(() => {
      this.loadQuizData();
    });
  }

  startQuiz(): void {
    if (!this.quizData) {
      console.error("Quiz data is not loaded!");
      return;
    }
    this.quizStarted = true;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.score = 0;
  }

  selectAnswer(optionId: number): void {
    this.selectedAnswer = optionId;
  }

  nextQuestion(): void {
    if (this.quizData && this.currentQuestionIndex < this.quizData.questions.length - 1) {
      this.checkAnswer();
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
    }
  }

  submitQuiz(): void {
    this.checkAnswer();
    this.showModal = true;
  }

  checkAnswer(): void {
    if (this.quizData && this.selectedAnswer === this.quizData.questions[this.currentQuestionIndex].correct_option) {
      this.score++;
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.quizTopic = '';  // Reset selected quiz topic
    this.quizData = null;  // Clear quiz data
    this.quizStarted = false;
    this.selectedAnswer = null;
    this.currentQuestionIndex = 0;
    this.score = 0;

    // Navigate back to the base URL of the subcategory
    this.router.navigate(['/takequiz', this.category, this.subcategory]);
  }

  retryQuiz(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswer = null;
    this.showModal = false;
}

  isLastQuestion(): boolean {
    return this.quizData ? this.currentQuestionIndex === this.quizData.questions.length - 1 : false;
  }

  progressWidth(): string {
    if (!this.quizData) return '0%';
    return `${((this.currentQuestionIndex + 1) / this.quizData.questions.length) * 100}%`;
  }

  getOptionLabel(index: number): string {
    return ['A', 'B', 'C', 'D'][index] || '';
  }
}
