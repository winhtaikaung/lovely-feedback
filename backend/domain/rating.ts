import mysql from 'mysql2/promise'
import { Log } from '../utils/log'
import { keysToCamel } from '../utils/objectutils'
import { UUID } from '../utils/uuid'
import BaseDomain from './base'

export default class RatingDomain extends BaseDomain {
  constructor(db: mysql.Connection | null, tblName: string) {
    super(db, tblName)
  }

  public async selectById(id: string) {
    try {
      if (this.connection !== null) {
        const query = 'SELECT id, points, user_id FROM `' + this.tableName + '` WHERE `id`= ?'
        const [rows, fields] = await this.connection.query(this.escapeSQLStr(query), [id])

        return { rows: keysToCamel(rows) as RatingModule.Rating[], fields }
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

        return { rows: keysToCamel(rows) as RatingModule.Rating[], fields }
      }
    } catch (e: any) {
      Log.error(`RatingDomain::createData ${e.stack}`)
    }
    return { rows: [], fields: [] }
  }

  public async createData(points: number, userId: string): Promise<{ row: RatingModule.Rating | null }> {
    const query = 'INSERT INTO `' + this.tableName + '`(`id`,`points`, `user_id`) VALUES (?,?,?)'
    const uuid = UUID()
    try {
      if (this.connection !== null) {
        await this.connection.execute(this.escapeSQLStr(query), [uuid, points, userId])
        const result = await this.selectById(uuid)
        return { row: result.rows.length > 0 ? (result.rows[0] as RatingModule.Rating) : null }
      }
    } catch (e: any) {
      Log.error(`RatingDomain::createData ${e.stack}`)
    }
    return { row: null }
  }

  public async updateData(id: string, points: number, userId: string) {
    const query = 'UPDATE `' + this.tableName + '` SET `points`= ?,`user_id`= ? WHERE `id`= ?'

    try {
      if (this.connection !== null) {
        const [rows] = await this.connection.execute(this.escapeSQLStr(query), [points, userId, id])
        return rows
      }
    } catch (e: any) {
      Log.error(`RatingDomain::updateData ${e.stack}`)
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
      Log.error(`RatingDomain::createData ${e.stack}`)
    }
  }
}
