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
      <form className="Booking-form" data-netlify-honeypot="4bots" data-netlify="true">
        <p style={{ display: 'none' }}>
          <input name="4bots" type="hidden" />
        </p>
        <div className="Booking-row">
          <Input {...date} name="date" label="Datum" type="date" />
          <Input {...time} name="time" label="Tid" type="time" />
        </div>
        <div className="Booking-row">
          <Input {...name} name="name" label="För och efternamn" type="text" />
          <Input {...amount} name="people" label="Antal" type="number" min="1" max="6" />
        </div>
        <div className="Booking-row">
          <Input {...mail} name="mail" label="Mejl" type="email" />
          <Input {...phone} name="phone" label="Telefon-nr" type="tel" />
        </div>
        <button type="submit">Boka</button>
      </form>
    </div>,
  ];
};

export default Booking;
