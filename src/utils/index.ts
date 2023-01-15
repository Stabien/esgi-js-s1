const generateRandomString = (length: number, symbols: string): string => {
  let randomString = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * symbols.length)
    randomString += symbols[randomIndex]
  }
  return randomString
}

export const generateUUID = (): string => {
  const symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  const firstPart = generateRandomString(7, symbols)
  const secondPart = generateRandomString(4, symbols)
  const thirdPart = generateRandomString(4, symbols)
  const fourthPart = generateRandomString(4, symbols)
  const fifthPart = generateRandomString(12, symbols)

  const randomUUID = `A${firstPart}-${secondPart}-${thirdPart}-${fourthPart}-${fifthPart}`

  return randomUUID
}
