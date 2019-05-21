import { getTodos, getAddTodoButton } from "../support/app.po";

describe("Hello Nx", () => {
  beforeEach(() => cy.visit("/"));

  it("should display welcome message", () => {
    getTodos().should(t=>expect(t.length).equal(2));
    getAddTodoButton().click();
    getTodos().should(t=>expect(t.length).equal(3));
  });
});
