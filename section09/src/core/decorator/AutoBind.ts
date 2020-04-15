

// bound context of function autometically
export default function autoBind(
  _target: any,
  _methodName: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  return {
    configurable : descriptor.configurable,
    enumerable : descriptor.enumerable,
    get() {
      return descriptor.value.bind(this);
    }
  }
}
