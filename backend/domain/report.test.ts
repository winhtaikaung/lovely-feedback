import { DBConnect } from '../utils/dbconnect'
import { UUID } from '../utils/uuid'
import RatingDomain from './rating'
import ReportDomain from './report'
const conn = new DBConnect(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/db_feedback_test`)
let reportDomain = null
let ratingDomain = null
beforeAll(async () => {
  await conn.connect()
  await conn.migrateSchema()
})

beforeEach(async () => {
  reportDomain = new ReportDomain(conn.getConnection())
  ratingDomain = new RatingDomain(conn.getConnection(), 'rating')

  await ratingDomain.deleteData()
})

test('should able to generate rating breakdown', async () => {
  reportDomain = new ReportDomain(conn.getConnection())
  ratingDomain = new RatingDomain(conn.getConnection(), 'rating')

  for (let i = 0; i < 50; i++) {
    await ratingDomain.createData(1, UUID())
  }
  for (let i = 0; i < 10; i++) {
    await ratingDomain.createData(6, UUID())
  }
  const report = await reportDomain.getBreakDownReport()

  expect(report.rows[0].ratingA).toBe(50)
  expect(report.rows[0].ratingF).toBe(10)
})

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  // conn.dropSchema()

  conn.getConnection()
  done()
})
