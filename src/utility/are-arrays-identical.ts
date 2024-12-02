function areArraysIdentical(arr1: Array<Object>, arr2: Array<Object>) {
  if (arr1.length !== arr2.length) return false

  const normalizeObject = (obj: Object) => JSON.stringify(Object.entries(obj).sort())

  const normalizeArray = (arr: Array<Object>) => arr.map(normalizeObject).sort()

  const normalizedArr1 = normalizeArray(arr1)
  const normalizedArr2 = normalizeArray(arr2)

  return JSON.stringify(normalizedArr1) === JSON.stringify(normalizedArr2)
}

export default areArraysIdentical
