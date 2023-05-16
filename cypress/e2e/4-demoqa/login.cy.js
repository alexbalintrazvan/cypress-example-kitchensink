
describe('Bookstore App - Login', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/login')
  })

  it('Should allow log in with valid credentials', () => {
    cy.bookStoreLogin()

    cy.url().should('contain', 'profile')
    cy.get('#userName-value').should('have.text', Cypress.env('bookStoreUser'))
  })

  it('Should show an error when using invalid credentials', () => {
    cy.bookStoreLogin('dummyname', 'dummypassword')

    cy.contains('Invalid username or password!').should('exist')
  })

  it('Should link to the Register page', () => {
    cy.get('#newUser').click()

    cy.url().should('contain', 'register')
  })
})
