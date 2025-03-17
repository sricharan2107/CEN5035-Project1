import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent,ReactiveFormsModule, RouterTestingModule,HttpClientTestingModule], 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.loginForm.value).toEqual({
        username: '',
        password: ''
    });
    
    // Check email field only if Forgot Password is enabled
    if (component.isForgotPassword) {
        expect(component.loginForm.value).toEqual({
          email: ''
        });
    }
  });

  it('should show "Login" title initially', () => {
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('Login');
  });

  it('should toggle to Forgot Password view', () => {
    component.forgotPassword();
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('Forgot Password');
  });

  it('should validate required username field', () => {
    const usernameInput = component.loginForm.controls['username'];
    usernameInput.setValue('');
    usernameInput.markAsTouched();
    fixture.detectChanges();

    const errorMsg = fixture.debugElement.query(By.css('.error-message'));
    expect(errorMsg.nativeElement.textContent).toContain('Username is required');
  });

  it('should validate required password field', () => {
    const passwordInput = component.loginForm.controls['password'];
    passwordInput.setValue('');
    passwordInput.markAsTouched();
    fixture.detectChanges();

    const errorMsg = fixture.debugElement.query(By.css('.error-message'));
    expect(errorMsg.nativeElement.textContent).toContain('Password is required');
  });

//   it('should disable submit button if form is invalid', async () => {
//     component.loginForm.controls['username'].setValue('');
//     component.loginForm.controls['password'].setValue('');

//     Object.values(component.loginForm.controls).forEach(control => {
//         control.markAsTouched();
//         control.updateValueAndValidity();
//     });

//     fixture.detectChanges(); 
//     await fixture.whenStable(); 

//     const submitButton = fixture.debugElement.nativeElement.querySelector('button');

//     expect(submitButton.disabled).toBeTrue();
//   });

  it('should enable submit button if form is valid', async () => {
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('password123');

    Object.values(component.loginForm.controls).forEach(control => {
        control.markAsTouched();
        control.updateValueAndValidity();
    });

    fixture.detectChanges(); 
    await fixture.whenStable(); 

    const submitButton = fixture.nativeElement.querySelector('button');

    expect(submitButton.disabled).toBeFalse(); 
  });

  it('should show error message if form submission fails', () => {
    component.errorMessage = 'Invalid credentials';
    fixture.detectChanges();

    const errorMsg = fixture.debugElement.query(By.css('.error-message')).nativeElement;
    expect(errorMsg.textContent).toContain('Invalid credentials');
  });

  it('should call onSubmit() when form is submitted', () => {
    spyOn(component, 'onSubmit');

    component.loginForm.controls['username'].setValue('testUser');
    component.loginForm.controls['password'].setValue('testPassword');

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should navigate to signup page when clicking "Sign up here"', () => {
    spyOn(component, 'navigateToSignup');

    const signupLink = fixture.debugElement.query(By.css('.signup-link'));
    signupLink.triggerEventHandler('click', null);

    expect(component.navigateToSignup).toHaveBeenCalled();
  });

});
