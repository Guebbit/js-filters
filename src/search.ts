import { groupBy, isEqual, isFunction } from "lodash";
import type { ILogicGates, IFilterRules, IFilterGroup, IFilterFunction, IFilterAny } from "./filter";
import { searchCore } from './';



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
export default (haystack :Array<Record<string, unknown | unknown[]>>, rules: Array<IFilterAny> = [], logic :ILogicGates = "and") :Array<Record<string, unknown | unknown[]>> => {
  // no rules = no changes
  if(rules.length < 0)
    return haystack;

  // It could be a mix of IFilterRules and IFilterGroup,
  // so I separate them in 2 different groups
  const mixedRules =
    groupBy(rules,
      (item) => {
        if(Object.prototype.hasOwnProperty.call(item, 'search'))
          return "rule";
        if(Object.prototype.hasOwnProperty.call(item, 'rules'))
          return "group";
        if(isFunction(item)) // if(item instanceof Function)
          return "function";
        return false;
      }
    )
  // Could optimize but it would mess up the order
  const filterRules = (mixedRules["rule"] || []) as IFilterRules[];
  const filterGroups = (mixedRules["group"] || []) as IFilterGroup[];
  const filterFunctions = (mixedRules["function"] || []) as IFilterFunction[];

  // no rules = no changes
  if(filterRules.length < 1 && filterGroups.length < 1 && filterFunctions.length < 1)
    return haystack;

  // SHORTCUT: if it's only regular IFilterRules: regular use, call searchCore a single time.
  if(filterGroups.length < 1 && filterFunctions.length < 1)
    return searchCore(haystack, filterRules, logic);

  // GLOBAL logic
  switch (logic.toLowerCase()){
    case "and": {
      /**
       * We'll keep using the same filtered results over and over, filtering more at every cycle
       */
      let results = [...haystack];
      let i :number;
      let len :number;
      // if it's a mixup, I do first IFilterRules with searchCore and it's global logic
      results = searchCore(results, filterRules, logic);
      // then proceed with the IFilterGroup cycle,
      // we need to call searchCore for every group (for it's own logic gates)
      for(i = 0, len = filterGroups.length; i < len; i++){
        const { rules = [], logic } = filterGroups[i] || {};
        results =
          searchCore(
            results,
            rules,
            logic
          )
      }
      // lastly: the custom functions
      for(i = 0, len = filterFunctions.length; i < len; i++)
        results = results.filter(filterFunctions[i]!)
      return results;
    }
    case "or": {
      /**
       * Add an extra layer because all groups will be used on the same haystack then merged
       */
      const results :Record<string, unknown | unknown[]>[][] = [];
      let i :number;
      let len :number;
      // IFilterRules (if empty: empty result)
      results[0] = filterRules.length > 0 ? searchCore(haystack, filterRules, logic) : [];
      // IFilterGroup cycle
      for(i = 0, len = filterGroups.length; i < len; i++){
        const { rules = [], logic } = filterGroups[i] || {};
        results[i + 1] =
          searchCore(
            [...haystack],
            rules,
            logic
          )
      }
      // lastly: the custom functions
      for(i = 0, len = filterFunctions.length; i < len; i++)
        results[i + results.length] = [...haystack].filter(filterFunctions[i]!)
      // merge all arrays (results.flat() doesn't remove duplicates)
      const mergedResults :Record<string, unknown | unknown[]>[] = [];
      for(i = 0, len = results.length; i < len; i++)
        if(results[i])
          for(let k = 0, lenk = results[i]!.length; k < lenk; k++)
            if(results[i]![k] && !mergedResults.some((item) => isEqual(results[i]![k], item)))
              mergedResults.push(results[i]![k]!);
      return mergedResults;
    }
    case "nand":
      // TODO
      break;
    case "nor":
      // TODO
      break;
  }

  // if wrong logic gate
  return haystack;
}
