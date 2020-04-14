const newBlog = {
  title: 'Guide to e2e testing',
  author: 'The mighty tester',
  url: 'www.e2e.com',
  likes: 5
}

const secondBlog = {
  title: 'Second blog',
  author: 'Other author',
  url: 'www.secondblog.com',
  likes: 0
}

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
    cy.get('form')
      .should('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'login')
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

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ropa', password: 'verysecret' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type(newBlog.title)
      cy.get('#author').type(newBlog.author)
      cy.get('#url').type(newBlog.url)
      cy.contains('save').click()

      cy.get('.notification')
        .should('contain', `${newBlog.title} by ${newBlog.author} added`)
      cy.contains('view').parent().contains(newBlog.title)
    })

    it('A blog can be liked', function() {
      cy.createBlog(secondBlog)
      cy.contains(secondBlog.title).parent().find('button').click()
      cy.get('#likeButton').click()
      cy.contains(`likes ${secondBlog.likes + 1}`)
    })
  })
})