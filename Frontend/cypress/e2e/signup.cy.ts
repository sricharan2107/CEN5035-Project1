// describe('Signup Page', () => {
//     beforeEach(() => {
//         cy.visit('/signup');
//     });

//     it('should have a signup form', () => {
//         cy.get('form').should('exist');
//     });

//     it('should display validation errors when trying to submit an empty form', () => {
//         cy.get('button[type="submit"]').click(); // Click the submit button without filling in any fields

//         // Check if error messages are displayed
//         cy.contains('First name is required.').should('be.visible');
//         cy.contains('Last name is required.').should('be.visible');
//         cy.contains('Email is required.').should('be.visible');
//         cy.contains('DOB is required.').should('be.visible');
//         cy.contains('Password is required.').should('be.visible');
//         cy.contains('Confirm your password.').should('be.visible');
//     });

//     it('should successfully sign up when all fields are valid and redirect to login page', () => {
//         cy.get('#firstName').type('John');
//         cy.get('#lastName').type('Doe');
//         cy.get('#email').type('john.doe@example.com');
//         cy.get('#dob').type('2000-01-01');
//         cy.get('#password').type('Password123');
//         cy.get('#confirmPassword').type('Password123');

//         // Mock the successful API response
//         cy.intercept('POST', 'http://localhost:8080/signup', { statusCode: 200 }).as('signupRequest');

//         cy.get('button[type="submit"]').click();

//         cy.wait('@signupRequest');

//         // Check for success message
//         cy.contains('Sign up successful! Please log in.').should('be.visible');

//         // Validate that the page redirects to the login page
//         cy.url().should('include', '/login');
//     });

//     it('should show error message if signup fails', () => {
//         cy.get('#firstName').type('John');
//         cy.get('#lastName').type('Doe');
//         cy.get('#email').type('john.doe@example.com');
//         cy.get('#dob').type('2000-01-01');
//         cy.get('#password').type('Password123');
//         cy.get('#confirmPassword').type('Password123');

//         // Mock a failed API response
//         cy.intercept('POST', 'http://localhost:8080/signup', { statusCode: 500 }).as('signupRequest');

//         cy.get('button[type="submit"]').click();

//         cy.wait('@signupRequest');

//         // Check for error message
//         cy.contains('There was an error with the sign up. Please try again later.').should('be.visible');
//     });
// });
