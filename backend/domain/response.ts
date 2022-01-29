import mysql from 'mysql2/promise'
import { Log } from '../utils/log'
import { keysToCamel } from '../utils/objectutils'
import { UUID } from '../utils/uuid'
import BaseDomain from './base'

export default class UserResponseDomain extends BaseDomain {
  constructor(db: mysql.Connection | null, tblName: string) {
    super(db, tblName)
  }

  public async selectById(id: string) {
    try {
      if (this.connection !== null) {
        const query = 'SELECT id, response_data , user_id FROM `' + this.tableName + '` WHERE `id`= ?'
        const [rows, fields] = await this.connection.query(this.escapeSQLStr(query), [id])

        return { rows: keysToCamel(rows) as UserResponseModule.UserResponse[], fields }
      }
    } catch (e: any) {
      Log.error(`QuestionDomain::createData ${e.stack}`)
    }
    return { rows: [], fields: [] }
  }

  public async selectAllData() {
    try {
      if (this.connection !== null) {
        const query = 'SELECT * FROM `' + this.tableName + '`'
        const [rows, fields] = await this.connection.query(this.escapeSQLStr(query))

        return { rows: keysToCamel(rows) as UserResponseModule.UserResponse[], fields }
      }
    } catch (e: any) {
      Log.error(`ResponseDomain::createData ${e.stack}`)
    }
    return { rows: [], fields: [] }
  }

  public async createData(userId: string, feedBackResponse?: any) {
    const query = 'INSERT INTO `' + this.tableName + '`(`id`,`response_data`, `user_id`) VALUES (?,?,?)'
    const id = UUID()
    try {
      if (this.connection !== null) {
        await this.connection.execute(this.escapeSQLStr(query), [id, feedBackResponse || {}, userId])
        const result = await this.selectById(id)
        return { row: result.rows.length > 0 ? (result.rows[0] as UserResponseModule.UserResponse) : null }
      }
    } catch (e: any) {
      Log.error(`ResponseDomain::createData ${e.stack}`)
    }
    return { row: null }
  }

  public async updateData(id: string, feedBackResponse: any, userId: string) {
    const query = 'UPDATE `' + this.tableName + '` SET `response_data`= ?,`user_id`= ? WHERE `id`= ?'

    try {
      if (this.connection !== null) {
        const [rows] = await this.connection.execute(this.escapeSQLStr(query), [feedBackResponse, userId, id])
        return rows
      }
    } catch (e: any) {
      Log.error(`ResponseDomain::updateData ${e.stack}`)
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
      Log.error(`ResponseDomain::createData ${e.stack}`)
    }
  }
}
