import * as React from 'react';

import Header from './Header';

const Contact = ({ number, address }) => [
  <Header id="Contact" key="header-conctact" title="KONTAKT" src="/img/wide2.jpg" />,
  <div className="Contact" key="contact">
    <p className="Contact-line">{number}</p>
    <p className="Contact-line">{address}</p>
  </div>,
];

export default Contact;
