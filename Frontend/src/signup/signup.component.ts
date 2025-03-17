import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class SignupComponent {
  signupForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    Object.keys(this.signupForm.controls).forEach(field => {
      const control = this.signupForm.get(field);
      control?.markAsTouched();
    });
    if (this.signupForm.valid) {
      this.http.post('http://localhost:8080/signup', this.signupForm.value)
        .subscribe({
          next: (response) => {
            this.successMessage = 'Sign up successful! Please log in.';
            this.errorMessage = '';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
          error: (error) => {
            this.errorMessage = 'There was an error with the sign up. Please try again later.';
            this.successMessage = '';
            console.error('Signup Error:', error);
          }
        });

    } else {
      console.log('Form is invalid');
    }
  }
}
