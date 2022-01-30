import * as React from 'react'
const enum ACTIONTYPE {
  loading = 'loading',
  success = 'success',
  error = 'error',
}

type ApiReducerType = {
  loading: boolean
  status: ACTIONTYPE
  data?: any
  error?: string
}

type ApiActionType = {
  actionType: ACTIONTYPE
  data?: any
  error?: Error
}

export type SideEffectType = {
  onSuccess?: (data?: { [key: string]: any }) => void
  onError?: (msg?: string) => void
  onLoading?: () => void
}

const API: (
  url: string,
  abortSignal: AbortSignal,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: { [key: string]: any },
) => Promise<{ [key: string]: any }> = async (
  url: string,
  abortSignal: AbortSignal,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: { [key: string]: any },
) => {
  try {
    const response = await fetch(url, {
      method: method || 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      signal: abortSignal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method === 'GET' ? undefined : JSON.stringify(data || {}),
    })
    return response.json()
  } catch {
    return undefined
  }
}

export const useApiReducer = (
  url: string,
  fetchOnLoad?: boolean,
  sideEffect?: SideEffectType,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  payload?: { [key: string]: any },
) => {
  const initialState = { loading: false, data: null, error: undefined, status: ACTIONTYPE.loading }

  const reducer = (state: ApiReducerType = initialState, action: ApiActionType): ApiReducerType => {
    switch (action.actionType) {
      case 'loading':
        return { ...state, loading: true, data: null, status: action.actionType }
      case 'success':
        return { ...state, loading: false, data: action.data, status: action.actionType }
      case 'error':
        return { ...state, loading: false, data: null, error: action.error?.message, status: action.actionType }
      default:
        return initialState
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState)

  const makeAPICallBack = React.useCallback(
    (bodyPayload: any) => {
      const controller = new AbortController()
      const signal = controller.signal

      const fetchData = async () => {
        sideEffect?.onLoading?.()
        dispatch({ actionType: ACTIONTYPE.loading })
        try {
          const data = await API(url, signal, method, bodyPayload)
          sideEffect?.onSuccess?.(data.data)
          dispatch({ actionType: ACTIONTYPE.success, data: data.data })
        } catch (e: any) {
          sideEffect?.onError?.(e)
          dispatch({ actionType: ACTIONTYPE.error, error: e })
        }
      }
      fetchData()

      return () => {
        controller.abort()
      }
    },
    [method, url, sideEffect],
  )

  React.useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    let mounted = true

    const fetchData = async () => {
      sideEffect?.onLoading?.()
      dispatch({ actionType: ACTIONTYPE.loading })
      try {
        const data = await API(url, signal, method)
        sideEffect?.onSuccess?.(data?.data)
        dispatch({ actionType: ACTIONTYPE.success, data: data?.data })
      } catch (e: any) {
        sideEffect?.onError?.(e)
        dispatch({ actionType: ACTIONTYPE.error, error: e })
      }
    }
    
    if (!!fetchOnLoad && mounted) {
      fetchData()
    }

    return () => {
      mounted = false
      controller.abort()
    }
  }, [url, fetchOnLoad, method, payload, sideEffect])

  return { state, makeAPICall: makeAPICallBack }
}
