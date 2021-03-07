import { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../routes/Home";
import { Archive } from "../routes/Archive";
import { Project } from "../routes/Project";
import { AppNav } from "./AppNav";
import { AppFooter } from "./AppFooter";
import { UnknownRoute } from "../routes/UnknownRoute";
import { User } from "../routes/User";
import { Search } from "../routes/Search";

export class App extends Component {
  render() {
    return (
      <Fragment>
        <AppNav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/project">
            <Project />
          </Route>
          <Route path="/archive">
            <Redirect to="/project/archive" />
          </Route>
          <Route exact path="/project/archive">
            <Archive />
          </Route>
          <Route exact path="/project/data">
            TODO
          </Route>
          <Route exact path="/project/partners">
            TODO
          </Route>
          <Route exact path="/login">
            <User />
          </Route>
          <Route exact path="/signup">
            <User />
          </Route>
          <Route exact path="/search">
            TODO Empty search.
          </Route>
          <Route path="/search/:query" component={Search} />
          <Route exact path="/imprint">
            TODO
          </Route>
          <Route exact path="/privacy">
            TODO
          </Route>
          <Route>
            <UnknownRoute />
          </Route>
        </Switch>
        <AppFooter />
      </Fragment>
    );
  }
}
