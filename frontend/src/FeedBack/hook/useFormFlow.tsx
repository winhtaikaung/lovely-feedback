import * as React from 'react'

type UseFormFlowReducerType = {
  formUiType: FormUIType
  loading?: boolean
}

type FormFlowActionType = {
  formUiType: FormUIType
}

export enum FormUIType {
  SMILY_BUTTON = 1,
  RATING_FORM = 2,
  TELL_US_MORE_FORM = 3,
  THANK_YOU_FORM = 4,
}

const useFormFlow = () => {
  const initialState = { formUiType: FormUIType.SMILY_BUTTON }

  const reducer = (
    state: UseFormFlowReducerType = initialState,
    action: FormFlowActionType,
  ): UseFormFlowReducerType => {
    switch (action.formUiType) {
      case FormUIType.SMILY_BUTTON:
        return { ...state, formUiType: FormUIType.SMILY_BUTTON }
      case FormUIType.RATING_FORM:
        return { ...state, formUiType: FormUIType.RATING_FORM }
      case FormUIType.TELL_US_MORE_FORM:
        return { ...state, formUiType: FormUIType.TELL_US_MORE_FORM }
      case FormUIType.THANK_YOU_FORM:
        return { ...state, formUiType: FormUIType.THANK_YOU_FORM }
      default:
        return initialState
    }
  }

  const [state, dispatch] = React.useReducer<
    (state: UseFormFlowReducerType | undefined, action: FormFlowActionType) => UseFormFlowReducerType
  >(reducer, initialState)

  return { dispatch, state }
}

export default useFormFlow
