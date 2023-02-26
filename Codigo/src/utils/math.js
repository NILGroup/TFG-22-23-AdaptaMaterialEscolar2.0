/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} number The number you want to limit to the given range
 * @param {Number} minValue The lower boundary of the output range
 * @param {Number} maxValue The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
export const clamp = (number, minValue, maxValue) =>
	Math.min(Math.max(number, minValue), maxValue);
