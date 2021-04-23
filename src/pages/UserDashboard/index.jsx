import React, { useEffect, useState } from 'react';
import { Spinner, Card, Button } from 'react-bootstrap';
import ptBR from 'date-fns/locale/pt-BR';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import Page from '../../components/Page';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const UserDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);

  const { name } = useAuth();

  const [booked, setBooked] = useState();

  const getAppointment = async () => {
    try {
      const response = await api.get('/appointments');
      setBooked(response.data);
    } catch (err) {
      if (!err?.response?.data?.message) {
        toast.error('Parece que temos um problema em nossos servidores :(');
      }
    }
    setLoading(false);
  };

  const handleClick = async () => {
    setCanceling(true);
    try {
      await api.delete(`/appointments/user/${booked.appointmentUser[0]}`);
      setBooked();
      toast.success('Agendamento cancelado com sucesso');
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          'Parece que temos um problema em nossos servidores :(',
      );
    }
    setCanceling(false);
  };

  useEffect(() => {
    getAppointment();
  }, []);

  return (
    <Page title="Área do Usuário" logOut>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {booked ? (
            <>
              <Card.Text>Bem vindo, {name}!</Card.Text>
              <Card.Text>
                Você possui um agendamento para o dia:{' '}
                <b>{format(parseISO(booked.date), 'Pp', { locale: ptBR })} </b>
              </Card.Text>
              <Card.Text>
                Deseja cancelar o agendamento da sua vacina?
              </Card.Text>
              <Button
                disable={canceling}
                variant="danger"
                onClick={handleClick}
              >
                {canceling ? (
                  <Spinner size="sm" animation="border" />
                ) : (
                  'Cancelar'
                )}
              </Button>
            </>
          ) : (
            <>
              <Card.Text>
                Você não possui nenhum agendamento para vainação marcado.
              </Card.Text>
              <Card.Text>Clique no botão abaixo para marcar:</Card.Text>
              <Button as={Link} to="/userAppointment">
                Marcar
              </Button>
            </>
          )}
        </>
      )}
    </Page>
  );
};

export default UserDashboard;
