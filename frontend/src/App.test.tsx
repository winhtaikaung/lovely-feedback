import React from 'react'

import App from './App'
import TestingUtils from './test-utils'
import { render } from './test-utils'
afterEach(TestingUtils.cleanup)
test('renders learn react link', () => {
  render(<App />)
  const { screen } = TestingUtils

  const linkElement = screen.getByText(/Your feedback is valuable to us/i)
  expect(linkElement).toBeInTheDocument()
})
