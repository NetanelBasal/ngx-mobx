import { Observable } from 'rxjs/Observable';
import { computed } from 'mobx';

/**
 * 
 * 
 * @export
 * @template T 
 * @param {() => T} expression 
 * @returns {Observable<T>} 
 */
export function fromMobx<T>( expression: () => T ) : Observable<T> {

  return new Observable(observer => {
    const computedValue = computed(expression);
    const disposer = computedValue.observe(changes => {
      observer.next(changes.newValue);
    }, true);

    return () => {
      disposer && disposer();
    }

  });
}