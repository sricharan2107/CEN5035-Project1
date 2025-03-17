import { TestBed } from '@angular/core/testing';
import { TakequizService } from './takequiz.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TakequizService', () => {
  let service: TakequizService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [TakequizService]
    });

    service = TestBed.inject(TakequizService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch quiz data for a given topic', () => {
    const mockQuizData = { quiz_topic: 'Graphs', questions: [{ question: 'What is a graph?', options: ['A', 'B'], correct_option: 1 }] };

    service.getQuizData('Graphs').subscribe(data => {
      expect(data).toEqual(mockQuizData);
    });

    const req = httpMock.expectOne('http://localhost:8080/quiz/Graphs');
    expect(req.request.method).toBe('GET');
    req.flush(mockQuizData);
  });
});
