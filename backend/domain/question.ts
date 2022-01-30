import mysql from 'mysql2/promise'
import { QUESTION_TYPE } from '../enums/question'
import { QuestionModule } from '../types/question'
import { Log } from '../utils/log'
import { keysToCamel } from '../utils/objectutils'
import { UUID } from '../utils/uuid'
import BaseDomain from './base'

export default class QuestionDomain extends BaseDomain {
  constructor(db: mysql.Connection | null, tblName: string) {
    super(db, tblName)
  }

  public async selectById(id: string) {
    try {
      if (this.connection !== null) {
        const query =
          'SELECT id, type,placeholder,answer,question,enable,field_name,required FROM `' +
          this.tableName +
          '` WHERE `id`= ? and is_deleted=False'
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
        const query =
          'SELECT id, type,placeholder,answer,question,enable,field_name,required FROM `' +
          this.tableName +
          '` WHERE is_deleted=False'
        const [rows, fields] = await this.connection.query(this.escapeSQLStr(query))

        return { rows: keysToCamel(rows) as QuestionModule.Question[], fields }
      }
    } catch (e: any) {
      Log.error(`QuestionDomain::createData ${e.stack}`)
    }
    return { rows: [], fields: [] }
  }

  public async createData(
    qType: QUESTION_TYPE,
    question: string,
    placeHolder?: string,
    answer?: string,
    fieldName?: string,
    required?: boolean,
  ) {
    const query =
      'INSERT INTO `' +
      this.tableName +
      '`(`id`,`type`, `placeholder`,`question` ,`answer`,`field_name`,`required`) VALUES (?,?,?,?,?,?,?)'
    const uuid = UUID()
    try {
      if (this.connection !== null) {
        await this.connection.execute(this.escapeSQLStr(query), [
          uuid,
          qType,
          placeHolder || null,
          question,
          answer || null,
          fieldName,
          required || false,
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
