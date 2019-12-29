import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { waiterActions } from '../actions';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.props.logout();

    this.state = {
      username: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;

    if(email && password) {
      this.props.login(email, password);
    }
  }

  render() {
    const { loggedIn } = this.props;
    const { email, password, submitted } = this.state;

    return(
      <div>
      </div>
    );
  }
}

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionsCreators = {
  login: waiterActions.login,
  logout: waiterActions.logout,
};

const connectedLoginPage = connect(mapState, actionsCreators)(LoginPage);

export { connectedLoginPage as LoginPage };
