import { autorun as mautorun } from 'mobx';
import 'reflect-metadata';

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

function isFunction( fn ) {
  return typeof fn === 'function';
}

function __clean__( disposers ) {
  disposers.forEach(d => typeof d === 'function' ? d() : false);
}

/**
 * 
 * @param target 
 */
export function Cleaner( target ) {
  const original = target.prototype.ngOnDestroy;

  if( !isFunction(original) ) {
    console.warn(
      `If you want @cleaner to work with AOT, ${target.name} should 
      implement OnDestroy even if empty`);
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