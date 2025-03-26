/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #medium #array #promise

  ### Question

  Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.

  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // expected to be `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```

  > View on GitHub: https://tsch.js.org/20
*/

/* _____________ Your Code Here _____________ */

declare function PromiseAll<const T extends any[]>(values: T): Promise<{
  [P in keyof T]: Awaited<T[P]>
}>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  // @ts-ignore ('cause [1, 2, number] is more specific (i.e. better) than [number, number, number])
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/20/answer
  > View solutions: https://tsch.js.org/20/solutions
  > More Challenges: https://tsch.js.org
*/

//////////////////////////////////////////////
// Different kinds of animals make different kinds of sounds
type DogConfig = { volume: number };
type CatConfig = { pitch: number };

// Each animal knows how to make its specific sound with its config
type DogPlugin = {
  type: "dog";
  config: DogConfig;
  implementation: {
    makeSound: (config: DogConfig) => string; // Returns "Woof" with volume
  }
};

type CatPlugin = {
  type: "cat";
  config: CatConfig;
  implementation: {
    makeSound: (config: CatConfig) => string; // Returns "Meow" with pitch
  }
};

type AnimalPlugin = DogPlugin | CatPlugin;
type AnimalType = AnimalPlugin["type"];

// Registry of all our animals
type AnimalRegistry = {
  [P in AnimalType]: AnimalPlugin;
}

class AnimalSoundMaker {
  animals: AnimalRegistry = {
    dog: {
      type: "dog",
      config: { volume: 5 },
      implementation: {
        makeSound: (config: DogConfig) => `Woof at volume ${config.volume}`
      }
    },
    cat: {
      type: "cat",
      config: { pitch: 3 },
      implementation: {
        makeSound: (config: CatConfig) => `Meow at pitch ${config.pitch}`
      }
    }
  };

  makeSound(type: AnimalType) {
    const animal = this.animals[type];
    // Error: Type 'DogConfig | CatConfig' is not assignable to parameter of type 'DogConfig & CatConfig'
    // But we know a dog's implementation expects DogConfig
    // and a cat's implementation expects CatConfig
    return animal.implementation.makeSound(animal.config);
  }
}
