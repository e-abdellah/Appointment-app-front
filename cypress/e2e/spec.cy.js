describe("Home", () => {
  it("draait de app", () => {
    cy.visit("http://localhost:5173/");

    cy.get("h1").should("have.text", "Welcome to HealthCare");
  });

  it("should login", () => {
    cy.loginDoctor("abdellah.elhalimimerroun@student.hogent.be", "12345678");
  });

  it("should logout", () => {
    cy.loginDoctor("abdellah.elhalimimerroun@student.hogent.be", "12345678");
    cy.logout();
  });
});
