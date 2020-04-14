describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Roope Ankka',
      username: 'ropa',
      password: 'verysecret'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Log in to application')
    cy.get('form').contains('username')
    cy.get('form').contains('password')
    cy.get('form').contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ropa')
      cy.get('#password').type('verysecret')
      cy.contains('login').click()

      cy.contains('Roope Ankka logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ropa')
      cy.get('#password').type('wrong password')
      cy.contains('login').click()

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})