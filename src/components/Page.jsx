import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Page = ({ title, children }) => {
  return (
    <Container fluid>
      <Card className="mt-10">
        <Card.Header>
          <Card.Title>{title}</Card.Title>
        </Card.Header>
        <Card.Body>{children}</Card.Body>
      </Card>
    </Container>
  );
};
export default Page;
