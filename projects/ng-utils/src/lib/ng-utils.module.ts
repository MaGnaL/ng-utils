import {NgModule} from '@angular/core';
import {AgePipe, NegatePipe} from './pipes';

const _exports: any[] = [
  // pipes
  NegatePipe,
  AgePipe,
];

@NgModule({
  declarations: [..._exports],
  exports: [..._exports],
})
export class NgUtilsModule {}
