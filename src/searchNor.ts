import type { IFilterRules } from './';

/**
 *
 * @param item - single item of the haystack
 * @param rules - all rules that need to be applied
 */
export default (item :Record<string, unknown | unknown[]>, rules: IFilterRules[] = []) => {
  console.log("TODO", item, rules);
}
