import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuizComponent} from './quiz.component';

@NgModule({
  declarations: [QuizComponent],
  imports: [
    CommonModule,
    RouterModule 
  ],
  exports: [QuizComponent]
})

export class DashboardModule { }
 