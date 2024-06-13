import { arrayDepth } from '@guebbit/js-toolkit';
import { filter } from './';
import { getValues } from './';
import type { IFilterRules } from './';

/**
 * Single item check AT LEAST 1 must be valid
 *
 * @param item - single item of the haystack
 * @param rules - all rules that need to be applied
 */
export default (item :Record<string, unknown | unknown[]>, rules: IFilterRules[] = []) => {
  for(let i = rules.length; i--; ){
    if(!rules[i])
      continue;
    const { search = '', searchParams = [], logic, sensitive, distance, numberRule } = rules[i] as IFilterRules;
    const columnsValues = getValues(item, searchParams);
    /**
     * Same as searchAnd
     * just 1 needs to be true, so the first "true" make the entire {item} check true
     */
    if(arrayDepth(columnsValues) < 2) {
      if(filter(search, columnsValues, logic, { sensitive, distance, numberRule }))
        return true;
    }else {
      for (let i = columnsValues.length; i--;)
        if(filter(search, columnsValues[i], logic, { sensitive, distance, numberRule }))
          return true;
    }
  }
  return false;
};
