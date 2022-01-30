import express from 'express'
import * as core from 'express-serve-static-core'
import UserResponseDomain from '../domain/response'
import HttpStatusCode from '../enums/httpstatus'
import BaseHandler from './base'

export default class UserResponseHandler extends BaseHandler {
  private app: express.Application
  private userResponseDomain: UserResponseDomain

  constructor(route: express.Application, userResponseDomain: UserResponseDomain) {
    super()
    this.app = route
    this.userResponseDomain = userResponseDomain
    this.instantiateRoute()
  }

  public getRouter(): core.Router {
    return this.app
  }

  private async validator(
    req: core.Request<
      {},
      any,
      { data: { userId: string; responseData?: { [key: string]: any } } },
      Record<string, any>
    >,
    res: core.Response<any, Record<string, any>, number>,
    next: core.NextFunction,
  ) {
    const body = req.body
    if (body && body.data && !!body.data.userId) {
      next()
    } else {
      res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json(this.unprocessableEntity('userId is missing'))
    }
  }

  private instantiateRoute(): void {
    this.app.post('/response', this.validator.bind(this), this.createResponse.bind(this))
    this.app.get('/response', this.getAllData.bind(this))
  }

  private async createResponse(
    req: core.Request<
      {},
      any,
      { data: { userId: string; responseData?: { [key: string]: any } } },
      Record<string, any>
    >,
    res: core.Response<any, Record<string, any>, number>,
  ) {
    const body = req.body

    const { row } = await this.userResponseDomain.createData(body.data.userId, body.data.responseData)
    if (row) {
      res.status(HttpStatusCode.OK).json(this.resBody(row))
      return
    }

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(this.internalServerError('Failed to set UserResponse'))
  }

  private async getAllData(
    _: core.Request<{}, any, any, Record<string, any>>,
    res: core.Response<any, Record<string, any>, number>,
  ) {
    const { rows } = await this.userResponseDomain.selectAllData()
    if (rows) {
      res.status(HttpStatusCode.OK).json(this.resBody(rows))
      return
    }

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(this.internalServerError('Failed to set UserResponse'))
  }
}
