export function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  //_ -> target
  //_2 -> methodName
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
