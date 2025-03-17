import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { CommonModule } from '@angular/common';
const routes = [
  { path: '', component: ForgotPasswordComponent },
];

@NgModule({
  declarations: [
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),

  ],
  providers: [],
})
export class LoginModule { }