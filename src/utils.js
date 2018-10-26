import * as R from 'ramda'

export const trace = msg => R.tap(x => console.log(msg, x))

export const toChildren = R.applySpec({ children: R.identity });

export const intersperseComponent = Base => R.compose(
  R.addIndex(R.map)((x, i) => i % 2 ? x() : x),
  R.intersperse(Base),
);
