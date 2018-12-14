import * as React from 'react';
import * as R from 'ramda';

export const inspect = (tag, f) => (...args) => {
  console.log(tag, 'args:', R.clone(args));
  const res = f(...args);
  console.log(tag, 'res:', R.clone(res));
  return res;
};

export const trace = msg => R.tap(x => console.log(msg, x));

export const toChildren = R.applySpec({ children: R.identity });

export const intersperseComponent = R.curry((Base, list) => R.compose(
  R.addIndex(R.map)((Comp, i) => (i % 2 ? <Comp key={i} /> : Comp)),
  R.intersperse(Base),
)(list));

export const debounce = R.curry((time, fn) => {
  let timeout;

  return (...args) => {
    const functionCall = () => fn.apply(this, args);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
});

export const throttle = R.curry((delay, fn) => {
  let lastCall = 0;
  return (...args) => {
    const now = (new Date).getTime();

    if (now - lastCall < delay) {
      return;
    }

    lastCall = now;
    return fn(...args);
  };
});
