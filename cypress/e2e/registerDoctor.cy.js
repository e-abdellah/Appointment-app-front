describe("Doctor Registration and Navigation", () => {
  beforeEach(() => {
    cy.registerDoctor("newdoctor@example.com", "12345678");
  });

  it("navigates to doctors page and sees their object", () => {
    cy.intercept("GET", "http://localhost:9000/api/doctors/*", {
      fixture: "doctor.json",
    }).as("getDoctor");

    cy.loginDoctor("newdoctor@example.com", "12345678");
    cy.visit("/doctors");
    cy.get('[data-cy= "doctor-card-button"]').last().click();
    cy.url().should("include", "/doctors/");
  });

  it("updates the doctor profile", () => {
    cy.loginDoctor("newdoctor@example.com", "12345678");
    cy.visit("/my-profile");

    cy.get('[data-cy="doctor-edit-button"]').click();
    cy.get('[data-cy="doctor-speciality-input"]').type("New Speciality", {
      force: true,
    });
    cy.get('[data-cy="doctor-hospital-input"]').type("New Hospital", {
      force: true,
    });
    cy.get('[data-cy="doctor-about-input"]').type("New About", { force: true });
    cy.get('[data-cy="doctor-save-button"]').click({ force: true });
  });

  it("logs in as admin, sees the new doctor, updates it and finally deletes it", () => {
    cy.loginDoctor("abdellah.elhalimimerroun@student.hogent.be", "12345678");
    cy.get(".app-navbar-profile").click();
    cy.get('[data-cy="all-doctors-btn"]').click();

    cy.get('[data-cy="doctor"]').last().should("contain", "New Doctor");
    cy.get('[data-cy="doctor-speciality"]').should(
      "contain",
      "Default Speciality"
    );
    cy.get('[data-cy="doctor-hospital"]').should("contain", "Default Hospital");
    cy.get('[data-cy="doctor-about"]').should("contain", "Default About");

    cy.get('[data-cy="doctor-edit-button"]').last().should("be.visible");
    cy.wait(1000);
    cy.get('[data-cy="doctor-edit-button"]').last().click({ force: true });
    cy.get('[data-cy="doctor-speciality-input"]')
      .clear({ force: true })
      .type("New Speciality", { force: true });
    cy.get('[data-cy="doctor-hospital-input"]')
      .clear({ force: true })
      .type("New Hospital", { force: true });
    cy.get('[data-cy="doctor-about-input"]')
      .clear({ force: true })
      .type("New About", { force: true });
    cy.get('[data-cy="doctor-save-button"]').click({ force: true });

    cy.get('[data-cy="doctor-delete-button"]').last().click({ force: true });
    cy.get('[data-cy="doctor"]')
      .last()
      .should("contain", "Dr. John Davis Wilson");
  });
});
