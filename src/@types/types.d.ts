// https://www.typescriptlang.org/docs/handbook/advanced-types.html
type Diff<T, U> = T extends U ? never : T; // Remove types from T that are assignable to U
type Filter<T, U> = T extends U ? T : never; // Remove types from T that are not assignable to U
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

// https://stackoverflow.com/questions/52703321/make-some-properties-optional-in-a-typescript-type
type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;

// Oh yeah!
type RequiredExceptFor<T, TOptional extends keyof T> = Pick<
  T,
  Diff<keyof T, TOptional>
> &
  Partial<T>;

// Oh yeah2!
type ModifyProperties<
  TOriginal,
  TNew extends { [key in keyof TOriginal]?: any }
> =
  //
  Pick<TOriginal, Diff<keyof TOriginal, keyof TNew>> &
    //
    Pick<TNew, Filter<keyof TNew, keyof TOriginal>>;

declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.jpg" {
  const value: any;
  export = value;
}

declare module "*.scss" {
  const value: any;
  export = value;
}
declare module "*.css" {
  const value: any;
  export = value;
}
declare module "*.css" {
  const value: any;
  export = value;
}

declare const scanner: any;
