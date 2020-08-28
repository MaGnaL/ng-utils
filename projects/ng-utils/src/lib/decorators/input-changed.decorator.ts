import {OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {forEach, get, has, isArray, isFunction, isString, keys} from 'lodash';
import {arrayify} from '../functions';

export interface InputChangedConfig {
  input?: string | string[];
  distinct?: boolean;
  skipFirst?: boolean;
}

export function InputChanged(): MethodDecorator;
export function InputChanged(fields: string | string[]): MethodDecorator;
export function InputChanged(config: InputChangedConfig): MethodDecorator;
export function InputChanged(
  configOrFields: string | string[] | InputChangedConfig = {distinct: true}
): MethodDecorator {
  // process configOrFields
  if (isString(configOrFields)) {
    configOrFields = {input: configOrFields};
  } else if (isArray(configOrFields)) {
    configOrFields = {input: configOrFields};
  }

  let {input} = configOrFields;

  const {distinct, skipFirst} = configOrFields;

  return (target: OnInputChangeClass, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    // check for needed setup
    if (!target._inputChanges) {
      target._inputChanges = {};

      let originalOnChange: (changes: SimpleChanges) => void;

      if (target.ngOnChanges !== undefined) {
        originalOnChange = target.ngOnChanges;
      }

      if (isFunction(originalOnChange) === false) {
        throw new Error(`${target.constructor.name} is using "@InputChanged()" but doesn't implement "ngOnChanges"`);
      }

      // create Observable for simpleChanges
      target.ngOnChanges = function (changes: SimpleChanges): void {
        forEach(keys(changes), (inputKey: string) => {
          if (has(target._inputChanges, inputKey)) {
            const change: SimpleChange = changes[inputKey];
            if (!change.firstChange || !skipFirst) {
              if (!distinct || change.currentValue !== change.previousValue) {
                (get(target._inputChanges, inputKey) as OnInputChangeFunction).call(this, change);
              }
            }
          }
        });

        // call original
        if (originalOnChange) {
          originalOnChange.apply(this, [changes]);
        }
      };
    }

    // add input change map entry
    if (!input) {
      // try to get input from method name
      input = propertyKey.replace('Changed', '');
    }
    forEach(arrayify(input), (inputProp) => {
      target._inputChanges[inputProp] = descriptor.value;
    });
  };
}

export interface OnInputChangeClass extends OnChanges {
  _inputChanges: {[inputProperty: string]: OnInputChangeFunction};
}

export type OnInputChangeFunction = (currentValue?: any, previousValue?: any, firstChange?: boolean) => void;
