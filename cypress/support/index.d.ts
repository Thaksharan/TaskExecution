/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * click on a link
     * @example
     * cy.clickonLink()
     */
    clickonLink(): Chainable<any>
    /**
     * Creates one Todo using UI
     * @example
     * cy.createTodo('new item')
     */
    createTodo(title: string): Chainable<any>

    /**
     * Command that injects Axe core library into app html.
     * @example
     *  cy.visit('/')
     *  cy.v()
     */
    addAxeCode(): Chainable<any>
  }
}
