/*
  1383 - Camelize
  -------
  by Denis (@denchiklut) #hard #union #recursion

  ### Question

  Implement Camelize which converts object from snake_case to to camelCase

  ```ts
  Camelize<{
    some_prop: string,
    prop: { another_prop: string },
    array: [{ snake_case: string }]
  }>

  // expected to be
  // {
  //   someProp: string,
  //   prop: { anotherProp: string },
  //   array: [{ snakeCase: string }]
  // }
  ```

  > View on GitHub: https://tsch.js.org/1383
*/

/* _____________ Your Code Here _____________ */

// utility type to "camelize" each object key we come across
type CamelizeKey<K extends keyof any> = K extends string
  ? K extends `${infer One}_${infer Two}`
    ? CamelizeKey<`${One}${Capitalize<Two>}`>
    : K
  : K

// type test = CamelizeKey<'some_rather_long_snake_case_key_to_test_with'>

/**
 * since there's a bit of round-tripping, we explicitly name this "CamelizeObj"
 * so it's clear when we're working on an object literal vs. an array
 */
type CamelizeObj<T extends { [key: PropertyKey]: any }> = {
  //
  [K in keyof T as CamelizeKey<K>]: T[K] extends any[]
    ? CamelizeArray<T[K]>
    : T[K] extends { [key: PropertyKey]: any } ? CamelizeObj<T[K]> : T[K]
}

type CamelizeArray<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...CamelizeArray<First>, ...CamelizeArray<Rest>]
    : First extends { [key: PropertyKey]: any }
      ? [CamelizeObj<First>, ...CamelizeArray<Rest>]
      : [First, ...CamelizeArray<Rest>]
  : []

type Camelize<T> = T extends any[]
  ? CamelizeArray<T>
  : T extends { [key: PropertyKey]: any }
    ? CamelizeObj<T>
    : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,

  // also works directly on arrays
  Expect<Equal<
    Camelize<[
      { snake_case: string },
      { another_element: { yet_another_prop: string } },
      { yet_another_element: string },
    ]>,
    [
      { snakeCase: string },
      { anotherElement: { yetAnotherProp: string } },
      { yetAnotherElement: string },
    ]>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1383/answer
  > View solutions: https://tsch.js.org/1383/solutions
  > More Challenges: https://tsch.js.org
*/
