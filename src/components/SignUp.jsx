import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button, Spinner } from 'react-bootstrap';
import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Input from './Input';
import api from '../services/api';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(new Date());
  const history = useHistory();
  const validate = values => {
    const errors = {};

    if (!values.cpf) {
      errors.cpf = 'Obrigatório*';
    } else if (values.cpf.length !== 11) {
      errors.cpf = 'Precisa ter 11 caracteres';
    }
    if (!values.password) {
      errors.password = 'Obrigatório*';
    } else if (values.password.length < 3) {
      errors.password = 'Precisa ter pelo menos 3 caracteres';
    }
    if (!values.name) {
      errors.name = 'Obrigatório*';
    } else if (values.name.length < 5) {
      errors.name = 'Precisa ter pelo menos 5 caracteres';
    }
    if (!values.birth) {
      errors.birth = 'Obrigatório*';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      cpf: '',
      password: '',
      birth: new Date(),
    },
    validate,
    onSubmit: async values => {
      setLoading(true);
      try {
        const formated = format(formik.values.birth, 'yyyy-MM-dd');
        await api.post('/users', { ...values, birth: formated });
        toast.success('Usuário cadastrado com sucesso');
        history.push('/');
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            'Parece que temos um problema em nossos servidores :(',
        );
      }
      setLoading(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        id="name"
        type="text"
        placeholder="Insira o nome"
        label="Nome"
        value={formik.name}
        onChange={formik.handleChange}
        isValid={!formik.errors.name}
        isInvalid={!!formik.errors.name}
        error={formik.errors.name}
      />
      <Input
        id="cpf"
        as="input"
        type="text"
        placeholder="Insira o cpf"
        label="CPF"
        value={formik.cpf}
        onChange={formik.handleChange}
        isValid={!formik.errors.cpf}
        isInvalid={!!formik.errors.cpf}
        error={formik.errors.cpf}
      />

      <Input
        id="password"
        type="password"
        placeholder="Insira a senha"
        label="Senha"
        value={formik.password}
        onChange={formik.handleChange}
        isValid={!formik.errors.password}
        isInvalid={!!formik.errors.password}
        error={formik.errors.password}
      />
      <Form.Group>
        <Form.Text>Data de nascimento</Form.Text>
        <DatePicker
          id="birth"
          onChange={date => {
            formik.setFieldValue('birth', date);
            setStart(date);
          }}
          selected={start}
          dateFormat="dd/MM/yyyy"
          locale={ptBR}
          maxDate={new Date()}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </Form.Group>

      <Button disable={loading} variant="primary" type="submit">
        {loading ? <Spinner size="sm" animation="border" /> : 'Entrar'}
      </Button>
    </Form>
  );
};

export default SignUp;
