import {EMPTY, Observable} from 'rxjs';
import {QueryList} from '@angular/core';
import {map, startWith} from 'rxjs/operators';

export function observeQueryList<T>(queryList: QueryList<T>): Observable<T[]> {
  return queryList
    ? queryList.changes.pipe(
        map(() => queryList.toArray()),
        startWith(queryList.toArray())
      )
    : EMPTY;
}
