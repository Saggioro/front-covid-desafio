import React from 'react';
import { Container, Card, Button, Row } from 'react-bootstrap';

import { useAuth } from '../hooks/auth';

const Page = ({ title, logOut = false, children }) => {
  const { signOut } = useAuth();
  return (
    <Container style={{ minWidth: '280px' }}>
      <Card>
        <Card.Header>
          <Row className="d-flex justify-content-between">
            <Card.Title className="mt-10">{title}</Card.Title>

            {logOut && <Button onClick={signOut}>Sair</Button>}
          </Row>
        </Card.Header>

        <Card.Body>{children}</Card.Body>
      </Card>
    </Container>
  );
};
export default Page;
