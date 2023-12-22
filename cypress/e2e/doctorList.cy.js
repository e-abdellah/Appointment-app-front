describe("DoctorList", () => {
  beforeEach(() => {
    cy.loginDoctor("abdellah.elhalimimerroun@student.hogent.be", "12345678");
    cy.visit("/all-doctors");
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
  });

  it("renders the DoctorList component", () => {
    cy.get(".doctor-list__title").should("contain", "Doctors");
  });

  it("displays the correct number of doctors", () => {
    cy.get(".doctor-list__item").should("have.length", 9);
  });

  it("updates a doctor when the save button is clicked", () => {
    cy.get("[data-cy=edit-button]").last().click({ force: true });
    cy.get("[data-cy=doctor-input]").last().clear({ force: true }).type("New doctor info");
    cy.get("[data-cy=save-button]").last().click();
    cy.get("[data-cy=doctor]").last().should("contain", "New doctor info");
  });

  it("should show an error if the API call fails", () => {
    cy.intercept("GET", "http://localhost:9000/api/doctors", {
      statusCode: 500,
      body: {
        error: "Internal server error",
      },
    });

    cy.visit("/all-doctors");

    cy.get("[data-cy=axios_error_message").should("exist");
  });

  it("checks if the edit button changes, saves and cancels when clicked", () => {
    cy.get("[data-cy=edit-button]").last().click();
    cy.get("[data-cy=save-button]").should("exist");
    cy.get("[data-cy=cancel-button]").should("exist");
  });

  it("checks if the doctor details are displayed correctly", () => {
    cy.get("[data-cy=doctor-1]").within(() => {
      cy.get("[data-cy=description]").should(
        "contain.text",
        "Specialist in Cardiology"
      );
      cy.get("[data-cy=doctor-id]").should("contain", "10");
      cy.get("[data-cy=doctor-name]").should("contain", "Dr. Olivia Anderson");
      cy.get("[data-cy=edit-button]").should("exist");
      cy.get("[data-cy=delete-button]").should("exist");
      cy.get("[data-cy=save-button]").should("not.exist");
      cy.get("[data-cy=cancel-button]").should("not.exist");
    });
  });
});
