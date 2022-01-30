import { DBConnect } from '../utils/dbconnect'
import { UUID } from '../utils/uuid'
import UserResponseDomain from './response'

const conn = new DBConnect(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/db_feedback_test`,
)
let ratingDomain = null
beforeAll(async () => {
  await conn.connect()
  await conn.migrateSchema()
})

beforeEach(async () => {
  ratingDomain = new UserResponseDomain(conn.getConnection(), 'response')
  ratingDomain.deleteData()
})

test('should able to create new response', async () => {
  ratingDomain = new UserResponseDomain(conn.getConnection(), 'response')
  const user1Id = UUID()
  const responseJson = [
    { response: 'Q1', answer: 'A1' },
    { response: 'Q2', answer: 'A2' },
  ]
  await ratingDomain.createData(user1Id, responseJson)

  const result = await ratingDomain.selectAllData()

  expect(ratingDomain).not.toBeNull()
  expect(result).not.toBeNull()

  expect(result.rows).toHaveLength(1)
})

test('should able to update response', async () => {
  ratingDomain = new UserResponseDomain(conn.getConnection(), 'response')
  const user1Id = UUID()
  const responseJson = [
    { response: 'Q1', answer: 'A1' },
    { response: 'Q2', answer: 'A2' },
  ]
  await ratingDomain.createData(user1Id, responseJson)

  const result = await ratingDomain.selectAllData()
  expect(result).not.toBeNull()
  expect(result.rows).toHaveLength(1)

  const createdId = result?.rows.length > 0 ? result?.rows[0].id : ''
  const updatedJson = [
    { answer: 'A4', response: 'Q3' },
    { answer: 'A3', response: 'Q4' },
  ]
  await ratingDomain.updateData(createdId, updatedJson, user1Id)
  const updatedResult = await ratingDomain.selectAllData()
  expect(updatedResult.rows).toHaveLength(1)

  expect(JSON.stringify(updatedResult.rows[0].responseData)).toBe(JSON.stringify(updatedJson))

  ratingDomain?.deleteData()
})

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  // conn.dropSchema()

  conn.getConnection()
  done()
})
