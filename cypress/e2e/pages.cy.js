describe("Home", () => {
  beforeEach(() => {
    it("should login", () => {
      cy.loginDoctor("abdellah.elhalimimerroun@student.hogent.be", "12345678");
    });
    cy.visit("/");
  });

  afterEach(() => {
    it("should logout", () => {
      cy.logout();
    });
  });

  it("runs the app", () => {
    cy.get("h1").should("have.text", "Welcome to HealthCare");
  });

  it("should have Features and FAQ sections", () => {
    cy.get(".features-section").should("exist");
    cy.get(".faq-section").should("exist");
  });

  it("should have three feature cards", () => {
    cy.get(".feature-card").should("have.length", 3);
  });

  it("should have FAQ questions", () => {
    cy.get(".faq-item").should("have.length.greaterThan", 0);
  });
});

describe("Services", () => {
  beforeEach(() => {
    cy.visit("/services");
  });

  it("should have services", () => {
    cy.get(".service-card").should("have.length", 9);
  });

  it("should have non-empty service descriptions", () => {
    cy.get(".service-card__text").each(($el) => {
      expect($el.text()).to.not.be.empty;
    });
  });
});

describe("About Us", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("should have about us elements", () => {
    cy.get("[data-cy=about-us]").should("exist");
    cy.get("[data-cy=about-us-header]").should("exist");
    cy.get("[data-cy=about-us-text]").should("exist");
    cy.get("[data-cy=about-us-why]").should("exist");
    cy.get("[data-cy=about-us-culture]").should("exist");
    cy.get("[data-cy=about-us-expertise]").should("exist");
    cy.get("[data-cy=about-us-team]").should("exist");
  });
});
