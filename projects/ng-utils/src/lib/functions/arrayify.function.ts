import * as _ from 'lodash';

export function arrayify<V>(data: V | V[]): V[] {
  return _.isArray(data) ? data : [data];
}
