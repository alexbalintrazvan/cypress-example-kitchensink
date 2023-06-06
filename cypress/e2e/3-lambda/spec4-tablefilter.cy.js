describe('Table Filter Demo', () => {
  // Should show all items by default
  // Should be able to filter by Green/Orange/Red (Assuming these buttons never change ie. no new colors can be added by the user, we might as well test each one individually even if in effect they all do the same thing with different parameters)
  // Should be able to switch filter back to All and see all options (assuming All is selected by default, probably not worth testing. Even if it is, is it worth testing that the button behaves properly anyway?)
  // Should be able to tick items and ticks should persist between different filter options (why the fuck is this even a thing)

  beforeEach(() => {
    cy.setCookie('exit_popup_dismissed', 'closed')
    cy.visit(
      'https://www.lambdatest.com/selenium-playground/table-records-filter-demo'
    )
  })

  it('Should show All', () => {
    cy.get('[data-target=all]').click()

    cy.get('tr:visible').should('have.length', 5)
    cy.get('tr:visible').each((row) => {
      cy.wrap(row).invoke('attr', 'data-status').should('be.oneOf', ['pagado', 'pendiente', 'cancelado'])
      // or
      cy.wrap(row).contains(/\((Green|Red|Orange)\)/)
    })
  })

  const testColorOptions = [
    {
      option: 'Green',
      dataTarget: 'pagado',
      resultLength: 2
    },
    {
      option: 'Orange',
      dataTarget: 'pendiente',
      resultLength: 2
    },
    {
      option: 'Red',
      dataTarget: 'cancelado',
      resultLength: 1
    }
  ]

  testColorOptions.forEach(({ option, dataTarget, resultLength }) => {
    it(`Should filter on ${option}`, () => {
      cy.get(`[data-target=${dataTarget}]`).click()

      cy.get('tr:visible').should('have.length', resultLength)
      cy.get('tr:visible').each((row) => {
        cy.wrap(row).invoke('attr', 'data-status').should('eq', dataTarget)
        // or
        cy.wrap(row).contains(`(${option})`)
      })
    })
  })

  it('Should persist checked items between filters', () => {
    cy.get('tr[data-status=pagado]').each((row) => {
      cy.wrap(row).find('.ckbox').click()
    })
    cy.get('tr[data-status=pendiente]').first().find('input[type=checkbox]').click({ force: true })

    cy.get('[data-target=pagado]').click()
    cy.get('tr:visible').each((row) => {
      cy.wrap(row).find('input[type=checkbox]').should('be.checked')
    })

    cy.get('[data-target=pendiente]').click()
    cy.get('tr:visible').each((row, index) => {
      const assertChecked = `${index === 0 ? '' : 'not.'}be.checked`

      cy.wrap(row).find('input[type=checkbox]').should(assertChecked)
    })

    // this one's probably worthless
    cy.get('[data-target=cancelado]').click()
    cy.get('tr:visible').each((row) => {
      cy.wrap(row).find('input[type=checkbox]').should('not.be.checked')
    })
  })
})
