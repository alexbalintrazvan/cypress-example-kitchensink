describe('Table Sort & Search Demo', () => {
  beforeEach(() => {
    cy.setCookie('exit_popup_dismissed', 'closed')
    cy.visit(
      'https://www.lambdatest.com/selenium-playground/table-sort-search-demo'
    )
  })

  const testCases = [{
    column: 'Name',
    clicks: 0,
    descending: false
  }, {
    column: 'Position',
    clicks: 1,
    descending: false
  }, {
    column: 'Office',
    clicks: 1,
    descending: false
  }, {
    column: 'Age',
    clicks: 1,
    descending: false
  }]

  testCases.concat(testCases.map((testCase) => ({
    column: testCase.column,
    clicks: testCase.clicks + 1,
    descending: true
  })))

  testCases.forEach((testCase) => {
    const { column, clicks, descending } = testCase

    it(`Should sort ${column} ${descending ? 'descending' : 'ascending'}`, () => {
      for (let i = 0; i < clicks; i++) {
        cy.contains(column).click()
      }

      for (let i = 0; i < 3; i++) {
        let prevItem = ''
        cy.get('#example td.sorting_1').each((td) => {
          const currentItem = td.text()
          const testItems = [prevItem, currentItem]
          const sortedItems = [...testItems].sort()

          expect(testItems).to.have.ordered.members(sortedItems)

          prevItem = currentItem
        })

        i < 3 && cy.get('#example_next').click()
      }
    })
  })
})
