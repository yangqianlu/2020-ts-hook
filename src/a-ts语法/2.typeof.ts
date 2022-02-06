export { }

function toArray(x: number): number[] {
     return [x]
 }

type Func = typeof toArray; // -> (x: number) => number[]
 


interface Person {
    name: string;
    age: number;
}

const sem: Person = { name: "semlinker", age: 30}
type Sem = typeof sem; // type Sem = Person