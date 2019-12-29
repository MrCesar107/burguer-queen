import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from './helpers';
import { alertActions } from './actions';
import { PrivateRoute } from './components';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    history.listen((locatio, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;

    return(
      <div></div>
    );
  }
}

export default App;
