import { keysToCamel } from './../utils/objectutils'
import mysql from 'mysql2/promise'
import { Log } from '../utils/log'
import { UUID } from '../utils/uuid'
import BaseDomain from './base'

export default class UserDomain extends BaseDomain {
  constructor(db: mysql.Connection | null, tblName: string) {
    super(db, tblName)
  }

  public async selectById(id: string) {
    try {
      if (this.connection !== null) {
        const query = 'SELECT id, rating_id, response_id FROM `' + this.tableName + '` WHERE `id`= ?'
        const [rows, fields] = await this.connection.query(this.escapeSQLStr(query), [id])

        return { rows: keysToCamel(rows) as UserModule.User[], fields }
      }
    } catch (e: any) {
      Log.error(`UserDomain::createData ${e.stack}`)
    }
    return { rows: [], fields: [] }
  }

  public async selectAllData() {
    try {
      if (this.connection !== null) {
        const query = 'SELECT * FROM `' + this.tableName + '`'
        const [rows, fields] = await this.connection.query(this.escapeSQLStr(query))

        return { rows: keysToCamel(rows) as UserModule.User[], fields }
      }
    } catch (e: any) {
      Log.error(`UserDomain::createData ${e.stack}`)
    }
    return { rows: [], fields: [] }
  }

  public async createData(rating_id?: string, response_id?: string): Promise<{ row: UserModule.User | null }> {
    const query = 'INSERT INTO `' + this.tableName + '`(`id`, `rating_id`, `response_id`) VALUES (?,?,?)'
    const id = UUID()
    try {
      if (this.connection !== null) {
        await this.connection.execute(this.escapeSQLStr(query), [id, rating_id || '', response_id || ''])
        const result = await this.selectById(id)
        return { row: result.rows.length > 0 ? (result.rows[0] as UserModule.User) : null }
      }
    } catch (e: any) {
      Log.error(`UserDomain::createData ${e.stack}`)
    }
    return { row: null }
  }

  public async updateData(id: string, rating_id: string, response_id: string) {
    const query = 'UPDATE `' + this.tableName + '` SET `rating_id`= ?,`response_id`= ? WHERE `id`= ?'

    try {
      if (this.connection !== null) {
        const [rows] = await this.connection.execute(this.escapeSQLStr(query), [rating_id, response_id, id])
        return rows
      }
    } catch (e: any) {
      Log.error(`UserDomain::updateData ${e.stack}`)
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
      Log.error(`UserDomain::createData ${e.stack}`)
    }
  }
}
