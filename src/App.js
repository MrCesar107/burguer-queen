import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from './helpers';
import { alertActions } from './actions';
import { PrivateRoute } from './components';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

// Pages
import { HomePage,
         LoginPage,
         RegisterPage,
         OrdersPage,
         ItemsPage,
       } from './pages';

class App extends Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props

    return(
      <div id="App">
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute exact path="/orders" component={OrdersPage} />
            <PrivateRoute exact path="/items" component={ItemsPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Redirect from="*" to="/" />
            <Redirect from="/logout" to="/login" />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
}

const connectedApp = connect(mapState, actionCreators)(App);

export { connectedApp as App };
