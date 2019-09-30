import * as _ from 'lodash';

export function onlyOne<V>(data: V[]): V {
  return _.size(data) === 1 ? _.first(data) : null;
}
