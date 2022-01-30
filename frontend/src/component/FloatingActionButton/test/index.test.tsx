import TestingUtils, { render } from '../../../test-utils'
import FloatingActionButton from '../index'

afterEach(TestingUtils.cleanup)
test('Should render FloatingAction Button properly', () => {
  render(<FloatingActionButton />)

  const component = TestingUtils.screen.getAllByTestId('fab-help-improved')
  expect(component).toBeTruthy()
})
