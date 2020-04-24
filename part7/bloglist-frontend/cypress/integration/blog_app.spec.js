const newBlog = {
  title: 'Guide to e2e testing',
  author: 'The mighty tester',
  url: 'www.e2e.com',
  likes: 5
}

const user = {
  name: 'Roope Ankka',
  username: 'ropa',
  password: 'verysecret'
}

const secondUser = {
  name: 'Second User',
  username: 'seconduser',
  password: 'secret'
}

const firstBlog = {
  title: 'First blog',
  author: 'Other author',
  url: 'www.example.com',
  likes: 0
}

const secondBlog ={
  title: 'Second blog blog',
  author: 'Another author',
  url: 'www.example.com',
  likes: 0
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.request('POST', 'http://localhost:3000/api/users/', secondUser)
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

  describe('When logged in', function() {
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
      cy.createBlog(firstBlog)
      cy.contains(firstBlog.title).parent().find('button').click()
      cy.get('#likeButton').click()
      cy.contains(`likes ${firstBlog.likes + 1}`)
    })

    it('A blog with the same owner can be removed', function() {
      cy.createBlog(firstBlog)
      cy.contains(firstBlog.title).parent().find('button').click()
      cy.contains('remove').click()
      cy.should('not.contain', firstBlog.title)
    })

    it('A blog with a different owner cannot be removed', function() {
      cy.createBlog(firstBlog)
      cy.login({ username: 'seconduser', password: 'secret' })
      cy.contains(firstBlog.title).parent().find('button').click()
      cy.should('not.contain', 'remove')
    })

    it('Blogs are ordered descending by like count', function() {
      cy.createBlog(firstBlog)
      cy.createBlog(secondBlog)

      cy.get('.blog').eq(1).find('#show').click()
      cy.get('#likeButton').click()
      cy.get('.blog:first').should('contain', secondBlog.title)
    })
  })
})