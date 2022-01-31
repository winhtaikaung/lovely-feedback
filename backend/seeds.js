const mysql = require('mysql2/promise')
const questionSeeds = require('./dbscripts/questions.json')

const connectionStr = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`
const migrateSchema = async (dbConnection, seeds) => {
  
  await seeds.forEach(async (sql) => {
    
    try {
        await dbConnection?.execute(
          `${sql
            .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
            .replace(/\s+/g, ' ')}`,
        )
      }catch(e){
        console.error(e.stack)
      }
  })

  await dbConnection.end()
}

;(async (migrate, seeds) => {
  try {
    const con = await mysql.createConnection({ uri: connectionStr })
    
    await migrate(con, seeds)

    console.info('Seed Generation Success')
    
    process.exit()
  } catch (e) {
    console.error(e.stack)
  }
  process.exit()
})(migrateSchema, questionSeeds)
