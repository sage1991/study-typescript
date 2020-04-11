



/**
 * ex)
 * "ClassName" : {
 *   "field1" : [Constraint.Required, Constraint.NotNull],
 *   "field2" : [Constraint.Positive]
 * } 
 */

interface ValidatorConfig {
  [className:string] : {
    [validatableProperty:string] : Constraint[]
  };
}

enum Constraint {
  Required,
  Positive
}

export const registeredValidators:ValidatorConfig = {};


// decorator
export function Required(target:any, propName:string) : void {
  const className = target.constructor.name;
  let classValidationConfig = registeredValidators[className];
  if(classValidationConfig) {
    classValidationConfig = {
      ...classValidationConfig,
      [propName] : [
        ...classValidationConfig[propName] ?? [],
        Constraint.Required
      ]
    }
  } else {
    classValidationConfig = {
      [propName] : [Constraint.Required]
    }
  }
  registeredValidators[className] = classValidationConfig;
}

// decorator
export function Positive(target:any, propName:string) : void {
  const className = target.constructor.name;
  let classValidationConfig = registeredValidators[className];
  if(classValidationConfig) {
    classValidationConfig = {
      ...classValidationConfig,
      [propName] : [
        ...classValidationConfig[propName] ?? [],
        Constraint.Positive
      ]
    }
  } else {
    classValidationConfig = {
      [propName] : [Constraint.Positive]
    }
    
  }
  registeredValidators[className] = classValidationConfig;
}

// validation function
export function validate(obj:any) : boolean {
  
  const className = obj.constructor.name;
  const classValidationConfig = registeredValidators[className];
  let isValid = true;

  if(classValidationConfig) {
    for(const propertyName in classValidationConfig) {
      const constraintList = classValidationConfig[propertyName];
      for(const constraint of constraintList) {
        switch(constraint) {
          case Constraint.Required : 
            isValid = isValid && !!obj[propertyName];
            break;
          case Constraint.Positive : 
            isValid = isValid && obj[propertyName] > 0;
            break;
        }
      }
    }
  }

  return isValid;
}