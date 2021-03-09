import { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const FeaturedTeaser: FunctionComponent = () => {
  return (
    <Card key="teaser">
      <Card.Body>
        <Card.Title>Want to see more?</Card.Title>
        <Card.Text>Search for field names in your village.</Card.Text>
        <LinkContainer to="/search">
          <Card.Link>Find more</Card.Link>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};
