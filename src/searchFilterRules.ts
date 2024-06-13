import type { IFilterRules } from './';

/**
 * Disable/filter out all the filter rules that have a "disabler" active.
 * Ex: allowEmpty and stringLimit and their conditions
 *
 * @param {object[]} rules
 */
export default (rules :IFilterRules[] = []) => {
  const filteredRules :IFilterRules[] = [];
  for(const key in rules){
    if(!Object.prototype.hasOwnProperty.call(rules, key))
      continue;
    const { search = [], stringLimit = 0, allowEmpty = false } = rules[key] || {};
    if(
      // if search is not array and not string
      (!Array.isArray(search) && typeof search !== "string") ||
      (
        // if search is NOT array and stringLimit is set: search string must be longer than stringLimit
        (Array.isArray(search) || stringLimit < 1 || search.length >= stringLimit) &&
        // if search is empty string or array and allowEmpty is false: empty search means empty filter
        (allowEmpty || search.length > 0)
      )
    )
      filteredRules.push({ ...rules[key]! })
  }
  return filteredRules;
}
