const mysql = require('mysql2/promise')
const dbSchema = require('./dbscripts/schema.json')

const connectionStr = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`

const migrateSchema = (dbConnection, schema) => {
  Object.values(schema).map(async (sql) => {
    await dbConnection?.execute(
      `${sql
        .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
        .replace(/\s+/g, ' ')}`,
    )
  })
}

;(async (migrate, schema) => {
  try {
    const con = await mysql.createConnection({ uri: connectionStr })

    migrate(con, schema)
    await con?.execute(
      `${'CREATE DATABASE IF NOT EXISTS `db_feedback_test`'
        .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
        .replace(/\s+/g, ' ')}`,
    )
    con.end()
    console.info('Migration Success')
    process.exit()
  } catch (e) {
    console.error(e.stack)
  }
  process.exit()
})(migrateSchema, dbSchema)
