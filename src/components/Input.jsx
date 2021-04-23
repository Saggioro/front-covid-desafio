import React from 'react';
import { Form, Col } from 'react-bootstrap';

const Input = ({ label, id, children, error, ...rest }) => {
  return (
    <Col className="pl-0" xs={12} sm={6} md={5} lg={4} xl={3}>
      <Form.Group controlId={id}>
        <Form.Label>{label}</Form.Label>

        <Form.Control {...rest}>{children}</Form.Control>
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>
    </Col>
  );
};

export default Input;
