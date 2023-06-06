describe('JS Alert Demo', () => {
  beforeEach(() => {
    cy.setCookie('exit_popup_dismissed', 'closed')
    cy.visit(
      'https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo'
    )
  })

  it('Should Alert', () => {
    cy.contains('JS Alert').find('button').click()

    cy.on('window:alert', (text) => {
      expect(text).to.contain('Alert box!')
    })
  })

  it('Should Confirm', () => {
    cy.contains('Confirm box').find('button').click()

    cy.on('window:confirm', () => true)

    cy.get('#confirm-demo').should('contain', 'You pressed OK!')
  })

  it('Should Cancel', () => {
    cy.contains('Confirm box').find('button').click()

    cy.on('window:confirm', () => false)

    cy.get('#confirm-demo').should('contain', 'You pressed Cancel!')
  })

  it('Should Prompt', () => {
    cy.window().then(win => {
      cy.stub(win, 'prompt').returns('Some text')

      cy.contains('Prompt box').find('button').click()

      cy.get('#prompt-demo').should('contain', 'You have entered \'Some text\' !')
    })
  })
})
