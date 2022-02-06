// keyof 将所有的健取出来组成联合类型
export { }

interface Aaa {
  name: string,
  age:number
}
type A = keyof Aaa; // "name" | "age"
let a: A = "age"


