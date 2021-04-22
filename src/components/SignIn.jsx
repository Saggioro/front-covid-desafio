import React from 'react';

import { Form, Button } from 'react-bootstrap';
import Input from './Input';

const SignIn = ({ password, cpf, onSubmit, handleChange }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        id="cpf"
        as="input"
        min="1"
        type="number"
        placeholder="Insira o cpf"
        label="CPF"
        value={cpf}
        onChange={handleChange}
      />

      <Input
        id="password"
        type="password"
        placeholder="Insira a senha"
        label="Senha"
        value={password}
        onChange={handleChange}
      />

      <Button variant="primary" type="submit">
        Entrar
      </Button>
    </Form>
  );
};

export default SignIn;
