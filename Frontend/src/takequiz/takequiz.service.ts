import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TakequizService {

  private baseUrl = 'http://localhost:8080/quiz';

  constructor(private http: HttpClient) { }

  // Fetch quiz data
  getQuizData(quizTopic: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${quizTopic}`);
    // return this.http.get<any>(`${this.baseUrl}/Graphs`);
  }
}
