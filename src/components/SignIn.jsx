import React from 'react';

import { Form, Button, Spinner } from 'react-bootstrap';
import Input from './Input';

const SignIn = ({
  password,
  cpf,
  onSubmit,
  handleChange,
  errors,
  isLoading,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        id="cpf"
        as="input"
        type="text"
        placeholder="Insira o cpf"
        label="CPF"
        value={cpf}
        onChange={handleChange}
        isValid={!errors.cpf}
        isInvalid={!!errors.cpf}
        error={errors.cpf}
      />

      <Input
        id="password"
        type="password"
        placeholder="Insira a senha"
        label="Senha"
        value={password}
        onChange={handleChange}
        isValid={!errors.password}
        isInvalid={!!errors.password}
        error={errors.password}
      />

      <Button disable={isLoading} variant="primary" type="submit">
        {isLoading ? <Spinner size="sm" animation="border" /> : 'Entrar'}
      </Button>
    </Form>
  );
};

export default SignIn;
