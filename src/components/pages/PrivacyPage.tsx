import { FunctionComponent } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

export const PrivacyPage: FunctionComponent = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Alert variant="warning">
            This is a conceptual development app. Later, you would find a
            privacy policy here. The developer is not a lawyer ⚖️😉
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};
