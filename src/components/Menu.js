import React from 'react'
import { v4 } from 'uuid';
import * as R from 'ramda';

import * as U from '../utils';
import Header from './Header';

// Components

const Menus = ({ children }) => [
  <Header title="MENY" src="/img/plate2.jpg" />,
  <Sections children={children} />,
];

const Sections = ({ children }) => (
  <div className="Menus" key="menus">
    {children}
  </div>
);

const Section = ({ children }) => (
  <div className="Menus-section" key={'menu' + v4()}>
    {children}
  </div>
);

const Dish = ({ price, name, isAlternative }) => (
  <div className="Menus-dish" key={name}>
    {!isAlternative && <p className="Menus-dish-bullet">*</p>}
    <p className={'Menus-dish-name' + (isAlternative ? ' alt' : '')}>{name}</p>
    <p className="Menus-dish-price">{price} :-</p>
  </div>
);

const Seperator = () => (
  <div className="Menus-seperator" key={'seperator' + v4()} />
);

// Composition: Export

const toAlternative = R.assoc('isAlternative', true);
const ejectAlternatives = (xs, x) => R.concat(
  [...xs, x],
  R.map(toAlternative, x.alternatives || []),
);

const selectSectionChildren = R.compose(
  R.map(Dish),
  R.reduce(ejectAlternatives, []),
  R.prop('dishes'),
);

const toSection = R.compose(Section, U.toChildren, selectSectionChildren);

const selectMenusChildren = R.compose(
  U.intersperseComponent(Seperator),
  R.map(toSection),
  R.prop('menus'),
);

const toMenus = R.compose(Menus, U.toChildren, selectMenusChildren);

export default toMenus;
