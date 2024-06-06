export const makeDateReadable = (dateStr: string) => {
  const date = new Date(Date.parse(dateStr))

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}