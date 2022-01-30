import TestingUtils from '../../../../test-utils'
import { render } from '../../../../test-utils'

import { TextAreaUI } from '../index.style'

afterEach(TestingUtils.cleanup)
test('Should render TextArea properly', () => {
  render(<TextAreaUI data-testid="text-area-text" />)

  const component = TestingUtils.screen.getAllByTestId('text-area-text')
  expect(component).toBeTruthy()
})
