import moment from 'moment';
import * as React from 'react';
import * as R from 'ramda';

import Header from './Header';

const toEventVal = R.path(['target', 'value']);

const useFormInput = (trafo = x => x) => {
  const [value, setValue] = React.useState('');

  return {
    value,
    onChange: R.compose(setValue, toEventVal),
    onBlur: () => setValue(trafo(value)),
  };
};

const Input = ({ label, ...rest }) => (
  <div className={`Booking-group ${label}`}>
    <p className="Booking-label">{label}</p>
    <input {...rest} />
  </div>
);


const toInterpolDate = (minIsoDay, maxIsoDay) => date => {
  const now = moment();
  const input = moment(date);
  const next = now.isAfter(input) ? now : input;

  if (next.isoWeekday() < minIsoDay) return next.isoWeekday(minIsoDay).format('YYYY-MM-DD');
  if (next.isoWeekday() > maxIsoDay) return next.add(1, 'week').isoWeekday(minIsoDay).format('YYYY-MM-DD');
  return next.format('YYYY-MM-DD');
};

const roundMoment = (input) => {
  const rounded = Math.round(input.minute() / 15) * 15;
  return moment().minute(rounded).second(0);
};

const hourToDate = hour => `${hour}:00`;

const toInterpolTime = (minHour, maxHour) => (time) => {
  const min = moment(minHour, 'HH');
  const max = moment(maxHour, 'HH');
  const input = roundMoment(moment(time, 'HH:mm'));

  if (input.isBefore(min)) return min.format('HH:mm');
  if (input.isAfter(max)) return max.format('HH:mm');
  return input.format('HH:mm');
};

const dayMin = 2;
const dayMax = 6;
const hourMin = 16;
const hourMax = 20;

const Booking = () => {
  const interpolDate = toInterpolDate(dayMin, dayMax);
  const interpolTime = toInterpolTime(hourMin, hourMax);

  const timeMin = hourToDate(hourMin);
  const timeMax = hourToDate(hourMax);

  const date = useFormInput(interpolDate);
  const time = useFormInput(interpolTime);
  const amount = useFormInput();
  const phone = useFormInput();
  const name = useFormInput();
  const mail = useFormInput();

  return [
    <Header id="Booking" key="header-booking" title="BOKA BORD" src="/img/wide2.jpg" />,
    <div className="Booking" key="booking">
      <form className="Booking-form" name="booking" method="post" data-netlify-honeypot="4bots" data-netlify="true">
        <p style={{ display: 'none' }}>
          <input name="4bots" />
          <input type="hidden" name="form-name" value="booking" />
        </p>
        <div className="Booking-row">
          <Input {...date} name="date" label="Datum" type="date" />
          <Input {...time} min={timeMin} max={timeMax} name="time" label="Tid" type="time" />
        </div>
        <div className="Booking-row">
          <Input {...name} name="name" label="För och efternamn" type="text" />
          <Input {...amount} name="people" label="Antal" type="number" min="1" max="6" />
        </div>
        <div className="Booking-row">
          <Input {...mail} name="mail" label="Mejl" type="email" />
          <Input {...phone} name="phone" label="Telefon-nr" type="tel" />
        </div>
        <button type="submit">Skicka förfrågan</button>
      </form>
    </div>,
  ];
};

export default Booking;
