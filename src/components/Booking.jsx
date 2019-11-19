import * as React from 'react';

import Header from './Header';

const bookingLink = 'https://module.lafourchette.com/sv_SE/module/566299-f811d';

const Booking = () => [
  <Header id="Booking" key="header-booking" title="BOKA BORD" src="/img/wide2.jpg" />,
  <div className="Booking" key="booking">
    {/* <script type="text/javascript" src="https://module.lafourchette.com/sv_SE/js/horizontal/566299-f811d" /> */}
    {/* <script type="text/javascript" src="https://module.lafourchette.com/sv_SE/js/vertical/566299-f811d" /> */}
    {/* <script type="text/javascript" src="https://module.lafourchette.com/sv_SE/js/button/566299-f811d" /> */}
    <button onClick={() => window.open(bookingLink)}>Gå till bokningtjänst</button>
  </div>,
];

export default Booking;
