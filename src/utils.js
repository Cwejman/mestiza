import { tap, applySpec, identity } from 'ramda';


export const trace = msg => tap(x => console.log(msg, x))

export const toChildren = applySpec({ children: identity });
