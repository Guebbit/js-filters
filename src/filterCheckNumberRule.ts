import type { INumberRule } from './';

/**
 * Check if {match} is > < = than {check}
 *
 * @param {number} check
 * @param {number} match
 * @param {string} rule
 */
export default (check :number, match :number, rule :INumberRule = "eq") => {
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
