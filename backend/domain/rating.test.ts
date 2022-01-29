import { DBConnect } from '../utils/dbconnect'
import { UUID } from '../utils/uuid'

import RatingDomain from './rating'
const conn = new DBConnect('mysql://root:123456@mysql:3306/db_feedback_test')
let ratingDomain = null
beforeAll(async () => {
  await conn.connect()
  await conn.migrateSchema()
})

beforeEach(async () => {
  ratingDomain = new RatingDomain(conn.getConnection(), 'rating')
  ratingDomain.deleteData()
})

test('should able to create new rating', async () => {
  ratingDomain = new RatingDomain(conn.getConnection(), 'rating')
  const user1Id = UUID()
  const user2Id = UUID()
  const user3Id = UUID()
  await ratingDomain.createData(1, user1Id)
  await ratingDomain.createData(2, user2Id)
  await ratingDomain.createData(2, user3Id)

  const result = await ratingDomain.selectAllData()

  expect(ratingDomain).not.toBeNull()
  expect(result).not.toBeNull()
  expect(result.rows).toHaveLength(3)
})

test('should able to update rating', async () => {
  ratingDomain = new RatingDomain(conn.getConnection(), 'rating')
  const user1Id = UUID()
  await ratingDomain.createData(1, user1Id)

  const result = await ratingDomain.selectAllData()
  expect(result).not.toBeNull()
  expect(result.rows).toHaveLength(1)

  const createdId = result?.rows.length > 0 ? result?.rows[0].id : ''
  await ratingDomain.updateData(createdId, 2, user1Id)
  const updatedResult = await ratingDomain.selectAllData()

  expect(updatedResult.rows).toHaveLength(1)
  expect(updatedResult.rows[0].points).toBe(2)
})

test('should able to delete rating', async () => {
  ratingDomain = new RatingDomain(conn.getConnection(), 'rating')

  const user1Id = UUID()
  await ratingDomain.createData(1, user1Id)

  const result = await ratingDomain.selectAllData()

  expect(result).not.toBeNull()
  expect(result.rows).toHaveLength(1)

  ratingDomain?.deleteData()

  const deletedResult = await ratingDomain.selectAllData()
  expect(deletedResult.rows).toHaveLength(0)
})

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  // conn.dropSchema()

  conn.disConnect()
  done()
})
