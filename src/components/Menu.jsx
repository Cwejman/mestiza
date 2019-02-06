import React from 'react';
import { v4 } from 'uuid';
import * as R from 'ramda';

import * as H from '../hooks';
import * as U from '../utils';
import Header from './Header';

// Components

const Menus = ({ catering, normal }) => {
  const [onCatering, toogleOnCatering] = H.useBool()

  return [
    <Header key="header-menu" id="Menu" title="MENY" src="/img/plate3.jpg" />,
    <Sections key="sections">
      <CateringSwitch onClick={toogleOnCatering} value={onCatering} />
      {onCatering ? catering : normal}
    </Sections>,
  ];
};

const CateringSwitch = ({ value, onClick }) => (
  <div className="Menus-section-cateringSwitch">
    <div className="Menus-cateringSwitch" onClick={onClick}>
      <div className={`Menus-cateringSwitch-el${value ? ' off' : ' on'}`}>Vanlig</div>
      <div className={`Menus-cateringSwitch-el${value ? ' on' : ' off'}`}>Catering</div>
    </div>
  </div>
);

const Sections = ({ children }) => (
  <div className="Menus" key="menus">
    {children}
  </div>
);

const Section = ({ children }) => (
  <div className="Menus-section" key={`menu${v4()}`}>
    {children}
  </div>
);

const Dish = ({ price, name, isAlternative }) => (
  <div className={`Menus-dish${isAlternative ? ' alt' : ''}`} key={name}>
    {!isAlternative && <p className="Menus-dish-bullet">*</p>}
    <p className={`Menus-dish-name${isAlternative ? ' alt' : ''}`}>{name}</p>
    {price !== '123456' && (
      <p className="Menus-dish-price">
        {`${price}$`}
      </p>
    )}
  </div>
);

const Seperator = () => (
  <p className="Menus-seperator" key={`seperator${v4()}`}>=</p>
);

// Composition: Export

const toAlternative = R.assoc('isAlternative', true);
const ejectAlternatives = (xs, x) => R.concat(
  [...xs, x],
  R.map(toAlternative, x.alternatives || []),
);

const alternativesPlaceholder = [{ name: 'PLACEHOLDER', price: '123456' }]

const selectSectionChildren = R.compose(
  R.map(Dish),
  R.reduce(ejectAlternatives, []),
  R.map(R.evolve({
    alternatives: R.when(R.equals(alternativesPlaceholder), x => []),
  })),
  R.prop('dishes'),
);

const toSection = R.compose(Section, U.toChildren, selectSectionChildren);

const toMenuChildren = R.compose(
  U.intersperseComponent(Seperator),
  R.map(toSection),
);

const toMenuProps = R.applySpec({
  normal: R.pipe(R.prop('menus'), toMenuChildren),
  catering: R.pipe(R.prop('menusCatering'), toMenuChildren),
});
const toMenus = R.compose(Menus, toMenuProps);

export default toMenus;
