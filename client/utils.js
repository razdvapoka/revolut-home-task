export const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n)
const isEmptyString = n => typeof n === `string` && n.length === 0
export const isEmptyAmount = isEmptyString
export const trimToPrecision = (numString, places) => {
  const [ left, right ] = numString.split(`.`)
  return right && right.length > places
    ? `${left}.${right.substr(0, places)}`
    : numString
}
