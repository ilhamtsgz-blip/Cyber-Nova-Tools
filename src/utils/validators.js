export function validateLatitude(value) {
  if (value === null || value === undefined || value === '') return false
  const num = parseFloat(value)
  if (isNaN(num)) return false
  return num >= -90 && num <= 90
}

export function validateLongitude(value) {
  if (value === null || value === undefined || value === '') return false
  const num = parseFloat(value)
  if (isNaN(num)) return false
  return num >= -180 && num <= 180
}
