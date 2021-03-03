import { Component } from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  login,
  register,
  selectUsersError,
  selectUsersIsActive,
  selectUsersIsLoading,
} from "../store/users";
import { SignIn } from "../components/forms/SignIn";
import { SignUp } from "../components/forms/SignUp";

class ConnectedUser extends Component<ConnectedProps<typeof connector>> {
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col lg="6">
            <Card>
              <Card.Header>
                <Nav variant="tabs">
                  <LinkContainer to="/login" exact>
                    <Nav.Link>Sign in</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/signup" exact>
                    <Nav.Link>Sign up</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Switch>
                  <Route exact path="/login">
                    <SignIn
                      handleLogin={this.props.login}
                      error={this.props.error}
                      loading={this.props.loading}
                    />
                  </Route>
                  <Route exact path="/signup">
                    <SignUp
                      handleRegistration={this.props.register}
                      error={this.props.error}
                      loading={this.props.loading}
                    />
                  </Route>
                </Switch>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const connector = connect(
  (state: RootState) => ({
    isLoggedIn: selectUsersIsActive(state),
    error: selectUsersError(state),
    loading: selectUsersIsLoading(state),
  }),
  (dispatch: AppDispatch) => ({
    login: (nameOrEmail: string, password: string) => {
      dispatch(
        login({
          nameOrEmail,
          password,
        })
      );
    },
    register: (name: string, email: string, password: string) => {
      dispatch(
        register({
          name,
          email,
          password,
        })
      );
    },
  })
);

export const User = connector(ConnectedUser);
