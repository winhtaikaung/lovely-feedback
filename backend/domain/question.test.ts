import { QUESTION_TYPE } from '../enums/question'
import { DBConnect } from '../utils/dbconnect'
import QuestionDomain from './question'
const conn = new DBConnect(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/db_feedback_test`,
)
let questionDomain = null
beforeAll(async () => {
  await conn.connect()
  await conn.migrateSchema()
})

beforeEach(async () => {
  questionDomain = new QuestionDomain(conn.getConnection(), 'question')
  questionDomain.deleteData()
})

test('should able to create new question', async () => {
  questionDomain = new QuestionDomain(conn.getConnection(), 'question')

  await questionDomain.createData(
    QUESTION_TYPE.EMAIL,
    'What is your opinion?',
    'Placeholder 1',
    'Sample Answer',
    'email',
  )
  await questionDomain.createData(
    QUESTION_TYPE.SHORT_ANSWER,
    'What is your opinion?',
    'Placeholder 1',
    'Short Answer',
    'email',
  )
  await questionDomain.createData(
    QUESTION_TYPE.LINEAR_SCALE,
    'What is your opinion?',
    'Linear Scale',
    'Linear Scale',
    'email',
  )

  const result = await questionDomain.selectAllData()

  expect(questionDomain).not.toBeNull()
  expect(result).not.toBeNull()
  expect(result.rows).toHaveLength(3)
})

test('should able to update question', async () => {
  questionDomain = new QuestionDomain(conn.getConnection(), 'question')
  await questionDomain.createData(
    QUESTION_TYPE.EMAIL,
    'What is your opinion?',
    'Placeholder 1',
    'Sample Answer',
    'email',
  )

  const result = await questionDomain.selectAllData()
  expect(result).not.toBeNull()
  expect(result.rows).toHaveLength(1)

  const createdId = result?.rows.length > 0 ? result?.rows[0].id : ''
  await questionDomain.updateData(createdId, QUESTION_TYPE.SHORT_ANSWER, 'Placeholder 11')
  const updatedResult = await questionDomain.selectAllData()
  expect(updatedResult.rows).toHaveLength(1)
  expect(updatedResult.rows[0].type).toBe(QUESTION_TYPE.SHORT_ANSWER)

  questionDomain?.deleteData()
})

test('should able to delete question', async () => {
  questionDomain = new QuestionDomain(conn.getConnection(), 'question')

  await questionDomain.createData(
    QUESTION_TYPE.EMAIL,
    'What is your opinion?',
    'Placeholder 1',
    'Sample Answer',
    'email',
  )

  const result = await questionDomain.selectAllData()

  expect(result).not.toBeNull()
  expect(result.rows).toHaveLength(1)

  questionDomain?.deleteData()

  const deletedResult = await questionDomain.selectAllData()
  expect(deletedResult.rows).toHaveLength(0)
})

test('should able to soft Delete question', async () => {
  questionDomain = new QuestionDomain(conn.getConnection(), 'question')

  await questionDomain.createData(
    QUESTION_TYPE.EMAIL,
    'What is your opinion?',
    'Placeholder 1',
    'Sample Answer',
    'email',
  )

  const result = await questionDomain.selectAllData()
  expect(result).not.toBeNull()
  expect(result.rows).toHaveLength(1)

  const createdId = result?.rows.length > 0 ? result?.rows[0].id : ''

  await questionDomain.softDeleteData(createdId)

  const deletedResult = await questionDomain.selectAllData()
  expect(deletedResult.rows).toHaveLength(0)
})

afterAll(done => {
  done()
})
