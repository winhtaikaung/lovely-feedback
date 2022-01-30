import TestingUtils, { render } from '../../../test-utils'
import RatingButtons from '../index'

afterEach(TestingUtils.cleanup)
test('Should render Rating Button properly', () => {
  const newRoot = document.createElement('div')
  newRoot.setAttribute('id', 'widget-root')
  document.body.appendChild(newRoot)
  const onRateClick = jest.fn()
  render(<RatingButtons isDisabled={true} count={5} onRatingClick={(points: number) => onRateClick()} />)

  const component = TestingUtils.screen.getAllByTestId('rating-button-wrapper')
  const ratingButton = TestingUtils.screen.getByTestId('rating-2')
  expect(ratingButton).toBeTruthy()
  TestingUtils.fireEvent(
    ratingButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  expect(onRateClick).toBeCalled()

  expect(component).toBeTruthy()
})
