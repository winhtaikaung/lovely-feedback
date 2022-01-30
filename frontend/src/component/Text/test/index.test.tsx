import TestingUtils, { render } from '../../../test-utils'
import Text from '../index.style'

afterEach(TestingUtils.cleanup)
test('Should render Text properly', () => {
  render(<Text data-testid="text-id">Hello</Text>)

  const component = TestingUtils.screen.getAllByTestId('text-id')
  const text = TestingUtils.screen.getByText('Hello')
  expect(component).toBeTruthy()
  expect(text).toHaveTextContent('Hello')
})
