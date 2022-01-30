import express from 'express'
import * as core from 'express-serve-static-core'
import QuestionDomain from '../domain/question'

import HttpStatusCode from '../enums/httpstatus'
import { QUESTION_TYPE } from '../enums/question'
import BaseHandler from './base'

export default class QuestionHandler extends BaseHandler {
  private app: express.Application
  private questionDomain: QuestionDomain

  constructor(route: express.Application, questionDomain: QuestionDomain) {
    super()
    this.app = route
    this.questionDomain = questionDomain
    this.instantiateRoute()
  }

  public getRouter(): core.Router {
    return this.app
  }

  private async validator(
    req: core.Request<
      {},
      any,
      {
        data: {
          type: QUESTION_TYPE
          question: string
          fieldName: string
          enabled: boolean
          placeholder?: string
          answer?: string
          required?: boolean
        }
      },
      Record<string, any>
    >,
    res: core.Response<any, Record<string, any>, number>,
    next: core.NextFunction,
  ) {
    const body = req.body
    if (body && body.data && !!body.data.type && !!body.data.question && !!body.data.fieldName) {
      next()
    } else {
      res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json(this.unprocessableEntity('question or type is missing '))
    }
  }

  private instantiateRoute(): void {
    this.app.post('/question', this.validator.bind(this), this.createQuestion.bind(this))
    this.app.get('/question', this.getAllData.bind(this))
  }

  private async createQuestion(
    req: core.Request<
      {},
      any,
      {
        data: {
          type: QUESTION_TYPE
          question: string
          fieldName: string
          enabled: boolean
          placeholder?: string
          answer?: string
          required?: boolean
        }
      },
      Record<string, any>
    >,
    res: core.Response<any, Record<string, any>, number>,
  ) {
    const body = req.body

    const { row } = await this.questionDomain.createData(
      body.data.type,
      body.data.question,
      body.data?.placeholder,
      body.data?.answer,
      body.data?.fieldName,
      body.data?.required,
    )
    if (row) {
      res.status(HttpStatusCode.OK).json(this.resBody(row))
      return
    }

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(this.internalServerError('Failed to set Question'))
  }

  private async getAllData(
    req: core.Request<{}, any, any, Record<string, any>>,
    res: core.Response<any, Record<string, any>, number>,
  ) {
    const { rows } = await this.questionDomain.selectAllData()
    if (rows) {
      res.status(HttpStatusCode.OK).json(this.resBody(rows))
      return
    }

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(this.internalServerError('Failed to set Question'))
  }
}

// TODO : create update question and answers
