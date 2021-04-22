import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import ptBR from 'date-fns/locale/pt-BR';

import { toast } from 'react-toastify';
import { isEqual, parseISO, startOfDay, format } from 'date-fns';

import Input from '../../components/Input';
import Page from '../../components/Page';
import api from '../../services/api';

const UserAppointment = () => {
  const [start, setStart] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const getAppointments = async () => {
    try {
      const response = await api.get('/appointments/availability');

      const data = response.data.map(appoint => new Date(appoint.day));
      setSchedules(response.data);
      setDates(data);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <Page title="Agendamento">
      {dates.length > 0 ? (
        <Form>
          <Form.Text sm="2">Selecione um dia:</Form.Text>
          <DatePicker
            className="mb-3"
            selected={start}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            onChange={date => setStart(date)}
            includeDates={dates}
          />
          <Input id="hoursSelect" label="Selecione o horário:" as="select">
            <option value="">Escolha um horário...</option>
            {schedules
              .find(schedule =>
                isEqual(parseISO(schedule.day), startOfDay(start)),
              )
              .hours.map(hour => {
                return (
                  <option value={hour} key={hour}>
                    {format(new Date(hour), 'HH:mm')}
                  </option>
                );
              })}
          </Input>
        </Form>
      ) : (
        <h1>Loading</h1>
      )}
    </Page>
  );
};
export default UserAppointment;
