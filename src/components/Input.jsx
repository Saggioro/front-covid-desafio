import React from 'react';
import { Form } from 'react-bootstrap';

const Input = ({ label, id, ...rest }) => {
  return (
    <Form.Group>
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <Form.Control id={id} {...rest} />
    </Form.Group>
  );
};

export default Input;
