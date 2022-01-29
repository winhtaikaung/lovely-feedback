import { keysToCamel } from '../utils/objectutils'
import mysql from 'mysql2/promise'
import { Log } from '../utils/log'
import { UUID } from '../utils/uuid'
import BaseDomain from './base'
import { QuestionModule } from '../types/question'
import { QUESTION_TYPE } from '../enums/question'

export default class QuestionDomain extends BaseDomain {
  constructor(db: mysql.Connection | null, tblName: string) {
    super(db, tblName)
  }

  public async selectById(id: string) {
    try {
      if (this.connection !== null) {
        const query = 'SELECT id, type,placeholder,answer,question FROM `' + this.tableName + '` WHERE `id`= ?'
        const [rows, fields] = await this.connection.query(this.escapeSQLStr(query), [id])

        return { rows: keysToCamel(rows) as QuestionModule.Question[], fields }
      }
    } catch (e: any) {
      Log.error(`QuestionDomain::createData ${e.stack}`)
    }
    return { rows: [], fields: [] }
  }

  public async selectAllData() {
    try {
      if (this.connection !== null) {
        const query = 'SELECT id, type,placeholder,answer,question FROM `' + this.tableName + '`'
        const [rows, fields] = await this.connection.query(this.escapeSQLStr(query))

        return { rows: keysToCamel(rows) as QuestionModule.Question[], fields }
      }
    } catch (e: any) {
      Log.error(`QuestionDomain::createData ${e.stack}`)
    }
    return { rows: [], fields: [] }
  }

  public async createData(qType: QUESTION_TYPE, question: string, placeHolder?: string, answer?: string) {
    const query =
      'INSERT INTO `' + this.tableName + '`(`id`,`type`, `placeholder`,`question` ,`answer`) VALUES (?,?,?,?,?)'
    const uuid = UUID()
    try {
      if (this.connection !== null) {
        await this.connection.execute(this.escapeSQLStr(query), [
          uuid,
          qType,
          placeHolder || null,
          question,
          answer || null,
        ])
        const result = await this.selectById(uuid)
        return { row: result.rows.length > 0 ? (result.rows[0] as QuestionModule.Question) : null }
      }
    } catch (e: any) {
      Log.error(`QuestionDomain::createData ${e.stack}`)
    }
    return { row: null }
  }

  public async updateData(id: string, qType: QUESTION_TYPE, placeHolder: string) {
    const query = 'UPDATE `' + this.tableName + '` SET `type`= ?,`placeholder`= ? WHERE `id`= ?'

    try {
      if (this.connection !== null) {
        const [rows] = await this.connection.execute(this.escapeSQLStr(query), [qType, placeHolder, id])
        return rows
      }
    } catch (e: any) {
      Log.error(`QuestionDomain::updateData ${e.stack}`)
    }
    return null
  }

  public async deleteData() {
    try {
      if (this.connection !== null) {
        const query = 'DELETE FROM `' + this.tableName + '`'
        await this.connection.execute(this.escapeSQLStr(query))
      }
    } catch (e: any) {
      Log.error(`QuestionDomain::createData ${e.stack}`)
    }
  }
}
