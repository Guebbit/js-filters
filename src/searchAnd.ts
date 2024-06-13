import { arrayDepth } from '@guebbit/js-toolkit';
import { filter } from './';
import { getValues } from './';
import type { IFilterRules } from './';

/**
 * Single item check if ALL rules are valid
 *
 * @param item - single item of the haystack
 * @param rules - all rules that need to be applied
 */
export default (item :Record<string, unknown | unknown[]>, rules: IFilterRules[] = []) => {
  // for every rule
  for(let i = rules.length; i--; ){
    if(!rules[i])
      continue;
    // break down the various parts
    const { search = '', searchParams = [], logic, sensitive, distance, numberRule } = rules[i] as IFilterRules;
    // get values from selected columns
    const columnsValues = getValues(item, searchParams);
    /**
     * first level of depth: value of item
     * second level of depth: the above value is an array
     * (these 2 are very different in purpose)
     * all must be true, so the first "false" make the entire {item} check false
     */
    if(arrayDepth(columnsValues) < 2) {
      if (!filter(search, columnsValues, logic, { sensitive, distance, numberRule }))
        return false;
    }else {
      for (let i = columnsValues.length; i--;)
        if (!filter(search, columnsValues[i], logic, { sensitive, distance, numberRule }))
          return false;
    }
  }
  return true;
}
