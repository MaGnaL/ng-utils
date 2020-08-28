import {toNumber, uniqueId} from 'lodash';

export function InputNumber() {
  return (target, inputPropertyKey: string) => {
    const randomIndex: string = uniqueId('InputNumber') + '_' + inputPropertyKey;

    // get original setup of input and remove it from the object

    const originalInput: PropertyDescriptor = Object.getOwnPropertyDescriptor(target, inputPropertyKey);

    delete target[inputPropertyKey];

    // define new setup of input

    Object.defineProperty(target, inputPropertyKey, {
      get(): number {
        return originalInput ? originalInput.get() : this[randomIndex];
      },

      set(value: string | number): void {
        value = toNumber(value);

        if (originalInput) {
          originalInput.set(value);
        } else {
          this[randomIndex] = value;
        }
      },
    });
  };
}
