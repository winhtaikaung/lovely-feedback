import { rest } from 'msw'
import { setupServer } from 'msw/node'
import RatingForm from '..'

import TestingUtils from '../../../test-utils'
import { render } from '../../../test-utils'

const response = {
  id: '2bd0c65a-afe2-4a78-8500-850f3896f642',
  points: 3,
  userId: '568d7481-bc3b-4fb1-8033-0e83cea75761',
}

const server = setupServer(
  rest.post('http://localhost:8000/rating', (req, res, ctx) => {
    return res(ctx.json(response))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
const onClose = jest.fn()
const onTellUsMoreClicked = jest.fn()
test('Should renders RatingForm', async () => {
  render(<RatingForm visible={true} onClose={() => onClose()} onTellUsMoreClicked={() => onTellUsMoreClicked()} />)
  //   await waitFor(() => screen.getAllByTestId('user-card'))
  const ratingButton = TestingUtils.screen.getByTestId('rating-3')
  expect(ratingButton).toBeTruthy()
})

test('Should renders Submitted Area After Click rating', async () => {
  render(<RatingForm visible={true} onClose={() => onClose()} onTellUsMoreClicked={() => onTellUsMoreClicked()} />)

  const ratingButton = TestingUtils.screen.getByTestId('rating-3')
  expect(ratingButton).toBeTruthy()
  TestingUtils.fireEvent(
    ratingButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  await TestingUtils.waitFor(() => {
    const thankButton = TestingUtils.screen.getByTestId('thank-you')
    expect(thankButton).toBeTruthy()
  })
})
