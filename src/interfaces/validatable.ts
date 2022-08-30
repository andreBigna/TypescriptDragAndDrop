export interface Validatable {
    value: string | number;
    required?: boolean | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    min?: number | undefined;
    max?: number | undefined;
  }