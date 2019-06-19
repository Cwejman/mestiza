import * as React from 'react';

import Header from './Header';

const Info = ({ info }) => [
  <Header id="Info" key="header-conctact" title="INFO" src="/img/wide2.jpg" />,
  <div className="Info" key="info">
    {info.split('\n').map(line => (
      <p className="Info-line">{line}</p>
    ))}
  </div>,
];

export default Info;
