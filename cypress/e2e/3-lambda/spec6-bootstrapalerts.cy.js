describe('Bootstrap Alert Demo', () => {
  beforeEach(() => {
    cy.setCookie('exit_popup_dismissed', 'closed')
    cy.visit(
      'https://www.lambdatest.com/selenium-playground/bootstrap-alert-messages-demo'
    )
  })

  const modalStates = ['success', 'info']

  modalStates.forEach((state) => {
    it(`Opens Autoclosable ${state} modal, which closes automatically`, () => {
      const title = `Autoclosable ${state} Message`
      const message = `${state} Message`

      cy.contains(title, { matchCase: false }).click()

      cy.get('.alert:visible').contains(message, { matchCase: false }).should('exist')
      cy.get('.alert:visible').contains(message, { matchCase: false }).should('have.class', `alert-${state}`)
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(5000)
      cy.get('.alert:visible').should('not.exist')
    })

    it(`Opens Normal ${state} modal, which closes on user clicking X`, () => {
      const title = `Normal ${state} Message`
      const message = `${state} Message`

      cy.contains(title, { matchCase: false }).click()

      cy.get('.alert:visible').contains(message, { matchCase: false }).should('exist')
      cy.get('.alert:visible').contains(message, { matchCase: false }).should('have.class', `alert-${state}`)
      cy.get('[data-dismiss=alert]:visible').click()
      cy.get('.alert:visible').should('not.exist')
    })
  })
})
