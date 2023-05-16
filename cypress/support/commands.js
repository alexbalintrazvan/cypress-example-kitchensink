// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('bookStoreLogin', (username, password) => {
  const inputName = username ?? Cypress.env('bookStoreUser')
  const inputPassword = password ?? Cypress.env('bookStorePassword')

  console.log('NAMES ', username, Cypress.env('bookStoreUser'), inputName)

  cy.get('#userName').type(inputName)
  cy.get('#password').type(inputPassword)
  cy.get('#login').click()
})
