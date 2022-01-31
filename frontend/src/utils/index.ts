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

export const toCamel = (s: string): CamelCase<string> =>
  s.replace(/([-_][a-z])/gi, ($1: string) => $1.toUpperCase().replace('-', '').replace('_', ''))
