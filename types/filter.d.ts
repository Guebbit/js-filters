/**
 * Logic gates
 *
 * AND: ALL checks must be true
 * OR: AT LEAST ONE check must be true
 * Nand: AT LEAST ONE check must be false
 * Nor: ALL checks must be false
 *
 * Xor, Xnor, Not and Buffer are not implemented
 */
export type ILogicGates = "and" | "AND" | "or" | "OR" | "nand" | "NAND" | "nor" | "NOR";
/**
 * Logic rule
 *
 * gt: greater than
 * lt: lesser than
 * egt: equal or greater than
 * elt: equal or lesser than
 * eq: equal as
 */
export type INumberRule = "gt" | "lt" | "egt" | "elt" | "eq";
/**
 * Filter item for search
 */
export interface IFilterRules {
    /**
     * Only for user identification if needed
     */
    id?: string;
    /**
     * Array of parameters to search from, if empty = get all parameters of records
     */
    search: unknown | unknown[];
    /**
     * list of parameters to search from
     */
    searchParams: string | string[];
    /**
     * Logic gate
     */
    logic?: ILogicGates;
    /**
     * case-sensitive or not
     */
    sensitive?: boolean;
    /**
     * MAX levenshtein distance
     *
     * -2: They can be substring one of another
     * -1: {toCheck} can be substring of {toMatch}
     * 0: then they must be the same (default), better for array calculations
     * 1+: maximum distance to be accepted
     */
    distance?: number;
    /**
     * Disable filter if {search} is string and has less length than stringLimit
     * default: no limit
     */
    stringLimit?: number;
    /**
     * If false, filter is not allowed to be empty
     * ({search} empty array or empty string)
     * then it's disabled
     *
     * If true and filter is empty: it will filter out everything
     *
     * Default: false
     */
    allowEmpty?: boolean;
    /**
     * Number
     * gt: greater than (>)
     * lt: less than (<)
     * egt equal greater than (>=)
     * elt: equal less than (<=)
     * eq: equal (===)
     */
    numberRule?: INumberRule;
}
/**
 * Group IFilterRules with theirs logic gate
 */
export interface IFilterGroup {
    rules: IFilterRules[];
    logic?: ILogicGates;
}
/**
 * A function for custom filter, use in native [].filter
 */
export type IFilterFunction = (arg: unknown) => boolean;
/**
 * ALl together, for better use
 */
export type IFilterAny = IFilterRules | IFilterGroup | IFilterFunction;
/**
 *
 */
export interface IFilterParameterRules {
    sensitive?: boolean;
    distance?: number;
    numberRule?: INumberRule;
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
declare const _default: (toCheck?: unknown | unknown[], toMatch?: unknown | unknown[], logic?: ILogicGates, rules?: IFilterParameterRules) => boolean;
export default _default;
//# sourceMappingURL=filter.d.ts.map