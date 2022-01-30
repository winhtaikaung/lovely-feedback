import { SideEffectType, useApiReducer } from '../../../api'
import { API_ENDPOINT } from '../../../constants'

export type RatingPointsResponse = {
  id: string
  points: number
  userId: string
}

export const useRatingFormSubmit = (sideEffects?: SideEffectType) => {
  const api = useApiReducer(`${API_ENDPOINT}/rating`, false, sideEffects, 'POST')

  return { makeApiCall: api.makeAPICall, state: api.state }
}
