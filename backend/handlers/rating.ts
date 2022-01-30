import express from 'express'
import * as core from 'express-serve-static-core'

import RatingDomain from '../domain/rating'
import UserDomain from '../domain/user'
import HttpStatusCode from '../enums/httpstatus'
import BaseHandler from './base'

export default class RatingHandler extends BaseHandler {
  private app: express.Application
  private userDomain: UserDomain
  private ratingDomain: RatingDomain
  constructor(route: express.Application, userdomain: UserDomain, rateDomain: RatingDomain) {
    super()
    this.app = route
    this.instantiateRoute()
    this.userDomain = userdomain
    this.ratingDomain = rateDomain
  }

  public getRouter(): express.Application {
    return this.app
  }

  private async validator(
    req: core.Request<{}, any, { data: { points: number } }, Record<string, any>>,
    res: core.Response<any, Record<string, any>, number>,
    next: core.NextFunction,
  ) {
    const points = [1, 2, 3, 4, 5, 6]
    const body = req.body
    if (body && body.data && points.includes(body.data.points)) {
      next()
    } else {
      res
        .status(HttpStatusCode.UNPROCESSABLE_ENTITY)
        .json(this.unprocessableEntity('Points should be included and points would be in range of 1 to 6'))
    }
  }

  private instantiateRoute(): void {
    this.app.post('/rating', this.validator.bind(this), this.postRating.bind(this))
  }

  private async postRating(
    req: core.Request<{}, any, { data: { points: number } }, Record<string, any>>,
    res: core.Response<any, Record<string, any>, number>,
  ) {
    const body = req.body
    const { row } = await this.userDomain.createData()
    if (row) {
      const points = await this.ratingDomain.createData(body.data.points, row.id)
      res.status(HttpStatusCode.OK).json(this.resBody(points.row))
      return
    }

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(this.internalServerError('Failed to set Rating'))
  }
}
