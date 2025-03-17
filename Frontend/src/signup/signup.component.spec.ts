///<reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.signupForm.value).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      username: '',
      password: '',
      confirmPassword: ''
    });
  });

  it('should validate required fields', () => {
    const form = component.signupForm;
    expect(form.valid).toBeFalse();

    form.controls['firstName'].setValue('');
    form.controls['lastName'].setValue('');
    form.controls['email'].setValue('');
    form.controls['dob'].setValue('');
    form.controls['gender'].setValue('');
    form.controls['username'].setValue('');
    form.controls['password'].setValue('');

    fixture.detectChanges();
    expect(form.valid).toBeFalse();
  });

  it('should validate email field', () => {
    const emailControl = component.signupForm.controls['email'];

    emailControl.setValue('invalidemail');
    fixture.detectChanges();
    expect(emailControl.valid).toBeFalse();

    emailControl.setValue('valid@email.com');
    fixture.detectChanges();
    expect(emailControl.valid).toBeTrue();
  });

  it('should validate password minimum length', () => {
    const passwordControl = component.signupForm.controls['password'];

    passwordControl.setValue('123');
    fixture.detectChanges();
    expect(passwordControl.valid).toBeFalse();

    passwordControl.setValue('123456');
    fixture.detectChanges();
    expect(passwordControl.valid).toBeTrue();
  });

  it('should enable submit button when form is valid', async () => {
    component.signupForm.controls['firstName'].setValue('John');
    component.signupForm.controls['lastName'].setValue('Doe');
    component.signupForm.controls['email'].setValue('john@example.com');
    component.signupForm.controls['dob'].setValue('2000-01-01');
    component.signupForm.controls['gender'].setValue('Male');
    component.signupForm.controls['username'].setValue('johndoe');
    component.signupForm.controls['password'].setValue('password123');

    fixture.detectChanges();
    await fixture.whenStable();

    const submitButton = fixture.debugElement.nativeElement.querySelector('button');
    expect(submitButton.disabled).toBeFalse();
  });

//   it('should disable submit button when form is invalid', async () => {
//     component.signupForm.controls['firstName'].setValue('');
//     component.signupForm.controls['lastName'].setValue('');
//     component.signupForm.controls['email'].setValue('');
//     component.signupForm.controls['dob'].setValue('');
//     component.signupForm.controls['gender'].setValue('');
//     component.signupForm.controls['username'].setValue('');
//     component.signupForm.controls['password'].setValue('');

//     fixture.detectChanges();
//     await fixture.whenStable();

//     const submitButton = fixture.debugElement.nativeElement.querySelector('button');
//     expect(submitButton.disabled).toBeTrue();
//   });

  it('should call onSubmit() when form is submitted', () => {
    spyOn(component, 'onSubmit');

    component.signupForm.controls['firstName'].setValue('John');
    component.signupForm.controls['lastName'].setValue('Doe');
    component.signupForm.controls['email'].setValue('john@example.com');
    component.signupForm.controls['dob'].setValue('2000-01-01');
    component.signupForm.controls['gender'].setValue('Male');
    component.signupForm.controls['username'].setValue('johndoe');
    component.signupForm.controls['password'].setValue('password123');

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should display success message on successful signup', () => {
    component.successMessage = 'Sign up successful! Please log in.';
    fixture.detectChanges();

    const successMsg = fixture.debugElement.query(By.css('.success-message')).nativeElement;
    expect(successMsg.textContent).toContain('Sign up successful! Please log in.');
  });

  it('should display error message on signup failure', () => {
    component.errorMessage = 'There was an error with the sign up. Please try again later.';
    fixture.detectChanges();

    const errorMsg = fixture.debugElement.query(By.css('.error-message')).nativeElement;
    expect(errorMsg.textContent).toContain('There was an error with the sign up. Please try again later.');
  });
});
