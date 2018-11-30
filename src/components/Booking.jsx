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

const Input = ({ label, ...rest }) => (
  <div className={`Booking-group ${label}`}>
    <p className="Booking-label">{label}</p>
    <input {...rest} />
  </div>
);

const Booking = () => {
  const date = useFormInput('1998-11-19');
  const time = useFormInput('06:06');
  const amount = useFormInput();
  const phone = useFormInput();
  const name = useFormInput();
  const mail = useFormInput();

  return [
    <Header id="Booking" key="header-booking" title="BOKA BORD" src="/img/wide2.jpg" />,
    <div className="Booking" key="booking">
      <form className="Booking-form" netlify-honeypot="4bots" netlify>
        <p style={{ display: 'none' }}>
          <input name="4bots" />
        </p>
        <div className="Booking-row">
          <Input {...date} label="Datum" type="date" />
          <Input {...time} label="Tid" type="time" />
        </div>
        <div className="Booking-row">
          <Input {...name} label="För och efternamn" type="text" />
          <Input {...amount} label="Antal" type="number" min="1" max="6" />
        </div>
        <div className="Booking-row">
          <Input {...mail} label="Mejl" type="email" />
          <Input {...phone} label="Telefon-nr" type="tel" />
        </div>
        <button type="submit">Boka</button>
      </form>
    </div>,
  ];
};

export default Booking;
