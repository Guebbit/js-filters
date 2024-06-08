import type { numberRuleType } from "../../index";
export interface filterRuleParameter {
    sensitive?: boolean;
    distance?: number;
    numberRule?: numberRuleType;
}
/**
 * Check if {match} is > < = than {check}
 *
 * @param {number} check
 * @param {number} match
 * @param {string} rule
 */
export declare function filterCheckNumberRule(check: number, match: number, rule?: numberRuleType): boolean;
/**
 * Fast array search
 * ALL values checked must be true
 */
export declare function filterAnd(toCheck?: unknown | unknown[], toMatch?: unknown | unknown[], { sensitive, distance, numberRule, }?: filterRuleParameter): boolean;
/**
 * At least 1 of all the values checked must be true
 * Searching for successes and returning true at the first
 * Reaaching the end and returning false (no success)
 */
export declare function filterOr(toCheck?: unknown | unknown[], toMatch?: unknown | unknown[], { sensitive, distance, numberRule, }?: filterRuleParameter): boolean;
export declare function filterNand(): boolean;
export declare function filterNor(): boolean;
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
declare const _default: (toCheck?: unknown | unknown[], toMatch?: unknown | unknown[], logic?: logicGatesType, rules?: filterRuleParameter) => boolean;
export default _default;
//# sourceMappingURL=filter.d.ts.map