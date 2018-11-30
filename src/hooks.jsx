import React, { useEffect, useState } from 'react';
import * as R from 'ramda';

import * as U from './utils';

// Composition: Server side safe use event

export const useEvent = R.curry((base, type, fn) => useEffect(() => {
  global[base] && global[base].addEventListener(type, fn);
  global[base] && fn();
  return () => global[base] && global[base].removeEventListener(type, fn);
}, []));

// Composition: Prebound use events with time controlling

export const useResize = R.pipe(U.debounce(100), useEvent('window', 'resize'));
export const useScroll = R.pipe(U.throttle(100), useEvent('document', 'scroll'));

// Composition: Use viewport size

const toViewportSize = () => ({
  width: global.window && window.innerWidth || 320,
  height: global.window && window.innerHeight || 480,
});

export const useViewportSize = () => {
  const [val, set] = useState(toViewportSize);
  useResize(R.pipe(toViewportSize, set));
  return val;
};

// Composition: Use viewport position

const toViewportPos = () => ({
  y: global.window && window.scrollY || 0,
  x: global.window && window.scrollX || 0,
});

export const useViewportPos = () => {
  const [val, set] = useState(toViewportPos);
  useResize(R.pipe(toViewportPos, set));
  useScroll(R.pipe(toViewportPos, set));
  return val;
};

// Composition: Animatable show hide inline style

export const useShowHide = (delay, init = false) => {
  const [pre, setPre] = React.useState(init);
  const [post, setPost] = React.useState(init);

  const toggle = () => {
    setPre(R.not);
    setTimeout(() => setPost(R.not), delay);
  };

  const set = (val) => {
    setPre(val);
    setTimeout(() => setPost(val), delay);
  };

  const style = {
    display: pre ? '' : post ? '' : 'none',
    opacity: pre ? 1  : post ? 0  : 0,
  };

  return {
    style,
    toggle,
    set,
    value: pre,
  };
};
