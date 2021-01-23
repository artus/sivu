export const CAN_NOT_BE_NULL = (subject: string): string => `${subject} can not be null.`;
export const CAN_NOT_BE_NEGATIVE = (subject: string): string => `${subject} can not be negative.`;
export const CAN_NOT_BE_EMPTY = (subject: string): string => `${subject} can not be empty.`;
export const CAN_NOT_BE_LESS_THAN = (min: number, subject: string): string => `${subject} can not be less than ${min}.`;