/** Clamps a number between min and max. */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

/** Simple email format validator. */
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

/** Maps a value from one numeric range to another. */
export const mapRange = (value, inMin, inMax, outMin, outMax) =>
  ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
