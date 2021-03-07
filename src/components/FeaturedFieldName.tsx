import { Component } from "react";
import { Card } from "react-bootstrap";
import { FieldNameSnippet, FieldNameType } from "../model";
import { LinkContainer } from "react-router-bootstrap";
import { FormattedDate } from "react-intl";

export class FeaturedFieldName extends Component<{
  snippet: FieldNameSnippet;
}> {
  typeToString(type: FieldNameType): string {
    if (type === FieldNameType.Map) {
      return "Map";
    } else if (type === FieldNameType.Marking) {
      return "Marking";
    } else {
      return "Unknown type";
    }
  }

  render() {
    return (
      <Card key={this.props.snippet.id}>
        <Card.Body>
          <Card.Title>{this.props.snippet.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Last updated{" "}
            <FormattedDate value={this.props.snippet.creation.date} />.
          </Card.Subtitle>
          <Card.Text>{this.typeToString(this.props.snippet.type)}</Card.Text>
          <LinkContainer to={`/details/${this.props.snippet.id}`}>
            <Card.Link>Details</Card.Link>
          </LinkContainer>
        </Card.Body>
      </Card>
    );
  }
}
