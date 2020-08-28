import {first, size} from 'lodash';

export function onlyOne<V>(data: V[]): V {
  return size(data) === 1 ? first(data) : null;
}
