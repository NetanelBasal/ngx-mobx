import { autorun as mautorun } from 'mobx';
const META_DATA_KEY = '@@__disposers__@@';

/**
 * 
 * @param target 
 * @param _ 
 * @param descriptor 
 */
export function autorun( target, _, descriptor ) {
  const originalMethod = descriptor.value;

  descriptor.value = function ( args ) {
    const disposer = mautorun(() => {
      originalMethod.call(this, args);
    });
    let result = Reflect.getOwnMetadata(META_DATA_KEY, target) || [];
    result.push(disposer);
    Reflect.defineMetadata(META_DATA_KEY, result, target);
    return disposer;
  };

  return descriptor;
}

/**
 * 
 * @param fn 
 */
function isFunction( fn ) {
  return typeof fn === 'function';
}

/**
 * 
 * @param disposers 
 */
function __clean__( disposers ) {
  if(disposers && disposers.length) {
    disposers.forEach(d => typeof d === 'function' ? d() : false);
  }
}

/**
 * @deprecated use @CleanAutorun instead
 * @param target 
 */
export function Cleaner( target ) {
  const original = target.prototype.ngOnDestroy;

  if( !isFunction(original) ) {
    console.warn(`${target.name} is using @CleanAutorun but does not implement OnDestroy. (required for AOT)`);
  }

  target.prototype.ngOnDestroy = function () {
    const disposers = Reflect.getOwnMetadata(META_DATA_KEY, target.prototype);
    __clean__(disposers);
    Reflect.defineMetadata(META_DATA_KEY, [], target.prototype);
    isFunction(original) && original();
  }
}

/**
 * 
 * @param target 
 */
export function CleanAutorun(target) {
   return Cleaner(target);
}


export class MobxCleaner {
  ngOnDestroy() {
    const disposers = Reflect.getMetadata(META_DATA_KEY, this);
    __clean__(disposers);
  }
}