import React from 'react'
import { v4 } from 'uuid';
import { compose, map, prop } from 'ramda';

import { toChildren } from '../utils';

// Components

const Menus = ({ children }) => (
  <div className='menus' key='menus'>
    {children}
  </div>
);

const Menu = ({ children }) => (
  <div className='menu' key={v4()}>
    {children}
  </div>
);

const Dish = ({ price, name }) => (
  <div className='dish' key={name}>
    <p>{name}</p>
    <p>{price}</p>
  </div>
);

// Composition: Export

const toMenu = compose(Menu, toChildren, map(Dish), prop('dishes'));

const toMenus = compose(Menus, toChildren, map(toMenu), prop('menus'));

export default toMenus;
