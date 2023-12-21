// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginDoctor", (email, password) => {
  Cypress.log({
    name: "loginDoctor",
    displayName: "loginDoctor",
    message: "loginDoctor",
  });
  cy.intercept("api/doctors/login").as("loginDoctor");
  cy.visit("/doctors/login");
  cy.get('[data-cy="email-input"]').clear().type(email);
  cy.get('[data-cy="password-input"]').clear().type(password);
  cy.get('[data-cy="login-button"]').click();
  cy.wait("@loginDoctor");
});

Cypress.Commands.add("loginPatient", (email, password) => {
  Cypress.log({
    name: "loginPatient",
    displayName: "loginPatient",
    message: "loginPatient",
  });
  cy.intercept("api/patients/login").as("loginPatient");
  cy.visit("/patients/login");
  cy.get('[data-cy="email-input"]').clear().type(email);
  cy.get('[data-cy="password-input"]').clear().type(password);
  cy.get('[data-cy="login-button"]').click();
  cy.wait("@loginPatient");
});

Cypress.Commands.add("registerDoctor", (email, password) => {
  Cypress.log({
    name: "registerDoctor",
    displayName: "registerDoctor",
    message: "registerDoctor",
  });
  cy.intercept("api/doctors/register").as("registerDoctor");
  cy.visit("/doctors/register");
  cy.get('[data-cy="email-input"]').clear().type(email);
  cy.get('[data-cy="password-input"]').clear().type(password);
  cy.get('[data-cy="name-input"]').clear().type("New Doctor");
  cy.get('[data-cy="register-button"]').click();
  cy.wait("@registerDoctor");
});

Cypress.Commands.add("logout", () => {
  Cypress.log({
    name: "logout",
    displayName: "logout",
    message: "logout",
  });
  cy.visit("/");
  cy.get(".app-navbar-profile").click();
  cy.get('[data-cy="my-profile-btn"]').click();
  cy.get('[data-cy="logout-btn"]').click();
  cy.visit("/");
});
