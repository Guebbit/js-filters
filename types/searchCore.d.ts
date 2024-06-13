import type { ILogicGates, IFilterRules } from "./filter";
/**
 * haystack to filter and single group of rules with their logic gate
 *
 * @param {array} haystack - array of objects
 * @param {array} rules - array of rules to apply to ALL requested parameters of the IFilterGroup
 * @param {string} logic - logic gate that wrap all the rules (they can have individual different logic gates)
 */
declare const _default: (haystack: Array<Record<string, unknown | unknown[]>>, rules?: IFilterRules[], logic?: ILogicGates) => Record<string, unknown>[];
export default _default;
//# sourceMappingURL=searchCore.d.ts.map