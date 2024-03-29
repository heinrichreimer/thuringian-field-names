import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { connect, ConnectedProps, Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { reportWebVitals } from "./reportWebVitals";
import { App } from "./components";
import { RootState, store, selectSettingsLocale } from "./store";
import { en, de } from "./translations";
import "./index.scss";

function loadLocaleData(locale: string) {
  switch (locale.split(/[-_]/)[0]) {
    case "de":
      return de;
    default:
      return en;
  }
}

class Root extends Component {
  render() {
    return (
      <React.StrictMode>
        <Provider store={store}>
          <ConnectedRootApp />
        </Provider>
      </React.StrictMode>
    );
  }
}

class RootApp extends Component<ConnectedProps<typeof connector>> {
  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        messages={loadLocaleData(this.props.locale)}
        key={this.props.locale}
      >
        <HashRouter>
          <App />
        </HashRouter>
      </IntlProvider>
    );
  }
}

const connector = connect((state: RootState) => ({
  locale: selectSettingsLocale(state),
}));

const ConnectedRootApp = connector(RootApp);

ReactDOM.render(<Root />, document.getElementById("root"));

// To measure performance, pass a function to send to an analytics endpoint: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
