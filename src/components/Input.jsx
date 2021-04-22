import React from 'react';
import { Form, Col } from 'react-bootstrap';

const Input = ({ label, id, children, sm = '2', ...rest }) => {
  return (
    <Form.Group>
      <Col sm={sm}>
        <Form.Label htmlFor={id}>{label}</Form.Label>

        <Form.Control id={id} {...rest}>
          {children}
        </Form.Control>
      </Col>
    </Form.Group>
  );
};

export default Input;
