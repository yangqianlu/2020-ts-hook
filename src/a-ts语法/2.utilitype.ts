import { type } from "os"

export { }
interface Aaa { 
  name: string,
  age: number
}

// 挑选出来属性
type Pi = Pick<Aaa, 'name'> // {name: string}

type Pa = Partial<Aaa> // {name?:string, age?:number}

// Exclude 第一个参数是一个联合类型
type Exclu = Exclude<keyof Aaa, 'name'> // 'age'


type Omi = Omit<Aaa, 'age'> // { name:string}

// 实现Partial
type PartialY<T> = {
  [P in keyof T]?:T[P]
}

// 实现Pick
type PickY<T, K extends keyof T> = {
  [P in K]: T[P]
}

//实现Exclude
type ExcludeY<T,U> = T extends U ? never : T;
