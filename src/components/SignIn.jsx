import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Input from './Input';
import api from '../services/api';

const SignIn = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      cpf: '',
      password: '',
    },
    onSubmit: async values => {
      try {
        const token = await api.post('/sessionsUser', values);
        console.log(token);
        history.push('/userAppointment');
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        id="cpf"
        as="input"
        min="1"
        type="number"
        placeholder="Insira o cpf"
        label="CPF"
        value={formik.values.cpf}
        onChange={formik.handleChange}
      />

      <Input
        id="password"
        type="password"
        placeholder="Insira a senha"
        label="Senha"
        value={formik.values.password}
        onChange={formik.handleChange}
      />

      <Button variant="primary" type="submit">
        Entrar
      </Button>
    </Form>
  );
};

export default SignIn;
