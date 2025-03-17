describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/login'); // Ensure you're on the login page before each test
    });
  
    it('should display login form correctly', () => {
      cy.get('h2').should('contain', 'Login');
      cy.get('#username').should('exist');
      cy.get('#password').should('exist');
      cy.get('button[type="submit"]').should('contain', 'Sign In');
    });
  
    it('should show validation errors for empty fields', () => {
      cy.get('button[type="submit"]').click(); // Try submitting without filling in fields
      cy.get('.error-message').should('contain', 'Username is required');
      cy.get('.error-message').should('contain', 'Password is required');
    });
  
    it('should log in successfully with valid credentials', () => {
      cy.intercept('POST', '**/signin', { token: 'mockAuthToken' }).as('signinRequest'); // Mock successful response
  
      cy.get('#username').type('testuser');
      cy.get('#password').type('Password123');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@signinRequest').its('request.body').should('deep.equal', {
        username: 'testuser',
        password: 'Password123'
      });
  
      cy.url().should('include', '/dashboard'); // Verify redirection to dashboard
    });
  
    it('should show error message on invalid login', () => {
      cy.intercept('POST', '**/signin', { statusCode: 401 }).as('signinRequest'); // Mock failed login response
  
      cy.get('#username').type('wronguser');
      cy.get('#password').type('WrongPassword');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@signinRequest');
      cy.get('.error-message').should('contain', 'Invalid username or password. Please try again.');
    });
  
    it('should switch to forgot password mode', () => {
      cy.get('.forgot-password').click();
      cy.get('h2').should('contain', 'Forgot Password');
      cy.get('#email').should('exist');
      cy.get('button[type="submit"]').should('contain', 'Reset Password');
    });
  
    it('should validate email field in forgot password', () => {
      cy.get('.forgot-password').click();
      cy.get('button[type="submit"]').click(); // Submit without entering email
  
      cy.get('.error-message').should('contain', 'A valid email is required'); // Validation error should appear
    });
  
    it('should send forgot password request successfully', () => {
      cy.intercept('POST', '**/forgotpassword', { statusCode: 200 }).as('forgotPasswordRequest'); // Mock success response
  
      cy.get('.forgot-password').click();
      cy.get('#email').type('testuser@example.com');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@forgotPasswordRequest').its('request.body').should('deep.equal', {
        email: 'testuser@example.com'
      });
  
      cy.on('window:alert', (text) => {
        cy.wrap(text).should('contain', 'Password reset instructions have been sent to your email.');
      });
    });
  
    it('should show error if forgot password request fails', () => {
      cy.intercept('POST', '**/forgotpassword', { statusCode: 500 }).as('forgotPasswordRequest'); // Mock failed response
  
      cy.get('.forgot-password').click();
      cy.get('#email').type('testuser@example.com');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@forgotPasswordRequest');
      cy.get('.error-message').should('contain', 'Error resetting password. Please try again later.');
    });
  
    it('should navigate to signup page when clicking on "New user? Sign up here"', () => {
      cy.get('.signup-link').click();
      cy.url().should('include', '/signup'); // Verify redirection to signup page
    });
  });
  