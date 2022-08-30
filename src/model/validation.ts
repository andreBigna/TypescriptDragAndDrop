import { Validatable } from "../interfaces/validatable";

export function validate(validatableObject: Validatable): boolean {
  let isValid = true;
  if (validatableObject.required) {
    isValid = isValid && validatableObject.value.toString().trim().length !== 0;
  }

  switch (typeof validatableObject.value) {
    case "string":
      if (validatableObject.minLength) {
        isValid =
          isValid &&
          validatableObject.value.length >= validatableObject.minLength;
      }
      if (validatableObject.maxLength) {
        isValid =
          isValid &&
          validatableObject.value.length <= validatableObject.maxLength;
      }
      break;
    case "number":
      if (validatableObject.min) {
        isValid = isValid && validatableObject.value >= validatableObject.min;
      }
      if (validatableObject.max) {
        isValid = isValid && validatableObject.value <= validatableObject.max;
      }
      break;

    default:
      break;
  }

  return isValid;
}
