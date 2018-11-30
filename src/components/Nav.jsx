import * as React from 'react';
import * as R from 'ramda';
import MoveTo from 'moveto';
import { setConfig } from 'react-hot-loader';

import logo from '../img/logo-dark.svg';
import stack from '../img/stack.svg';
import * as U from '../utils';
import * as H from '../hooks';

const moveTo = new MoveTo({ tolerance: 48 });
setConfig({ pureSFC: true });

// Constants

const linkList = [
  { key: 'Menu', title: 'MENY' },
  { key: 'Booking', title: 'BOKA BORD' },
];

// Components

const Seperator = () =>
  <p className="Nav-bar-seperator">|</p>;


const toLink = cb => props => (
  <button
    type="button"
    key={props.key}
    className="Nav-link"
    onClick={() => cb(props.key)}
  >
    {props.title}
  </button>
);

const Stack = props => (
  <svg {...props} className="Nav-bar-stack" viewBox="0 0 512 512" fill={props.dark ? '#000' : '#fff'}>
    <path d="M432 176H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 96H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 96H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16z" />
  </svg>
);

// Composition

const moveToId = (id) => {
  const el = document && document.getElementById(id);
  moveTo.move(el);
};

const Nav = () => {
  const menuStore = H.useShowHide(200);
  const vPos = H.useViewportPos();
  const vSize = H.useViewportSize();

  // console.log(vSize.width)

  const isOnMobile = vSize.width < 500;
  const isOnCover = vPos.y < vSize.height - 48;
  const darkStack = menuStore.value || !isOnCover;

  if (menuStore.value && !isOnMobile) {
    menuStore.set(false);
  }

  const withTrans = name => name + (isOnCover ? ' trans' : ' opaque');
  const onLogoClick = () => !isOnCover && moveTo.move(document && document.body);
  const onLinkClick = (id) => {
    moveToId(id);
    menuStore.set(false);
  };

  const links = R.map(toLink(onLinkClick), linkList);
  const barLinks = U.intersperseComponent(Seperator, links);

  console.log(vPos.y, vSize.height);

  return [
    <div key="mobile" className="Nav-mobile" style={menuStore.style}>{links}</div>,
    <div key="stack" className={withTrans('Nav-bar')}>
      <img
        alt="logo"
        className={withTrans('Nav-bar-logo')}
        src={logo}
        onClick={onLogoClick}
      />
      {isOnMobile ? (
        <Stack dark={darkStack} onClick={menuStore.toggle} />
      ) : (
        <div className="Nav-bar-links">
          {barLinks}
        </div>
      )}
    </div>,
  ];
};

export default Nav;
