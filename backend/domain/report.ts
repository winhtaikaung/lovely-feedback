import mysql from 'mysql2/promise'

import { ReportModule } from '../types/report'
import { Log } from '../utils/log'
import { keysToCamel } from '../utils/objectutils'
import BaseDomain from './base'

export default class ReportDomain extends BaseDomain {
  constructor(db: mysql.Connection | null) {
    super(db, '')
  }

  public async getBreakDownReport() {
    try {
      if (this.connection !== null) {
        const query =
          'SELECT DISTINCT P1.totalPoints as rating_a,P2.totalPoints as rating_b,P3.totalPoints as rating_c ,P4.totalPoints as rating_d,P5.totalPoints as rating_e,P6.totalPoints as rating_f FROM rating T, (SELECT COUNT(*)as totalPoints from rating WHERE points =1) as P1, (SELECT COUNT(*)as totalPoints from rating WHERE points =2) as P2, (SELECT COUNT(*)as totalPoints from rating WHERE points =3) as P3, (SELECT COUNT(*)as totalPoints from rating WHERE points =4) as P4, (SELECT COUNT(*)as totalPoints from rating WHERE points =5) as P5, (SELECT COUNT(*)as totalPoints from rating WHERE points =6) as P6;'
        const [rows, fields] = await this.connection.query(this.escapeSQLStr(query))

        return { rows: keysToCamel(rows) as ReportModule.BreakDownReport[], fields }
      }
    } catch (e: any) {
      Log.error(`ReportDomain::createData ${e.stack}`)
    }
    return { rows: [], fields: [] }
  }
}
