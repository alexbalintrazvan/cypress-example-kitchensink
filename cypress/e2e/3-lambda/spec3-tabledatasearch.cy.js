// The following assume same data on the test environment, is this realistic?
context('Table Pagination Demo', () => {
  beforeEach(() => {
    cy.setCookie('exit_popup_dismissed', 'closed')
    cy.visit(
      'https://www.lambdatest.com/selenium-playground/table-search-filter-demo'
    )
  })

  // Should filter by ID/Tasks/Assignee/Status, single column or multiple
  describe('Tasks table', () => {
    const testSingleFilters = [
      {
        colName: 'ID',
        colIndex: 0,
        search: '2',
        resultLength: 1
      },
      {
        colName: 'Task',
        colIndex: 1,
        search: 'br',
        resultLength: 2
      },
      {
        colName: 'Assignee',
        colIndex: 2,
        search: 'john',
        resultLength: 2
      },
      {
        colName: 'Status',
        colIndex: 3,
        search: 'in progress',
        resultLength: 3
      }
    ]

    testSingleFilters.forEach(({ colName, colIndex, search, resultLength }) => (
      it(`Filters by ${colName}`, () => {
        cy.get('#task-table-filter').type(search)

        cy.get('#task-table > tbody tr:visible').should('have.length', resultLength)
        cy.get('#task-table > tbody tr:visible').each((tableRow) => {
          cy.wrap(tableRow).find('td').eq(colIndex).contains(search, { matchCase: false })
        })
      })
    ))

    it('Filters on multiple columns', () => {
      cy.get('#task-table-filter').type('tr')

      cy.get('#task-table > tbody tr:visible').should('have.length', 3)
      cy.get('#task-table > tbody tr:visible').contains('tr', { matchCase: false })
    })
  })

  // Should disable all filters by default
  // Should enable all filters once Filter button is clicked
  // Should filter on individual column when searching on appropriate input
  describe('Listed Users table', () => {
    it('Should disable all filters by default', () => {
      cy.get('[placeholder="#"]').should('be.disabled')
      cy.get('[placeholder="Username"]').should('be.disabled')
      cy.get('[placeholder="First Name"]').should('be.disabled')
      cy.get('[placeholder="Last Name"]').should('be.disabled')
    })

    it('Should enable all filters once Filter button is clicked', () => {
      cy.get('button').contains('Filter').click()

      cy.get('[placeholder="#"]').should('be.enabled')
      cy.get('[placeholder="Username"]').should('be.enabled')
      cy.get('[placeholder="First Name"]').should('be.enabled')
      cy.get('[placeholder="Last Name"]').should('be.enabled')
    })

    const testSingleFilters = [
      {
        colName: 'ID',
        placeholder: '#',
        colIndex: 0,
        search: '2',
        resultLength: 1
      },
      {
        colName: 'Username',
        placeholder: 'Username',
        colIndex: 1,
        search: 'bug',
        resultLength: 1
      },
      {
        colName: 'First Name',
        placeholder: 'First Name',
        colIndex: 2,
        search: 'john',
        resultLength: 2
      },
      {
        colName: 'Last Name',
        placeholder: 'Last Name',
        colIndex: 3,
        search: 'failed qa',
        resultLength: 2
      }
    ]

    testSingleFilters.forEach(({ colName, placeholder, colIndex, search, resultLength }) => (
      it(`Filters by ${colName}`, () => {
        cy.get('button').contains('Filter').click()
        cy.get(`[placeholder="${placeholder}"]`).type(search)

        cy.get('table').eq(1).find('tbody tr:visible').should('have.length', resultLength)
        cy.get('table').eq(1).find('tbody tr:visible').each((tableRow) => {
          cy.wrap(tableRow).find('td').eq(colIndex).contains(search, { matchCase: false })
        })
      })
    ))
  })
})
