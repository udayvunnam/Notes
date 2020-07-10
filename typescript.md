# Typescript Gotchas

- [Typescript Gotchas](#typescript-gotchas)
  - [Configuration & linting](#configuration--linting)
  - [Compile](#compile)
  - [Compilation steps](#compilation-steps)
  - [Declaration files](#declaration-files)
    - [Built-in](#built-in)
    - [External](#external)
      - [_Bundled with the library_](#bundled-with-the-library)
      - [_Not included with library_](#not-included-with-library)
      - [_No type definitions of any kind_](#no-type-definitions-of-any-kind)
  - [Declaration merging](#declaration-merging)
  - [Useful types](#useful-types)
  - [Useful links](#useful-links)
    Use [TS playground](https://www.typescriptlang.org/play/index.html) that compiles TS to JS with varying configuration setup

## Configuration & linting

- tsconfig.json - compiler configuration, root files, include/exclude files
- (deprecated)used to have a separate tslint.json - [Now it is just a eslint plugin](https://github.com/palantir/tslint/issues/4534)

## Compile

- .ts ---(tsc)---> .d.ts + .js
- ts-node: easy way to run ts files without any configuration or compiling to js
- typescript vs babel

## Compilation steps

- do type checking (typescript)
- strip type annotations(babel/typescript)
- transform modern JS(or JSX) to the relevant version(babel/typescrpit)

JSX modes: preserve, react, and react-native. The preserve mode will keep the JSX as part of the output to be further consumed by another transform step (e.g. Babel).

## Declaration files

### Built-in

standard built-in types are shipped along with the compiler (Math, Object, document, event, function etc.)

- dom
- different ES versions

### External

#### _Bundled with the library_

- tsc generated `*.d.ts` alongside js file or provide root types path under package.json
- usage: just import library that is written in typescript.
- Ex: [apollo-client](https://github.com/apollographql/apollo-client), [react-query](https://github.com/tannerlinsley/react-query)

```bash
npm i apollo-boost @apollo/react-hooks redux
```

#### _Not included with library_

- import corresponding @types as dev dependency.
- Provided in [DefinitelyTyped/@types](https://github.com/DefinitelyTyped/DefinitelyTyped)
- Ex: [@types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react)
- [Search easily](https://aka.ms/types)

```bash
npm i react react-redux
npm i -D @types/react @types/react-redux @types/node
```

#### _No type definitions of any kind_

- types not available for the library. We need to declare the API of library that is exposed.

```javascript
// simple no time
declare module "module-without-types";
// want to declare types
declare module "module-without-types" {
    export function foo(p: string): string;
    export interface Bar{
      ...
    }
}
```

- use [dts-gen](https://github.com/microsoft/dts-gen) to generate definition files for any js library

```bash
dts-gen -m yargs
```

- Use [JSON to typescript](https://marketplace.visualstudio.com/items?itemName=MariusAlchimavicius.json-to-ts)

## Declaration merging

- Module Augmentation: If third party libraries have incompatible types or no types
- Global Augmentation: Add additional typing to global scope

```javascript
const initialState = window.__INITIAL_DATA__

type InitialData = {
  userID: string;
};

declare global {
  interface Window {
    __INITIAL_DATA__: InitialData;
  }
}
```

## Useful types

- **Partial**

```typescript
type Partial<T> = {
  [K in keyof T]?: T[K]
}

type PartialWithNewMember<T> = {
  [K in keyof T]: T[K]
} && {id: string}
```

- **Readonly**

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

- **Pick & Omit**

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Omit a single property:
type OmitA = Omit<Test, "a">; // Equivalent to: {b: number, c: boolean}

// Or, to omit multiple properties:
type OmitAB = Omit<Test, "a" | "b">; // Equivalent to: {c: boolean}
```

- **Record**

```typescript
export type LevelStr = "info" | "warn" | "error";
export type LevelNum = 1 | 2 | 3 | 999;

export const Levels: Record<LevelStr | "none", LevelNum> = {
  info: 1,
  warn: 2,
  error: 3,
  none: 999,
};
```

- **Combined Types**

```typescript
type PowerUser = Omit<User & Admin, "type"> & {
  type: "powerUser";
};
```

- **Generics**

```typescript
type ApiResponse<T> = (
    {
        status: 'success';
        data: T;
    } |
    {
        status: 'error';
        error: string;
    }
);

ApiResponse<Admin[]>
ApiResponse<number>
```

- **Computed properties**

```typescript
type Keys = "firstname" | "surname";

type DudeType = {
  [key in Keys]: string;
};

const test: DudeType = {
  firstname: "uday",
  surname: "vunnam",
};
```

- **Interfaces vs types - What to use?** [discussion1](https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types), [discussion2](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c), [discussion3](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#types-or-interfaces)

## Useful links

- <https://github.com/typescript-cheatsheets/react-typescript-cheatsheet>
- <https://basarat.gitbook.io/typescript/tsx>
- <https://www.staging-typescript.org/docs/handbook/generics.html>
- <https://microsoft.github.io/TypeScript-New-Handbook/outline/>
- <https://medium.com/@martin_hotell/react-typescript-and-defaultprops-dilemma-ca7f81c661c7>
