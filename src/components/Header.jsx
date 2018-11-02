import * as React from 'react';
import * as R from 'ramda';

const toKey = R.compose(R.concat('header-'), R.prop('title'));
const toStyle = props => ({
  backgroundImage: `url(${props.src})`,
});

const Header = props => (
  <div className="Header" key={toKey(props)} style={toStyle(props)}>
    <p>{props.title}</p>
  </div>
);

export default Header;
