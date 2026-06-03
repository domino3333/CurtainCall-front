export function formatCompactDate(value) {
  const date = String(value ?? '')

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date.replaceAll('-', '.')
  }

  if (date.length !== 8) {
    return date
  }

  return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`
}
