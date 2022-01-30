import { DBConnect } from '../utils/dbconnect'
import { UUID } from '../utils/uuid'
import UserDomain from './user'
const conn = new DBConnect(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/db_feedback_test`,
)
let userDomain = null
beforeAll(async () => {
  await conn.connect()
  await conn.migrateSchema()
})

beforeEach(async () => {
  userDomain = new UserDomain(conn.getConnection(), 'user')
  userDomain.deleteData()
})

test('should able to select user by id', async () => {
  userDomain = new UserDomain(conn.getConnection(), 'user')

  const createdResult = await userDomain.createData(UUID(), UUID())
  expect(createdResult).not.toBeNull()
  if (createdResult.row?.id) {
    const result = await userDomain.selectById(createdResult.row?.id)
    expect(userDomain).not.toBeNull()

    expect(result.rows).toHaveLength(1)
  }
})

test('should able to create new user', async () => {
  userDomain = new UserDomain(conn.getConnection(), 'user')

  await userDomain.createData(UUID(), UUID())
  await userDomain.createData(UUID(), UUID())

  const result = await userDomain.selectAllData()

  expect(userDomain).not.toBeNull()
  expect(result).not.toBeNull()
  expect(result.rows).toHaveLength(2)
})

test('should able to update  user', async () => {
  userDomain = new UserDomain(conn.getConnection(), 'user')
  const responseId = UUID()
  const ratingId = UUID()
  await userDomain.createData(responseId, ratingId)

  const result = await userDomain.selectAllData()

  expect(result).not.toBeNull()
  expect(result.rows).toHaveLength(1)
  const newRatingId = UUID()
  const createdId = result?.rows.length > 0 ? result?.rows[0].id : ''
  await userDomain.updateData(createdId, newRatingId, newRatingId)
  const updatedResult = await userDomain.selectAllData()
  expect(updatedResult.rows).toHaveLength(1)
  expect(updatedResult.rows[0].ratingId).toBe(newRatingId)

  userDomain?.deleteData()
})

test('should able to delete user', async () => {
  userDomain = new UserDomain(conn.getConnection(), 'user')
  const responseId = UUID()
  const ratingId = UUID()
  await userDomain.createData(responseId, ratingId)

  const result = await userDomain.selectAllData()

  expect(result).not.toBeNull()
  expect(result.rows).toHaveLength(1)

  userDomain?.deleteData()

  const deletedResult = await userDomain.selectAllData()
  expect(deletedResult.rows).toHaveLength(0)
})
afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  // conn.dropSchema()

  conn.getConnection()
  done()
})
