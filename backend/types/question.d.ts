import { QUESTION_TYPE } from '../enums/question'

declare module QuestionModule {
  export interface Question {
    id: string
    type: QUESTION_TYPE
    question: string
    placeholder: string
    answer: string
  }
}
