import { match } from '@guebbit/js-toolkit';
import { filterCheckNumberRule } from './';
import type { IFilterParameterRules } from './';

/**
 * Fast array search
 * ALL values checked must be true
 */
export default (toCheck: unknown | unknown[] = [], toMatch: unknown | unknown[] = [], {
  sensitive = false,
  distance = 0,
  numberRule
}: IFilterParameterRules = {}) => {
  // distance = 0 insensitive: (1-way) fast array search: if both are arrays and distance is less than 1 (distance is indifferent in these cases)
  if (Array.isArray(toCheck) && Array.isArray(toMatch) && distance === 0 && !sensitive)
    // all elements of the {toCheck} array must be present in the {toMatch} array
    return toCheck.every((s) => toMatch.includes(s));
  // normal filter:
  const checkArray = Array.isArray(toCheck) ? toCheck : [toCheck];
  const matchArray = Array.isArray(toMatch) ? toMatch : [toMatch];
  // check every interaction of {toCheck} with every interaction of {toMatch} ????
  for (let i = matchArray.length; i--;)
    for (let k = checkArray.length; k--;)
      // check strings with case sensitivity and distance and the other values with direct check
      // if even one is false, the final result is false
      if (typeof checkArray[k] === 'string' && typeof matchArray[i] === 'string') {
        if (!match(checkArray[k], matchArray[i], sensitive, distance))
          return false;
      } else {
        // no numberRule, regular straight check
        if (!numberRule && checkArray[k] !== matchArray[i])
          return false;
        // if number rule
        if (numberRule && !filterCheckNumberRule(checkArray[k], matchArray[i], numberRule))
          return false;
      }
  // if everything went well
  return true;
}
