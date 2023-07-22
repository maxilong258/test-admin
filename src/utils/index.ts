export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ''
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isVoid(value)) delete result[key]
  })
  return result
}

// export const flattenObject = (object: any): any =>
//  Object.keys(object).reduce((target, key) => ({
//       ...target,
//       ...(typeof object[key] === 'object' ? flattenObject(object[key]) : { [key]: object[key] })
//     }), {})
