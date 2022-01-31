interface KVObject {
  [key: string]: any
}
const isObject = (obj: any) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isEmpty = (obj: any) => {
  if (!obj) {
    return true
  }
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }
  return JSON.stringify(obj) === JSON.stringify({})
}

const toCamel = (s: string): CamelCase<string> =>
  s.replace(/([-_][a-z])/gi, ($1: string) => $1.toUpperCase().replace('-', '').replace('_', ''))

export const keysToCamel = (o: any): KeysToCamelCase<KVObject> => {
  if (isObject(o)) {
    const n = {} as KVObject
    const tempObj = o as KVObject

    Object.keys(o).forEach((k: string) => {
      n[toCamel(k)] = keysToCamel(tempObj[k] as KVObject)
    })

    return n
  } else if (Array.isArray(o)) {
    return o.map((i: KVObject) => keysToCamel(i))
  }

  return o
}
