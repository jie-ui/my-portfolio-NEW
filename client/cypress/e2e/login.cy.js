describe("Login Page E2E Test", () => {
  it("should visit login page", () => {
    cy.visit("http://localhost:5173/login");
  });

  it("should fill the form and show validation", () => {
    cy.visit("http://localhost:5173/login");

    cy.get('input[placeholder="Email"]').type("test@example.com");
    cy.get('input[placeholder="Password"]').type("123456");

    cy.get('button[type="submit"]').click();
  });
});
