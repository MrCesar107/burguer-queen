import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { waiterActions } from '../actions';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.props.logout();

    this.state = {
      email: '',
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
    const { loggingIn } = this.props;
    const { email, password, submitted } = this.state;

    return(
      <div className="app valign-wrapper">
        <div className="App--form-container container">
          <div className="row">
            <div className="col s2" />
            <div className="col s8">
              <div className="Card card-panel">
                <h1 className="Card--title">Burguer Queen</h1>
                <h2 className="Card--subtitle">Log In</h2>
                <div className="container Form">
                  <div className="row">
                    <form className="col s12" onSubmit={this.handleSubmit}>
                      <div className="input-field">
                        <input
                          name="email"
                          id="email"
                          type="email"
                          value={email}
                          className="validate"
                          onChange={this.handleChange} />
                        <label htmlFor="email">Email</label>
                        <span className="helper-text"
                              data-error="Email is  invalid" />
                      </div>
                      <div className="input-field">
                        <input
                          name="password"
                          id="password"
                          type="password"
                          value={password}
                          className="validate"
                          onChange={this.handleChange} />
                        <label htmlFor="password">Password</label>
                        <span className="helper-text"
                              data-error="Password is  required" />
                      </div>
                      <div className="row">
                        <div className="col s6">
                          <button
                            className="btn waves-effect waves-light Form--button"
                            type="submit"
                            name="submit">
                            Log in
                            <i className="material-icons right">send</i>
                          </button>
                        </div>
                        <div className="col s6">
                          <Link to='/register'>
                            <button
                              className="btn waves-effect waves-light Form--button"
                              type="button"
                              name="register">
                              Register
                              <i className="material-icons right">person_add</i>
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col s12">
                          <ul className="Form--errors">
                            { submitted && !email &&
                              <li>Email is required</li>
                            }
                            { submitted && !password &&
                              <li>Password is required</li>
                            }
                          </ul>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
