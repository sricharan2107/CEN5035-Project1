import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizComponent } from './quiz.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => 'Programming Languages' // Mock sub-category name
      }
    }
  };

  const mockQuizTopics = [
    { quiz_topic: 'C++ Basics' },
    { quiz_topic: 'Java Fundamentals' },
    { quiz_topic: 'Python Essentials' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizComponent, HttpClientTestingModule], // ✅ Import standalone component
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;

    
    component.quizTopics = mockQuizTopics;

    fixture.detectChanges();
});


  // 2 Check if component is created
  it('should create the quiz component', () => {
    expect(component).toBeTruthy();
  });

 

  // 2. Check if the correct number of quiz topics is displayed
  it('should display the correct number of quiz topic cards', () => {
    fixture.detectChanges();
    const quizTopicElements = fixture.debugElement.queryAll(By.css('.card'));

    expect(quizTopicElements.length).toBe(mockQuizTopics.length);
  });

  // 3. Check if quiz topic names are rendered correctly
  it('should display correct quiz topic names', () => {
    fixture.detectChanges();
    const quizTopicTitles = fixture.debugElement.queryAll(By.css('.card-title'));

    quizTopicTitles.forEach((element, index) => {
      expect(element.nativeElement.textContent.trim()).toBe(mockQuizTopics[index].quiz_topic);
    });
  });

  // 4. Check if button click triggers `takeQuiz()`
  it('should call takeQuiz() when the button is clicked', () => {
    spyOn(component, 'takeQuiz');

    // 5 Ensure the quiz topics are set before querying the DOM
    component.quizTopics = mockQuizTopics;
    fixture.detectChanges(); //  Trigger UI update

    const button = fixture.debugElement.query(By.css('.btn-primary'));

    expect(button).toBeTruthy(); // Ensure button exists before clicking

    button.nativeElement.click();

    expect(component.takeQuiz).toHaveBeenCalledWith(mockQuizTopics[0].quiz_topic);
  });

  // 5. Handle empty quiz topics gracefully
  it('should display no quiz topics if the API returns an empty array', () => {
    component.quizTopics = [];
    fixture.detectChanges();

    const quizTopicElements = fixture.debugElement.queryAll(By.css('.card'));
    expect(quizTopicElements.length).toBe(0);
  });
});
