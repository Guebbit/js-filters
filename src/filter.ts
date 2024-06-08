import { match } from "../../index"
import type { logicGatesType, numberRuleType } from "../../index";

export interface filterRuleParameter {
  sensitive?: boolean
  distance?: number
  numberRule?: numberRuleType
}

/**
 * Check if {match} is > < = than {check}
 *
 * @param {number} check
 * @param {number} match
 * @param {string} rule
 */
export function filterCheckNumberRule(check :number, match :number, rule :numberRuleType = "eq") :boolean {
  switch (rule) {
    case "gt":
      return match > check;
    case "lt":
      return match < check;
    case "egt":
      return match >= check;
    case "elt":
      return match <= check;
    case "eq":
      return match === check;
  }
  return false;
}

/**
 * Fast array search
 * ALL values checked must be true
 */
export function filterAnd(toCheck :unknown | unknown[] = [], toMatch :unknown | unknown[] = [], {
  sensitive = false,
  distance = 0,
  numberRule,
}: filterRuleParameter = {}){
  // distance = 0 insensitive: (1-way) fast array search: if both are arrays and distance is less than 1 (distance is indifferent in these cases)
  if(Array.isArray(toCheck) && Array.isArray(toMatch) && distance === 0 && !sensitive)
    // all elements of the {toCheck} array must be present in the {toMatch} array
    return toCheck.every((s) => toMatch.includes(s));
  // normal filter:
  const checkArray = Array.isArray(toCheck) ? toCheck : [toCheck];
  const matchArray = Array.isArray(toMatch) ? toMatch : [toMatch];
  // check every interaction of {toCheck} with every interaction of {toMatch} ????
  for(let i = matchArray.length; i--; )
    for(let k = checkArray.length; k--; )
      // check strings with case sensitivity and distance and the other values with direct check
      // if even one is false, the final result is false
      if(typeof checkArray[k] === "string" && typeof matchArray[i] === "string"){
        if(!match(checkArray[k], matchArray[i], sensitive, distance))
          return false;
      }else{
        // no numberRule, regular straight check
        if(!numberRule && checkArray[k] !== matchArray[i])
          return false;
        // if number rule
        if(numberRule && !filterCheckNumberRule(checkArray[k], matchArray[i], numberRule))
          return false;
      }
  // if everything went well
  return true;
}

/**
 * At least 1 of all the values checked must be true
 * Searching for successes and returning true at the first
 * Reaaching the end and returning false (no success)
 */
export function filterOr(toCheck :unknown | unknown[] = [], toMatch :unknown | unknown[] = [], {
  sensitive = false,
  distance = 0,
  numberRule,
}: filterRuleParameter = {}
) {
  // (2-way) fast array search
  if(Array.isArray(toCheck) && Array.isArray(toMatch) && distance === 0 && !sensitive)
    // Just 1 element of the array must be in common
    return toMatch.some((s) => toCheck.includes(s)) || toCheck.some((s) => toMatch.includes(s));
  const checkArray = Array.isArray(toCheck) ? toCheck : [toCheck];
  const matchArray = Array.isArray(toMatch) ? toMatch : [toMatch];
  for(let i = matchArray.length; i--; )
    for(let k = checkArray.length; k--; )
      // at least 1 must be true
      if(typeof checkArray[k] === "string" && typeof matchArray[i] === "string"){
        if(match(checkArray[k], matchArray[i], sensitive, distance))
          return true;
      }else{
        if(!numberRule && checkArray[k] === matchArray[i])
          return true;
        if(numberRule && filterCheckNumberRule(checkArray[k], matchArray[i], numberRule))
          return true;
      }
  // if no successes were found
  return false;
}

export function filterNand(){
  return true;
}
export function filterNor(){
  return true;
}

/**
 * Check 2 values: 1-way search so {toCheck} and {toMatch} are NOT the same and order is important.
 * They can be string or array, need to check every combination and apply the chosen logic
 * If {toCheck} AND {toMatch} are strings, {logic} doesn't matter, and it's the same as using the {function match}
 *
 * EXAMPLES:
 * array vs array: "list of categories to filter" against "list of categories belonging to item"
 *
 * @param {string | string[]} toCheck
 * @param {string | string[]} toMatch
 * @param {string} logic - and, or, etc
 * @param {object} rules
 * @param {boolean} rules.sensitive - case sensitive or not
 * @param {number} rules.distance - max levenshtein distance
 *  -2: They can be substring one of another
 *  -1: {toCheck} can be substring of {toMatch}
 *  0: then they must be the same (default), better for array calculations
 *  1+: maximum distance to be accepted
 * @param {string} rules.numberRule - {toCheck} greater\less than {toMatch}
 */
export default (toCheck :unknown | unknown[] = [], toMatch :unknown | unknown[] = [], logic :logicGatesType = "and", rules ?:filterRuleParameter) :boolean => {
  switch (logic.toLowerCase()){
    case "and":
      return filterAnd(toCheck, toMatch, rules);
    case "or":
      return filterOr(toCheck, toMatch, rules);
    case "nand":
      // TODO
      return filterNand();
    case "nor":
      // TODO
      return filterNor();
  }
  // wrong logic inserted
  return false;
}
