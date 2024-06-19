import { format } from "date-fns"

export const makeDateReadable = (dateStr: string) => {
  const date = new Date(Date.parse(dateStr))

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const extractTime = (dateStr: string) => {
  const date = new Date(Date.parse(dateStr))

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })
}

export const toMonthAndDay = (dateString: string) => {
  return format(new Date(dateString), 'MMMM dd')
}

const getKeyByValue = (obj: Record<string, number>, value: number): string | undefined => {
  const entry = Object.entries(obj).find(([key, val]) => val === value)
  return entry ? entry[0] : undefined
}