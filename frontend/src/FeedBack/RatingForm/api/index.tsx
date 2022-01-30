import { SideEffectType, useApiReducer } from '../../../api'

export type RatingPointsResponse = {
  id: string
  points: number
  userId: string
}

export const useRatingFormSubmit = (sideEffects?: SideEffectType) => {
  const api = useApiReducer(`/rating`, false, sideEffects, 'POST')

  return { makeApiCall: api.makeAPICall, state: api.state }
}
