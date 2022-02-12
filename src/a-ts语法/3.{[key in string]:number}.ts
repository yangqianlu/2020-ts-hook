export { }
type T1 = { [key: string]: null };
type T2 = {[key in string]: null};

// type T1opt = {[key: string]?: null}; // invalid syntax
type T2opt = { [key in string]?: null };

type T3 = {[key: string]: null};
type T4 = {[key in string]: null};

const t1: T3 = {'foo': null, 10: null};
const t2: T4 = {'foo': null, 10: null};

type S1 = keyof T3; // string | number
type S2 = keyof T4; // string

const s1: S1 = 10;
// const s2: S2 = 10; // error