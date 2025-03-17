import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: true, // Ensures that this component is self-contained
  imports: [CommonModule, ReactiveFormsModule]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  passwordMismatch = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      username: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    // Mark all fields as touched so validation messages appear
    Object.keys(this.forgotPasswordForm.controls).forEach(field => {
      const control = this.forgotPasswordForm.get(field);
      control?.markAsTouched();
    });

    // Prevent form submission if invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const { newPassword, confirmPassword } = this.forgotPasswordForm.value;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    // Simulating API call to reset password
    console.log('Password reset successfully!');
    alert('Your password has been reset successfully.');

    // Redirect to login
    this.router.navigate(['/login']);
  }
}
