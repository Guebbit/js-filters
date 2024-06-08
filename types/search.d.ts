import type { logicGatesType, filterRulesMap, filterAnyMap } from "../../interfaces";
/**
 * Single item check if ALL rules are valid
 *
 * @param item - single item of the haystack
 * @param rules - all rules that need to be applied
 */
export declare function searchAnd(item: Record<string, unknown | unknown[]>, rules?: filterRulesMap[]): boolean;
/**
 * Single item check AT LEAST 1 must be valid
 *
 * @param item - single item of the haystack
 * @param rules - all rules that need to be applied
 */
export declare function searchOr(item: Record<string, unknown | unknown[]>, rules?: filterRulesMap[]): boolean;
export declare function searchNand(): boolean;
export declare function searchNor(): boolean;
/**
 * haystack to filter and single group of rules with their logic gate
 *
 * @param {array} haystack - array of objects
 * @param {array} rules - array of rules to apply to ALL requested parameters of the filterGroupMap
 * @param {string} logic - logic gate that wrap all the rules (they can have individual different logic gates)
 */
export declare function searchCore(haystack: Array<Record<string, unknown | unknown[]>>, rules?: filterRulesMap[], logic?: logicGatesType): Record<string, unknown>[];
/**
 *
 *
 * filterGroupMap were born better use the logic gates:
 * - GLOBAL logic gate is for all the rules (root),
 * - GROUP logic gate is for the group (parameter in filterGroupMap)
 * - LOCAL logic gate is for the single rule in exam (parameter in object filterRulesMap)
 *
 * WARNING: CLONE RULE. If haystack has clones and GLOBAL logic is "OR", they will be removed. TODO RESOLVE?
 * WARNING: UNORDERED RULE. If GLOBAL logic is "OR", the result order will be compromised TODO RESOLVE?
 *
 * TODO recursion to have infinite filterGroupMap layers
 * TODO sistemare la UNORDERED RULE mettendo all'haystack un id temporaneo casuale
 *  e poi creare un array con l'ordine originale, ordinare in base a quell'id, poi rimuovere il campo addizionale
 *
 * @param {array} haystack - array of objects
 * @param {array} rules - array of rules to apply to ALL requested parameters of the haystack
 * @param {string} logic - logic gate that wrap all the rules (they can have individual different logic gates)
 * @return {object[]} - result
 */
declare const _default: (haystack: Array<Record<string, unknown | unknown[]>>, rules?: Array<filterAnyMap>, logic?: logicGatesType) => Array<Record<string, unknown | unknown[]>>;
export default _default;
//# sourceMappingURL=search.d.ts.map