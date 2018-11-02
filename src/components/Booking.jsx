import * as React from 'react';
import * as R from 'ramda';

import Header from './Header';

const toEventVal = R.path(['target', 'value']);

const useFormInput = (init) => {
  const [value, setValues] = React.useState(init);
  return {
    value,
    onChange: R.compose(setValues, toEventVal),
  };
};

const Booking = () => {
  const date = useFormInput('1998-11-19');
  const time = useFormInput('06:06');
  const amount = useFormInput();
  const phone = useFormInput();

  return [
    <Header title="BOKA BORD" src="/img/wide2.jpg" />,
    <div className="Booking" key="booking">
      <form className="Booking-form">
        <p className="Booking-label">Datum</p>
        <input type="date" {...date} />
        <p className="Booking-label">Tid</p>
        <input tpye="time" {...time} />
        <p className="Booking-label">Antal</p>
        <input type="number" min="1" max="9" {...amount} />
        <p className="Booking-label">Telefon-nr</p>
        <input type="tel" {...phone} />
      </form>
    </div>,
  ];
};

export default Booking;
