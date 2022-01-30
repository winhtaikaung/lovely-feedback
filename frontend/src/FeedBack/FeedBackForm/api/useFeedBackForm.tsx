import { SideEffectType, useApiReducer } from '../../../api'

export const useFeedBackForm = (sideEffects?: SideEffectType) => {
  const api = useApiReducer(`/question`, true, sideEffects, 'GET')

  return { state: api.state }
}

export const useFeedBackFormSubmit = (sideEffects?: SideEffectType) => {
  const api = useApiReducer(`/response`, false, sideEffects, 'POST')
  return { makeApiCall: api.makeAPICall, state: api.state }
}
