describe("BookingForm Component", () => {
  beforeEach(() => {
    cy.loginPatient("emily.smith@gmail.com", "12345678");
  });

  it("should show an error message if a required field is left empty", () => {
    cy.visit("/doctors/12");

    // Submit the form
    cy.get('[data-cy="submit_appointment"]').click();

    // Assert that an error message is shown for each required field
    ["name", "date", "time", "condition"].forEach((field) => {
      cy.get(`[data-cy=${field}-input] + .booking-form__error`).should(
        "contain",
        `${field} is a required field`
      );
    });

    // Navigate to the appointments page
    // cy.get(".app-navbar-profile").click(); // Click on the profile dropdown
    // cy.get('[data-cy="my-appointments-btn"]').click();
    cy.visit("/my-appointments");

    // Assert that no new appointment was created
    cy.get("[data-cy=appointment]").should("have.length", 3);
  });

  it("should fill and submit the booking form", () => {
    cy.intercept("POST", "**/appointments").as("createAppointment");

    cy.visit("/doctors/12");
    // Interact with the booking form
    cy.get('[data-cy="description-input"]').select("Dental Cleaning", {
      force: true,
    });
    cy.get('[data-cy="name-input"]').scrollIntoView().type("Alice Johnson", {
      force: true,
    });
    cy.get('[data-cy="date-input"]').type("2024-01-15", {
      force: true,
    });
    cy.get('[data-cy="time-input"]').type("10:30", {
      force: true,
    });
    cy.get('[data-cy="condition-input"]').type("Toothache", {
      force: true,
    });
    cy.get('[data-cy="numberOfBeds-input"]').type("1", {
      force: true,
    });

    // Submit the form
    cy.get('[data-cy="submit_appointment"]').click();
    // cy.wait("@createAppointment");

  });

  
  it("deletes an appointment when the delete button is clicked", () => {
    cy.visit("/my-appointments");
    cy.get("[data-cy=delete-button]").last().click();
    cy.get(".appointment-list__item").should("have.length", 3);
  });
});
