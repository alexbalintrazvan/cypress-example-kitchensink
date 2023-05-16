describe("Simple Form Demo", () => {
  beforeEach(() => {
    cy.setCookie("exit_popup_dismissed", "closed");
    cy.visit("https://www.lambdatest.com/selenium-playground/simple-form-demo");
  });

  it("Types into single input field", () => {
    cy.get("#user-message").type("Some kind of text");

    cy.get("#showInput").click();

    cy.get("#message").should("have.text", "Some kind of text");
  });

  it("Adds two numbers", () => {
    cy.get("#sum1").type("100");
    cy.get("#sum2").type("899");
    cy.contains("Get values").click();

    cy.get("#addmessage").should("have.text", "999");

    cy.get("#sum1").clear();
    cy.get("#sum1").type("Text");
    cy.contains("Get values").click();

    cy.get("#addmessage").should("have.text", "NaN");
  });
});
