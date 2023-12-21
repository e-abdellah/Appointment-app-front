describe("Manages and handles the list of doctors", () => {

  beforeEach(() => {
    beforeEach(() => {
      cy.registerDoctor("newdoctor@example.com", "12345678");
    });
    cy.loginDoctor("abdellah.elhalimimerroun@student.hogent.be", "12345678");
    cy.get(".app-navbar-profile").click();
    cy.get('[data-cy="all-doctors-btn"]').click();
  })

  it("checks for the presence of necessary elements", () => {
    // cy.loginDoctor("abdellah.elhalimimerroun@student.hogent.be", "12345678");
    // cy.get(".app-navbar-profile").click();
    // cy.get('[data-cy="all-doctors-btn"]').click();

    cy.get('[data-cy="doctor"]').should('exist');
    cy.get('[data-cy="doctor-edit-button"]').should('exist');
    
    cy.get('[data-cy="doctor-edit-button"]').first().click();

    cy.get('[data-cy="doctor-delete-button"]').should('exist');
    cy.get('[data-cy="doctor-save-button"]').should('exist');
    cy.get('[data-cy="doctor-cancel-button"]').should('exist');
    cy.get('[data-cy="doctor-speciality-input"]').should('exist');
    cy.get('[data-cy="doctor-hospital-input"]').should('exist');
    cy.get('[data-cy="doctor-about-input"]').should('exist');
  });
  
  it("checks the functionality of the edit button", () => {
    // cy.loginDoctor("abdellah.elhalimimerroun@student.hogent.be", "12345678");
    // cy.get(".app-navbar-profile").click();
    // cy.get('[data-cy="all-doctors-btn"]').click();
    
    cy.get('[data-cy="doctor-edit-button"]').first().click();
    cy.get('[data-cy="doctor-speciality-input"]').should('be.enabled');
    cy.get('[data-cy="doctor-hospital-input"]').should('be.enabled');
    cy.get('[data-cy="doctor-about-input"]').should('be.enabled');
  });
  
  it("verifies that changes are saved correctly", () => {
    const newSpeciality = "New Speciality";
    const newHospital = "New Hospital";
    const newAbout = "New About";
  
    cy.get('[data-cy="doctor-edit-button"]').last().click({force: true});
    cy.get('[data-cy="doctor-speciality-input"]').clear({force: true}).type(newSpeciality, {force: true});
    cy.get('[data-cy="doctor-hospital-input"]').clear({force: true}).type(newHospital, {force: true});
    cy.get('[data-cy="doctor-about-input"]').clear({force: true}).type(newAbout, {force: true});
    cy.get('[data-cy="doctor-save-button"]').click({force: true});
  
    cy.get('[data-cy="doctor-speciality"]').should('contain', newSpeciality);
    cy.get('[data-cy="doctor-hospital"]').should('contain', newHospital);
    cy.get('[data-cy="doctor-about"]').should('contain', newAbout);
  });
});
