import * as _ from 'lodash';

export function InputFlag() {
  return (target, inputPropertyKey: string) => {
    const randomIndex: string =
      _.uniqueId('InputFlag') + '_' + inputPropertyKey;

    // get original setup of input and remove it from the object

    const originalInput: PropertyDescriptor = Object.getOwnPropertyDescriptor(
      target,
      inputPropertyKey
    );

    delete target[inputPropertyKey];

    // define new setup of input

    Object.defineProperty(target, inputPropertyKey, {
      get(): boolean {
        return originalInput ? originalInput.get() : this[randomIndex];
      },

      set(value: boolean): void {
        value = value !== false;

        if (originalInput) {
          originalInput.set(value);
        } else {
          this[randomIndex] = value;
        }
      }
    });
  };
}
