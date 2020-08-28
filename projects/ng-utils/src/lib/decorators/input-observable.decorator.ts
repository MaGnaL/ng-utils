import {replace, uniqueId} from 'lodash';
import {Observable, ReplaySubject} from 'rxjs';

interface SubjectAndObservable {
  observable: Observable<any>;
  subject: ReplaySubject<any>;
}

type ComponentSubjectsAndObservables = Map<string, SubjectAndObservable>;

const subjectsAndObservables = new WeakMap<Object, ComponentSubjectsAndObservables>();

const getComponentSubjectsAndObservables = (instance: Object): ComponentSubjectsAndObservables => {
  const componentSubjectsAndObservables: ComponentSubjectsAndObservables = subjectsAndObservables.get(instance);
  if (componentSubjectsAndObservables) {
    return componentSubjectsAndObservables;
  }
  const newComponentSubjectsAndObservables: ComponentSubjectsAndObservables = new Map();
  subjectsAndObservables.set(instance, newComponentSubjectsAndObservables);
  return newComponentSubjectsAndObservables;
};

const getSubjectAndObservable = (instance: Object, propertyKey: string): SubjectAndObservable => {
  const componentSubjectsAndObservables = getComponentSubjectsAndObservables(instance);
  const subjectAndObservable = componentSubjectsAndObservables.get(propertyKey);
  if (subjectAndObservable) {
    return subjectAndObservable;
  }
  const subject = new ReplaySubject<any>(1);
  const newSubjectAndObservable = {
    observable: subject.asObservable(),
    subject,
  };
  componentSubjectsAndObservables.set(propertyKey, newSubjectAndObservable);
  return newSubjectAndObservable;
};

export function InputObservable() {
  return (target, observablePropertyKey: string) => {
    const inputPropertyKey: string = replace(observablePropertyKey, '$', '');

    const randomId: string = uniqueId('inputobs') + '_' + inputPropertyKey;

    // define setup for observable version of input
    Object.defineProperty(target, observablePropertyKey, {
      get(): Observable<any> {
        return getSubjectAndObservable(this, randomId).observable;
      },
    });

    // get original setup of input (non-observable) and remove it from the object
    const originalInput: PropertyDescriptor = Object.getOwnPropertyDescriptor(target, inputPropertyKey);
    delete target[inputPropertyKey];

    // define new setup of input (non-observable)
    Object.defineProperty(target, inputPropertyKey, {
      get(): any {
        return originalInput ? originalInput.get() : this[randomId];
      },
      set(value: any): void {
        // overwrite setter ...
        if (originalInput) {
          originalInput.set(value);
        } else {
          this[randomId] = value;
        }

        getSubjectAndObservable(this, randomId).subject.next(value);
      },
    });
  };
}
