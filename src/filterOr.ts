import { match } from '@guebbit/js-toolkit';
import { filterCheckNumberRule } from './';
import type { IFilterParameterRules } from './';

/**
 * At least 1 of all the values checked must be true
 * Searching for successes and returning true at the first
 * Reaaching the end and returning false (no success)
 */
export default (toCheck: unknown | unknown[] = [], toMatch: unknown | unknown[] = [], {
  sensitive = false,
  distance = 0,
  numberRule
}: IFilterParameterRules = {}) => {
  // (2-way) fast array search
  if (Array.isArray(toCheck) && Array.isArray(toMatch) && distance === 0 && !sensitive)
    // Just 1 element of the array must be in common
    return toMatch.some((s) => toCheck.includes(s)) || toCheck.some((s) => toMatch.includes(s));
  const checkArray = Array.isArray(toCheck) ? toCheck : [toCheck];
  const matchArray = Array.isArray(toMatch) ? toMatch : [toMatch];
  for (let i = matchArray.length; i--;)
    for (let k = checkArray.length; k--;)
      // at least 1 must be true
      if (typeof checkArray[k] === 'string' && typeof matchArray[i] === 'string') {
        if (match(checkArray[k], matchArray[i], sensitive, distance))
          return true;
      } else {
        if (!numberRule && checkArray[k] === matchArray[i])
          return true;
        if (numberRule && filterCheckNumberRule(checkArray[k], matchArray[i], numberRule))
          return true;
      }
  // if no successes were found
  return false;
}
