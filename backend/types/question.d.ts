import { QUESTION_TYPE } from '../enums/question'

export namespace QuestionModule {
  export interface Question {
    id: string
    type: QUESTION_TYPE
    question: string
    placeholder: string
    answer: string
    fieldName: string
    required: boolean
    enable: boolean
  }
}
