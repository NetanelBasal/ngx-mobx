import { Observable } from 'rxjs/Observable';
import { computed } from 'mobx';
console.log(44)
/**
 * 
 * 
 * @export
 * @template T 
 * @param {() => T} expression 
 * @returns {Observable<T>} 
 */
export function fromMobx<T>( expression: () => T, invokeImmediately: boolean = true) : Observable<T> {

  return new Observable(observer => {
    const computedValue = computed(expression);
    const disposer = computedValue.observe(changes => {
      observer.next(changes.newValue);
    }, invokeImmediately);

    return () => {
      disposer && disposer();
    }

  });
}