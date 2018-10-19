import { addIndex, compose, map, intersperse, tap, applySpec, identity } from 'ramda';

export const trace = msg => tap(x => console.log(msg, x))

export const toChildren = applySpec({ children: identity });

export const intersperseComponent = Base => compose(
  addIndex(map)((x, i) => i % 2 ? x() : x),
  intersperse(Base),
);
