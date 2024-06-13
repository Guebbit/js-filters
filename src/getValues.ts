import { arrayColumns } from '@guebbit/js-toolkit';

/**
 * Standardize parameters insertion
 *
 * @param {Object} item
 * @param {string | string[]} parameters
 */
export default (item :Record<string, unknown | unknown[]> = {}, parameters :string | string[] = []) :unknown[] => {
  // if single parameters, transform into array of length 1
  let searchParams = Array.isArray(parameters) ? parameters : [parameters];
  // if searchParams empty or not specified, take all item's params
  searchParams = searchParams.length > 0 ? searchParams : Object.keys(item);
  // must not be empty
  if(searchParams.length === 0)
    return [];
  // get column values must be an array of arrays
  const columnsValues = arrayColumns([item], searchParams) as unknown[][];
  return columnsValues[0]!;
}
