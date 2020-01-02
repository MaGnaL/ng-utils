import {NgModule} from '@angular/core';
import {NegatePipe} from './pipes/negate.pipe';
import {AgePipe} from './pipes/age.pipe';

const _exports: any[] = [
  // pipes
  NegatePipe,
  AgePipe
];

@NgModule({
  declarations: [..._exports],
  exports: [..._exports]
})
export class NgUtilsModule {}
