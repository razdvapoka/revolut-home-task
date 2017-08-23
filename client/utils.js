export const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n)
export const isEmptyString = n => typeof n === `string` && n.length === 0
export const isNull = n => n === null
export const isEmptyAmount = isNull
