/**
 *
 * @param {number} min
 * @param {number} max
 * @returns
 */
export function random(min, max) {
  return min + Math.random() * (max - min)
}

/**
 * @param {number} number
 * @param {number} decimals
 * @returns {number}
 */
export function round(number, decimals = 0) {
  return Number(number.toFixed(decimals))
}
