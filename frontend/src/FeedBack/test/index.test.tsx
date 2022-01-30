import { rest } from 'msw'
import { setupServer } from 'msw/node'

import FeedBack from '..'
import TestingUtils, { render } from '../../test-utils'

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

test('Should renders FeedBack', async () => {
  render(<FeedBack />)

  const ratingButton = TestingUtils.screen.getByTestId('fab-help-improved')
  expect(ratingButton).toBeTruthy()

  TestingUtils.fireEvent.mouseOver(ratingButton)

  const helpUsImprovedText = TestingUtils.screen.getByTestId('help-us-improved')
  expect(helpUsImprovedText).toBeTruthy()
})
