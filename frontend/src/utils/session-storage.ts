export enum STOGAGE_KEY {
  USER_ID = 'feedback_user_id',
  USER_POINTS = 'feedback_user_points',
}

export const setSessionStorage = (key: STOGAGE_KEY, val: any) => sessionStorage.setItem(key, val)
export const getSessionStorage = (key: STOGAGE_KEY) => sessionStorage.getItem(key)
export const removeSessionStorage = (key: STOGAGE_KEY) => sessionStorage.removeItem(key)
export const clearStorage = () => sessionStorage.clear()
