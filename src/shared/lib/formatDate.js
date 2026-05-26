export function formatCompactDate(value) {
  const date = String(value ?? '')

  if (date.length !== 8) {
    return date
  }

  return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`
}
