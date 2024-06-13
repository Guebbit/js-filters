import type { ILogicGates, IFilterAny } from "./filter";
/**
 *
 *
 * IFilterGroup were born better use the logic gates:
 * - GLOBAL logic gate is for all the rules (root),
 * - GROUP logic gate is for the group (parameter in IFilterGroup)
 * - LOCAL logic gate is for the single rule in exam (parameter in object IFilterRules)
 *
 * WARNING: CLONE RULE. If haystack has clones and GLOBAL logic is "OR", they will be removed. TODO RESOLVE?
 * WARNING: UNORDERED RULE. If GLOBAL logic is "OR", the result order will be compromised TODO RESOLVE?
 *
 * TODO recursion to have infinite IFilterGroup layers
 * TODO sistemare la UNORDERED RULE mettendo all'haystack un id temporaneo casuale
 *  e poi creare un array con l'ordine originale, ordinare in base a quell'id, poi rimuovere il campo addizionale
 *
 * @param {array} haystack - array of objects
 * @param {array} rules - array of rules to apply to ALL requested parameters of the haystack
 * @param {string} logic - logic gate that wrap all the rules (they can have individual different logic gates)
 * @return {object[]} - result
 */
declare const _default: (haystack: Array<Record<string, unknown | unknown[]>>, rules?: Array<IFilterAny>, logic?: ILogicGates) => Array<Record<string, unknown | unknown[]>>;
export default _default;
//# sourceMappingURL=search.d.ts.map