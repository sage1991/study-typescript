import Constructable from "../types/Constructable";

interface GlobalValidationConfig {
  [className: string]: ClassValidationConfig;
}

interface ClassValidationConfig {
  [propertyName: string]: [Constraint, any][];
}

export enum Constraint {
  required = "required",
  minLength = "minLength",
  maxLength = "maxLength",
  minNumber = "minNumber",
  maxNumber = "maxNumber",
}

export default interface Validateable {
  validate(): boolean;
}

/**
 * [ GLOBAL_VALIDATION_CONFIG ]
 * - 여러 클래스들의 validatoin 정보를 담아 둘 객체
 */
const GLOBAL_VALIDATION_CONFIG: GlobalValidationConfig = {};


/**
 * [ autoValidate ]
 * - Class Decorator
 * - Validateable interface를 구현한 class에서 사용 가능
 * - 클래스 생성 시 Validateable interface의 validate method를 자동으로 호출
 * - validation에 통과하지 못할경우 파라미터로 넘긴 "errorMsg"로 exception 발생
 * 
 * @param errorMsg : exception 발생 시 보여 줄 메세지
 */
export function autoValidate(errorMsg: string) {
  return function <T extends Constructable<Validateable>>(targetClass: T) {
    let parentName = (targetClass as any).name;
    let childClass = class extends targetClass {
      constructor(...args: any[]) {
        super(...args);
        this.validate = validate.bind(this);
        if (!validate.call(this)) {
          throw new Error(errorMsg);
        }
      }
    };
    Object.defineProperty(childClass, "name", {
      value: parentName + Date.now(),
    });
    let childName = (childClass as any).name;
    if (GLOBAL_VALIDATION_CONFIG[parentName]) {
      GLOBAL_VALIDATION_CONFIG[childName] =
        GLOBAL_VALIDATION_CONFIG[parentName];
        delete GLOBAL_VALIDATION_CONFIG[parentName];
    }
    return childClass;
  };
}


export function required(
  target: any,
  propertyName: string
) {
  const className = target.constructor.name;
  _registerAtGlobalValidationConfig(className, propertyName, Constraint.required, true);
}


export function minLength(num: number) {
  return function (
    target: any,
    propertyName: string
  ) {
    const className = target.constructor.name;
    _registerAtGlobalValidationConfig(className, propertyName, Constraint.minLength, num);
  };
}


export function maxLength(num: number) {
  return function (
    target: any,
    propertyName: string
  ) {
    const className = target.constructor.name;
    _registerAtGlobalValidationConfig(className, propertyName, Constraint.maxLength, num);
  };
}


export function minNumber(num: number) {
  return function (
    target: any,
    propertyName: string
  ) {
    const className = target.constructor.name;
    _registerAtGlobalValidationConfig(className, propertyName, Constraint.minNumber, num);
  };
}


export function maxNumber(num: number) {
  return function (
    target: any,
    propertyName: string
  ) {
    const className = target.constructor.name;
    _registerAtGlobalValidationConfig(className, propertyName, Constraint.maxNumber, num);
  };
}


export function validate(this: Validateable): boolean {
  const classValidationConfig = _getClassValidationConfig(
    (this.constructor as any).name
  );
  let isValid = true;
  if (classValidationConfig) {
    for (const propertyName in classValidationConfig) {
      const constraintList = classValidationConfig[propertyName];
      const value = (this as any)[propertyName];
      for (const condition of constraintList) {
        switch (condition[0]) {
          case Constraint.required:
            isValid = isValid && !!value;
            break;
          case Constraint.minLength:
            isValid = isValid && value.length >= condition[1];
            break;
          case Constraint.maxLength:
            isValid = isValid && value.length <= condition[1];
            break;
          case Constraint.minNumber:
            isValid = isValid && value >= condition[1];
            break;
          case Constraint.maxNumber:
            isValid = isValid && value <= condition[1];
            break;
        }
      }
    }
  }
  return isValid;
}

function _getClassValidationConfig(className: string): ClassValidationConfig {
  return GLOBAL_VALIDATION_CONFIG[className];
}


function _registerAtGlobalValidationConfig(
  className: string,
  propName: string,
  constraint: Constraint,
  value: any
) {
  if (GLOBAL_VALIDATION_CONFIG[className]) {
    GLOBAL_VALIDATION_CONFIG[className] = {
      ...GLOBAL_VALIDATION_CONFIG[className],
      [propName]: [
        ...(GLOBAL_VALIDATION_CONFIG[className][propName] ?? []),
        [constraint, value],
      ],
    };
  } else {
    GLOBAL_VALIDATION_CONFIG[className] = {
      [propName]: [[constraint, value]],
    };
  }

}