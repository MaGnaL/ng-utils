import {isArray} from 'lodash';

export function arrayify<V>(data: V | V[]): V[] {
  return isArray(data) ? (data as V[]) : ([data] as V[]);
}
