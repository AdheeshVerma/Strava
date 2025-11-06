// src/utils/bmiCalculator.js
/**
 * Calculate Body Mass Index (BMI) and return the value together with its category.
 *
 * @param {number} weightKg - Weight in kilograms. Must be a positive number.
 * @param {number} heightCm - Height in centimeters. Must be a positive number.
 * @returns {{ bmi: number, category: string }} An object containing the BMI (rounded to two decimals) and its category.
 * @throws {TypeError} If weightKg or heightCm are not valid positive numbers.
 */
export function calculateBMI(weightKg, heightCm) {
  if (typeof weightKg !== 'number' || typeof heightCm !== 'number') {
    throw new TypeError('Weight and height must be numbers');
  }
  if (weightKg <= 0 || heightCm <= 0) {
    throw new TypeError('Weight and height must be positive values');
  }

  // Convert height from centimeters to meters
  const heightM = heightCm / 100;
  const rawBmi = weightKg / (heightM * heightM);
  const bmi = Math.round(rawBmi * 100) / 100; // round to 2 decimal places

  return {
    bmi,
    category: getBMICategory(bmi)
  };
}

/**
 * Determine the BMI category according to WHO standards.
 *
 * @param {number} bmi - The Body Mass Index value.
 * @returns {string} The category name.
 */
export function getBMICategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obesity';
}
