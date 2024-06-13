import { searchAnd, searchFilterRules, searchNand, searchNor, searchOr } from './';
import type { ILogicGates, IFilterRules } from "./filter";


/**
 * haystack to filter and single group of rules with their logic gate
 *
 * @param {array} haystack - array of objects
 * @param {array} rules - array of rules to apply to ALL requested parameters of the IFilterGroup
 * @param {string} logic - logic gate that wrap all the rules (they can have individual different logic gates)
 */
export default (haystack :Array<Record<string, unknown | unknown[]>>, rules: IFilterRules[] = [], logic :ILogicGates = "and") :Record<string,unknown>[] => {
  const filteredRules :IFilterRules[] = searchFilterRules(rules);
  // no changes
  if(!filteredRules || filteredRules.length < 1)
    return haystack;
  // filter
  return haystack.filter((item :Record<string, unknown | unknown[]>) => {
    switch (logic.toLowerCase()){
      case "and":
        return searchAnd(item, filteredRules);
      case "or":
        return searchOr(item, filteredRules);
      case "nand":
        // TODO
        return searchNand(item, filteredRules);
      case "nor":
        // TODO
        return searchNor(item, filteredRules);
    }
    return false;
  });
}
