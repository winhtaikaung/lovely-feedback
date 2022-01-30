export namespace QuestionModule {
  export interface Question {
    id: string
    type: QUESTION_TYPE
    question: string
    placeholder: string
    fieldName: string
    answer: string
    enabled: boolean
    required: boolean
  }
}
