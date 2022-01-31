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
          'SELECT id, type,placeholder,answer,question, enable ,field_name,required FROM `' +
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

  public async updateData(
    id: string,
    qType?: QUESTION_TYPE,
    placeHolder?: string,
    questionText?: string,
    enable?: boolean,
    fieldName?: string,
    answer?: string,
    required?: boolean,
  ) {
    const query =
      'UPDATE `' +
      this.tableName +
      '` SET `type`= ?,`placeholder`= ?,`enable`=?,`field_name`=?,`answer`=? ,`required`=?,`question`=? WHERE `id`= ?'

    try {
      if (this.connection !== null) {
        const selectedData = await this.selectById(id)

        const questionResult = selectedData.rows !== null ? selectedData.rows[0] : null
        if (questionResult) {
          questionResult.question = questionText ? questionText : questionResult.question
          questionResult.answer = answer ? answer : questionResult.answer
          questionResult.type = qType ? qType : questionResult.type
          questionResult.placeholder = placeHolder ? placeHolder : questionResult.placeholder
          questionResult.enable = typeof enable !== 'undefined' ? enable : questionResult.enable
          questionResult.fieldName = fieldName ? fieldName : questionResult.fieldName
          questionResult.required = typeof required !== 'undefined' ? required : questionResult.required

          await this.connection.execute(this.escapeSQLStr(query), [
            questionResult.type,
            questionResult.placeholder,
            questionResult.enable,
            questionResult.fieldName,
            questionResult.answer,
            questionResult.required,
            questionResult.question,
            id,
          ])
          const updatedData = await this.selectById(id)
          return { row: updatedData.rows.length > 0 ? updatedData.rows[0] : null }
        }
        return { row: null }
      }
    } catch (e: any) {
      Log.error(`QuestionDomain::updateData ${e.stack}`)
    }
    return { row: null }
  }

  public async softDeleteData(id: string) {
    try {
      if (this.connection !== null) {
        const query = 'UPDATE `question` SET `is_deleted`=true WHERE `id` = ?'

        await this.connection.execute(this.escapeSQLStr(query), [id])
        return true
      }
    } catch (e: any) {
      Log.error(`QuestionDomain::createData ${e.stack}`)
    }
    return false
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
