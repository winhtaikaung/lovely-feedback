import { SideEffectType, useApiReducer } from '../../../api'
import { API_ENDPOINT } from '../../../constants'

export const useFeedBackForm = (sideEffects?: SideEffectType) => {
  const api = useApiReducer(`${API_ENDPOINT}/question`, true, sideEffects, 'GET')

  return { state: api.state }
}

export const useFeedBackFormSubmit = (sideEffects?: SideEffectType) => {
  const api = useApiReducer(`${API_ENDPOINT}/response`, false, sideEffects, 'POST')

  return { makeApiCall: api.makeAPICall, state: api.state }
}
