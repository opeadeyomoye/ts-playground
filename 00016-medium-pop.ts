/*
  16 - Pop
  -------
  by Anthony Fu (@antfu) #medium #array

  ### Question

  > TypeScript 4.0 is recommended in this challenge

  Implement a generic `Pop<T>` that takes an Array `T` and returns an Array without it's last element.

  For example

  ```ts
  type arr1 = ['a', 'b', 'c', 'd']
  type arr2 = [3, 2, 1]

  type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
  type re2 = Pop<arr2> // expected to be [3, 2]
  ```

  **Extra**: Similarly, can you implement `Shift`, `Push` and `Unshift` as well?

  > View on GitHub: https://tsch.js.org/16
*/

/* _____________ Your Code Here _____________ */

type Pop<T extends any[]> = T extends [...infer Rest, infer Last] ? [...Rest] : []

// extra
type Shift<T extends any[]> = T extends [infer First, ...infer Rest] ? [...Rest] : []
type Push<T extends any[], N> = T extends [...infer M]
  ? N extends any[]
    ? [...M, ...N]
    : [...M, N]
  : []
type Unshift<T extends any[], N> = T extends [...infer M]
  ? N extends any[]
    ? [...N, ...M]
    : [N, ...M]
  : []

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>,
  // extra cases
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>,
  Expect<Equal<Shift<[]>, []>>,

  Expect<Equal<Push<[3, 2, 1], 56>, [3, 2, 1, 56]>>,
  Expect<Equal<Push<['a', 'b', 'c'], 'f'>, ['a', 'b', 'c', 'f']>>,
  Expect<Equal<Push<[], [undefined, 2, '3']>, [undefined, 2, '3']>>,

  Expect<Equal<Unshift<[3, 2, 1], 252>, [252, 3, 2, 1]>>,
  Expect<Equal<Unshift<['a', 'b', 'c'], false>, [false, 'a', 'b', 'c']>>,
  Expect<Equal<Unshift<[1], [undefined, 2, '3']>, [undefined, 2, '3', 1]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/16/answer
  > View solutions: https://tsch.js.org/16/solutions
  > More Challenges: https://tsch.js.org
*/
