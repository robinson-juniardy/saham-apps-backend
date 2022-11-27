export type TMethods = "get" | "post" | "put" | "patch" | "delete";
export type TPropsOf<T> = keyof T;
export type GenericClassDecorator<T> = (target: T) => void;
