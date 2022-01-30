import express from 'express'
import * as core from 'express-serve-static-core'
import ReportDomain from '../domain/report'
import HttpStatusCode from '../enums/httpstatus'
import BaseHandler from './base'

export default class ReportHandler extends BaseHandler {
  private app: express.Application
  private ReportDomain: ReportDomain

  constructor(route: express.Application, reportDomain: ReportDomain) {
    super()
    this.app = route
    this.ReportDomain = reportDomain
    this.instantiateRoute()
  }

  public getRouter(): core.Router {
    return this.app
  }

  private instantiateRoute(): void {
    this.app.get('/report', this.getAllData.bind(this))
  }

  private async getAllData(
    _: core.Request<{}, any, any, Record<string, any>>,
    res: core.Response<any, Record<string, any>, number>,
  ) {
    const { rows } = await this.ReportDomain.getBreakDownReport()
    if (rows) {
      res.status(HttpStatusCode.OK).json(
        this.resBody({
          rating_breakdown: {
            '1': rows[0].ratingA,
            '2': rows[0].ratingB,
            '3': rows[0].ratingC,
            '4': rows[0].ratingD,
            '5': rows[0].ratingE,
            '6': rows[0].ratingF,
          },
        }),
      )
      return
    }

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(this.internalServerError('Failed to set Report'))
  }
}
