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