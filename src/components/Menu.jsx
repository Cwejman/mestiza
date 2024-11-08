import React, { Fragment } from 'react';

import Header from './Header';

//

export default ({ menus }) => (
  <>
    <Header id="Menu" title="MENY" src="/img/plate3.jpg"/>,
    <div className="Menus">
      {menus.map(({ dishes }, i) =>
        <Fragment key={i}>
          {i !== 0 && <p className="Menus-seperator">=</p>}
          <Menu dishes={dishes} key={i}/>
        </Fragment>
      )}
    </div>
  </>
);

//

const parseAlternatives = (list) => list
  .filter(alt => alt.name !== 'PLACEHOLDER')
  .map(alt => ({ ...alt, isAlternative: true }));

function Menu ({ dishes }) {
  const dishesAndAlternatives = dishes.reduce(
    (acc, { alternatives, ...dish }) => {
      console.log({ dish, alternatives, parsedAlt: parseAlternatives(alternatives) });
      return [...acc, dish, ...parseAlternatives(alternatives)];
    },
    [],
  );

  return (
    <div className="Menus-section">
      {dishesAndAlternatives.map((el, i) => (
        <Dish key={i} {...el} />
      ))}
    </div>
  );
}

//

function Dish ({ price, name, isAlternative }) {
  return (
    <div className={`Menus-dish${isAlternative ? ' alt' : ''}`} key={name}>
      {!isAlternative && <p className="Menus-dish-bullet">*</p>}
      <p className={`Menus-dish-name${isAlternative ? ' alt' : ''}`}>{name}</p>
      {price !== '123456' && price && (
        <p className="Menus-dish-price">
          {`${price}$`}
        </p>
      )}
    </div>
  );
}
