import { NgModule } from '@angular/core';
import { NegatePipe } from './pipes/negate.pipe';

const _exports: any[] = [
  // pipes
  NegatePipe
];

@NgModule({
  declarations: [..._exports],
  exports: [..._exports]
})
export class NgUtilsModule {
}
