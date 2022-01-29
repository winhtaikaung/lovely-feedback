import express from 'express'
import mysql from 'mysql2/promise'
import bodyParser from 'body-parser'
import { createServer, Server } from 'http'

import cors from 'cors'
import RatingHandler from './handlers/rating'
import { DBConnect } from './utils/dbconnect'
import UserDomain from './domain/user'
import RatingDomain from './domain/rating'

import QuestionDomain from './domain/question'
import QuestionHandler from './handlers/question'
import UserResponseDomain from './domain/response'
import UserResponseHandler from './handlers/response'

class FeedBackAPIService {
  public static readonly PORT: number = 5000

  private port: string | number
  private expressApp: express.Application
  private server: Server

  private dbConnection: mysql.Connection | null

  constructor(dbConn: mysql.Connection | null) {
    this.expressApp = express()
    this.port = process.env.SERVER_PORT || FeedBackAPIService.PORT
    this.expressApp.use(cors())
    this.expressApp.use(express.json())
    // this.expressApp.options('*', cors())
    this.dbConnection = dbConn

    this.setupRoutes()

    this.server = createServer(this.expressApp)
    this.listen()
  }

  get app(): express.Application {
    return this.expressApp
  }

  private setupRoutes(): void {
    const userDomain = new UserDomain(this.dbConnection, 'user')
    const ratingDomain = new RatingDomain(this.dbConnection, 'rating')
    const questionDomain = new QuestionDomain(this.dbConnection, 'question')
    const responseDomain = new UserResponseDomain(this.dbConnection, 'response')

    new RatingHandler(this.expressApp, userDomain, ratingDomain)
    new QuestionHandler(this.expressApp, questionDomain)
    new UserResponseHandler(this.expressApp, responseDomain)
  }

  private listen(): void {
    this.expressApp.use(bodyParser.urlencoded({ extended: false }))
    this.expressApp.use(bodyParser.json())
    this.server.listen(this.port, () => {
      process.stdout.write(`Running server on port ${this.port}\n`)
    })
  }
}

async function feedbackApp() {
  const pgConnect = new DBConnect(
    `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`,
  )
  await pgConnect.connect()

  const app = new FeedBackAPIService(pgConnect.getConnection()).app
  return app
}

const app = feedbackApp()

export default app
