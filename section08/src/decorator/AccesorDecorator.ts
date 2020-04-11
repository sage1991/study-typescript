
/**
 * [Accessor Decorator]
 * - decorator for getter or setter 
 */


function Log(target:any, propertyName: string, descriptor:PropertyDescriptor) {
  console.log("Log", target, propertyName, descriptor);
}