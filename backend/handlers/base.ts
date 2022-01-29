import HttpStatusCode from '../enums/httpstatus'

export default class BaseHandler {
  protected resBody(payload: any) {
    return { data: payload }
  }

  protected resError(error: { error: string; message: string; code: HttpStatusCode }) {
    return error
  }

  protected internalServerError(message: string) {
    return this.resError({ error: 'Internal Server Error', message, code: HttpStatusCode.INTERNAL_SERVER_ERROR })
  }

  protected unprocessableEntity(message: string) {
    return this.resError({ error: 'Unprocessable Entity', message, code: HttpStatusCode.UNPROCESSABLE_ENTITY })
  }
}
