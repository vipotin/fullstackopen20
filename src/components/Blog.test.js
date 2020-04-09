import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url and likes', () => {
  const blog = {
    title: 'Test blog',
    author: 'The mighty tester',
    url: 'www.mightytester.com',
    likes: 100
  }

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