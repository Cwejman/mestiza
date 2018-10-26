import React from 'react'

import Header from './Header';

const Booking = props => [
  <Header title="BOKA BORD" src="/img/shift2.jpg" />,
  <div className="Booking" key="booking">
    <p>DateTime</p>
    <p>AmountPeopl</p>
    <p>PhoneNr</p>
  </div>
];

export default Booking;
