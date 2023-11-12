describe('bookForm', () => { 
  it('should be defined', () => {
    expect(bookForm).toBeDefined()
  })

  it('should add a booking', () => {
    cy.visit('http://localhost:5173/doctors/1')

    cy.get('data-cy=name_input').type('Abdellah')
    cy.get('data-cy=date_input').type('2023-02-01')
    cy.get('data-cy=condition_input').type('text')
    cy.get('data-cy=address_input').type('text')
    cy.get('data-cy=submit_button').click()
  })
 })