import { cleanup, render, screen } from '@testing-library/react'

import Box from '../index.style'

afterEach(cleanup)
test('Should render Box properly', () => {
  render(<Box data-testid="box" />)

  const component = screen.getAllByTestId('box')
  expect(component).toBeTruthy()
})
