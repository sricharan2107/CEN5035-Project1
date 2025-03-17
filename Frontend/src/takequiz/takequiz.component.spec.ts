import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TakeQuizComponent } from './takequiz.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TakequizService } from './takequiz.service';

describe('TakeQuizComponent', () => {
  let component: TakeQuizComponent;
  let fixture: ComponentFixture<TakeQuizComponent>;
  let mockTakequizService: jasmine.SpyObj<TakequizService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockTakequizService = jasmine.createSpyObj('TakequizService', ['getQuizData']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockTakequizService.getQuizData.and.returnValue(of({
        quiz_topic: 'Quantum',
        questions: [
          { question: 'What is Quantum?', options: [{ option_id: 1, value: 'Physics' }], correct_option: 1 }
        ]
    }));

    mockRouter.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [TakeQuizComponent,HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: TakequizService, useValue: mockTakequizService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: { params: of({ category: 'Science', subcategory: 'Physics', quizTopic: 'Quantum' }) }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve route parameters on initialization', () => {
    expect(component.category).toBe('Science');
    expect(component.subcategory).toBe('Physics');
    expect(component.quizTopic).toBe('Quantum');
  });

  it('should load quiz data from service', () => {
    const mockQuizData = {
      quiz_topic: 'Quantum',
      questions: [
        { question: 'What is Quantum?', options: [{ option_id: 1, value: 'Physics' }], correct_option: 1 }
      ]
    };

    mockTakequizService.getQuizData.and.returnValue(of(mockQuizData));

    component.loadQuizData();
    expect(component.quizData).toEqual(mockQuizData);
    expect(component.quizData?.quiz_topic).toBe('Quantum');
  });

  it('should select an answer', () => {
    component.selectAnswer(1);
    expect(component.selectedAnswer).toBe(1);
  });

  it('should increment question index on next question', () => {
    component.quizData = {
      quiz_topic: 'Quantum',
      questions: [
        { question: 'Q1', options: [], correct_option: 1 },
        { question: 'Q2', options: [], correct_option: 2 }
      ]
    };

    component.nextQuestion();
    expect(component.currentQuestionIndex).toBe(1);
  });

  it('should check and increase score if correct answer is selected', () => {
    component.quizData = {
      quiz_topic: 'Quantum',
      questions: [{ question: 'Q1', options: [], correct_option: 1 }]
    };
    component.selectedAnswer = 1;
    component.checkAnswer();
    expect(component.score).toBe(1);
  });

  it('should reset quiz data when closing modal', () => {
    component.closeModal();
    expect(component.quizData).toBeNull();
    expect(component.quizStarted).toBeFalse();
  });

  it('should navigate to a new quiz topic when selecting a topic', async () => {
  component.category = 'Science';
  component.subcategory = 'Physics';

  await component.selectTopic('Relativity');

  expect(mockRouter.navigate).toHaveBeenCalledWith([
    '/', 'Science', 'Physics', 'Relativity', 'takequiz'
  ]);
});

  it('should return correct progress width', () => {
    component.quizData = { quiz_topic: 'Test', questions: new Array(10) };
    component.currentQuestionIndex = 5;
    expect(component.progressWidth()).toBe('60%');
  });

  it('should detect last question correctly', () => {
    component.quizData = { quiz_topic: 'Test', questions: new Array(3) };
    component.currentQuestionIndex = 2;
    expect(component.isLastQuestion()).toBeTrue();
  });

  it('should reset the quiz on retry', () => {
    component.score = 5;
    component.currentQuestionIndex = 2;
    component.retryQuiz();
    expect(component.score).toBe(0);
    expect(component.currentQuestionIndex).toBe(0);
  });
});
