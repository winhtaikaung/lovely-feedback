import mysql from 'mysql2/promise'

import { ddl, schema } from '../migrate'
import { Log } from './log'

export class DBConnect {
  private connection: mysql.Connection | null
  private connectionStr: string
  constructor(conStr: string) {
    this.connectionStr = conStr
    this.connection = null
  }

  public async connect() {
    try {
      this.connection = await mysql.createConnection({ uri: this.connectionStr })
      Log.success(`Database Connected to ${this.connectionStr}`)
    } catch (e: any) {
      Log.error(`Database connection error ${e?.stack}`)
    }
  }

  public async disConnect() {
    try {
      if (this.connection) {
        await this.connection?.end()
      }
      Log.success(`Database Disconnected Successfully from ${this.connectionStr}`)
    } catch (e: any) {
      Log.error(`Database connection error ${e?.stack}`)
    }
  }

  public async migrateSchema() {
    try {
      if (this.connection) {
        Object.values(schema).map(async sql => {
          await this.connection?.execute(
            `${sql
              .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
              .replace(/\s+/g, ' ')}`,
          )
        })
      }
      Log.success(`Database Success Successfully migrated`)
    } catch (e: any) {
      Log.error(`Database connection error ${e?.stack}`)
    }
  }

  public async dropSchema() {
    try {
      if (this.connection) {
        Object.values(ddl).map(async sql => {
          await this.connection?.execute(
            `${sql
              .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
              .replace(/\s+/g, ' ')}`,
          )
        })
      }
      Log.success(`Database Successfully cleanup`)
    } catch (e: any) {
      Log.error(`Database connection error ${e?.stack}`)
    }
  }

  public getConnection(): mysql.Connection | null {
    return this.connection
  }
}
