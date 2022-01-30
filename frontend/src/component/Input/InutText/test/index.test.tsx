import TestingUtils, { render } from '../../../../test-utils'
import { InputText } from '../index.style'

afterEach(TestingUtils.cleanup)
test('Should render InputText properly', () => {
  render(<InputText data-testid="input-text" />)

  const component = TestingUtils.screen.getAllByTestId('input-text')
  expect(component).toBeTruthy()
})
