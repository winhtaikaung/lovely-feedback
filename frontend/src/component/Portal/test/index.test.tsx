import TestingUtils from '../../../test-utils'
import { render } from '../../../test-utils'
import Portal from '../index'

afterEach(TestingUtils.cleanup)
test('Should render FloatingAction Button properly', () => {
  const newRoot = document.createElement('div')
  newRoot.setAttribute('id', 'widget-root')
  document.body.appendChild(newRoot)
  render(
    <Portal rootNode={newRoot}>
      <b data-testid="portal-child"></b>
    </Portal>,
  )

  const component = TestingUtils.screen.getAllByTestId('portal-child')
  expect(component).toBeTruthy()
})
