import * as React from 'react';
import * as R from 'ramda';

const toStyle = props => ({
  backgroundImage: `url(${props.src})`,
});

const Header = props => (
  <div className="Header" id={props.id} style={toStyle(props)}>
    <p className="Header-title">{props.title}</p>
  </div>
);

export default Header;
