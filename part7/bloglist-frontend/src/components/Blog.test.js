import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Test blog',
  author: 'The mighty tester',
  url: 'www.mightytester.com',
  likes: 100,
  user: 'The mighty tester'
}

test('renders title and author but not url and likes', () => {

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Test blog' && 'The mighty tester'
  )

  const getUrl = () => component.getByText('www.mightytester.com')
  const getLikes = () => component.getByText('likes 100')
  expect(getUrl).toThrowError()
  expect(getLikes).toThrowError()
})

test('renders title, author, url and likes after clicking button', () => {
  const user = { name: 'Testi juuseri' }
  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.container.querySelector('#show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Test blog' && 'The mighty tester' && 'www.mightytester.com' && 'likes 100'
  )
})

test('after clicking like button twice, the amount of likes increases by two', () => {
  const user = { name: 'Testi juuseri' }
  const updateBlog = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} update={updateBlog} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)

  expect(component.container).toHaveTextContent('likes 101')
  expect(updateBlog.mock.calls).toHaveLength(1)

  fireEvent.click(likeButton)

  expect(component.container).toHaveTextContent('likes 102')
  expect(updateBlog.mock.calls).toHaveLength(2)
})