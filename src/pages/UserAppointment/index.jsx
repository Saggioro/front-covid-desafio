import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';
import ptBR from 'date-fns/locale/pt-BR';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isEqual, parseISO, startOfDay, format } from 'date-fns';

import Input from '../../components/Input';
import Page from '../../components/Page';
import api from '../../services/api';

const UserAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      date: '',
    },
    onSubmit: async values => {
      setLoading(true);
      try {
        const formated = format(new Date(values.date), 'yyyy-MM-dd HH:mm');

        await api.post('/appointments', { date: formated });
        toast.success('Agendamento realizado com sucesso!');
        history.push('/userDashboard');
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      setLoading(false);
    },
  });

  const getAppointments = async () => {
    try {
      const response = await api.get('/appointments/availability');

      const data = response.data.map(appoint => new Date(appoint.day));
      setSchedules(response.data);
      setDates(data);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          'Parece que estamos com um problema em nossos servidores :(',
      );
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <Page title="Agendamento" logOut>
      {dates.length > 0 ? (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Text sm="2">Selecione um dia:</Form.Text>
          <DatePicker
            className="mb-3"
            selected={start}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            onChange={date => setStart(date)}
            includeDates={dates}
          />
          <Input
            id="date"
            label="Selecione o horário:"
            as="select"
            value={formik.values.date}
            onChange={formik.handleChange}
          >
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
          <Button disable={loading} type="submit">
            {loading ? <Spinner size="sm" animation="border" /> : 'Agendar'}
          </Button>
        </Form>
      ) : (
        <Spinner animation="border" />
      )}
    </Page>
  );
};
export default UserAppointment;
