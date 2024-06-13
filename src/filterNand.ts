// TODO
import type { IFilterParameterRules } from './';

export default (toCheck: unknown | unknown[] = [], toMatch: unknown | unknown[] = [], {
  sensitive = false,
  distance = 0,
  numberRule
}: IFilterParameterRules = {}) => {
  console.log("TODO", toCheck, toMatch, { sensitive, distance, numberRule })
  return true;
}
