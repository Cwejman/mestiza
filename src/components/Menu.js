import React from 'react'
import { v4 } from 'uuid';
import { assoc, reduce, concat, compose, map, prop } from 'ramda';

import { toChildren, intersperseComponent } from '../utils';

// Components

const Menus = ({ children }) => (
  <div className='menus' key='menus'>
    {children}
  </div>
);

const Menu = ({ children }) => (
  <div className='menu' key={'menu' + v4()}>
    {children}
  </div>
);

const Dish = ({ price, name, isAlternative }) => (
  <div className='dish' key={name}>
    {!isAlternative && <p className='mark bullet'>*</p>}
    <p className={'mark name' + (isAlternative ? ' alt' : '')}>{name}</p>
    <p className='mark price'>{price} :-</p>
  </div>
);

const Seperator = () => (
  <div className='seperator' key={'seperator' + v4()} />
);

// Composition: Export

const toAlternative = assoc('isAlternative', true);
const ejectAlternatives = (xs, x) => concat(
  [...xs, x],
  map(toAlternative, x.alternatives || []),
);

const selectMenuChildren = compose(
  map(Dish),
  reduce(ejectAlternatives, []),
  prop('dishes'),
);

const toMenu = compose(Menu, toChildren, selectMenuChildren);

const selectMenusChildren = compose(
  intersperseComponent(Seperator),
  map(toMenu),
  prop('menus'),
);

const toMenus = compose(Menus, toChildren, selectMenusChildren);

export default toMenus;
