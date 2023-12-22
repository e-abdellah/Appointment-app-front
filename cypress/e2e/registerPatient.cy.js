describe("Patient Registration and Navigation", () => {
  beforeEach(() => {
    cy.registerPatient("newpatient@example.com", "12345678");
  });

  it("updates the patient profile", () => {
    cy.loginPatient("newpatient@example.com", "12345678");
    cy.visit("/my-profile");

    cy.get('[data-cy="patient-edit-button"]').click();
    cy.get('[data-cy="patient-condition-input"]').type("New Condition", {
      force: true,
    });
    cy.get('[data-cy="patient-hospital-input"]').type("New Hospital", {
      force: true,
    });
    cy.get('[data-cy="patient-about-input"]').type("New About", { force: true });
    cy.get('[data-cy="patient-save-button"]').click({ force: true });
  });

  it("books an appointment", () => {
    cy.loginPatient("newpatient@example.com", "12345678");
    cy.visit("/doctors");

    cy.get('[data-cy="doctor-card-button"]').first().click({ force: true });
    cy.get('[data-cy="book-appointment-button"]').click();

    cy.get('[data-cy="appointment-description-input"]').type("Need consultation", {
      force: true,
    });
    cy.get('[data-cy="appointment-date-input"]').type("2022-12-31", {
      force: true,
    });
    cy.get('[data-cy="appointment-save-button"]').click({ force: true });
  });
});
