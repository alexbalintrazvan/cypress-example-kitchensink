describe('BookStore App - Profile', () => {
  context('Not logged in', () => {
    beforeEach(() => {
      cy.visit('https://demoqa.com/profile')
    })

    it('Should link to the login and register pages', () => {
      cy.get('a[href="/login"]').should('exist')
      cy.get('a[href="/register"]').should('exist')
    })
  })

  context('Logged in', () => {
    beforeEach(() => {
      cy.visit('https://demoqa.com/login')
      cy.bookStoreLogin()
    })

    it('Should link to the Book Store', () => {
      cy.get('#gotoStore').click({ force: true })
      cy.url().should('contain', 'books')
    })
  })
})
