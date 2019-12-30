import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { waiterActions } from '../actions';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waiter: {
        name: '',
        lastName: '',
        email: '',
        employeeNumber: '',
        password: '',
        password2: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { waiter } = this.state;

    this.setState({
      waiter: {
        ...waiter,
        [name]: value,
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { waiter } = this.state;
    
    if(waiter.name && waiter.lastName && waiter.email && waiter.password &&
       waiter.employeeNumber && waiter.password2) {
      this.props.register(waiter);
    }
    else {
      console.log(waiter.waiter);
    }
  }

  render() {
    const { registering } = this.props;
    const { waiter, submitted } = this.state;

    return (
      <div className="App--form-container container">
        <div className="row">
          <div className="col s2" />
          <div className="col s8">
            <div className="Card card-panel">
              <h1 className="Card--title">Burguer Queen</h1>
              <h2 className="Card--subtitle">Sign up</h2>
              <div className="container Form">
                <div className="row">
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="col s6">
                        <div className="input-field">
                          <input
                            name="name"
                            id="name"
                            type="text"
                            value={waiter.name}
                            className="validate"
                            onChange={this.handleChange} />
                          <label htmlFor="name">Name</label>
                        </div>
                      </div>
                      <div className="col s6">
                        <div className="input-field">
                          <input
                            name="lastName"
                            id="lastName"
                            type="text"
                            value={waiter.lastName}
                            className="validate"
                            onChange={this.handleChange} />
                          <label htmlFor="lastName">Last name</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s6">
                        <div className="input-field">
                          <input
                            name="email"
                            id="email"
                            type="email"
                            value={waiter.email}
                            className="validate"
                            onChange={this.handleChange} />
                          <label htmlFor="email">Email</label>
                          <span className="helper-text"
                                data-error="Email is  invalid" />
                        </div>
                      </div>
                      <div className="col s6">
                        <div className="input-field">
                          <input
                            name="employeeNumber"
                            id="employeeNumber"
                            type="text"
                            value={waiter.employeeNumber}
                            className="validate"
                            onChange={this.handleChange} />
                          <label htmlFor="employeeNumber">Employee number</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s6">
                        <div className="input-field">
                          <input
                            name="password"
                            id="password"
                            type="password"
                            value={waiter.password}
                            className="validate"
                            onChange={this.handleChange} />
                          <label htmlFor="password">Password</label>
                        </div>
                      </div>
                      <div className="col s6">
                        <div className="input-field">
                          <input
                            name="password2"
                            id="password2"
                            type="password"
                            value={waiter.password2}
                            className="validate"
                            onChange={this.handleChange} />
                          <label htmlFor="password2">Confirm password</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s6">
                        <button
                          className="btn waves-effect waves-light Form--button"
                          type="submit"
                          name="submit">
                          Register
                          <i className="material-icons right">send</i>
                        </button>
                      </div>
                      <div className="col s6">
                        <Link to='/login'>
                          <button
                            className="btn waves-effect waves-light Form--button"
                            type="button"
                            name="login">
                            Sign in
                            <i className="material-icons right">person</i>
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="">
                      <div className="col s12">
                        <ul className="Form--errors">
                          {
                            submitted && !waiter.name &&
                              <li>
                                Name is required
                              </li>
                          }
                          {
                            submitted && !waiter.lastName &&
                              <li>
                                Last name is required
                              </li>
                          }
                          {
                            submitted && !waiter.email &&
                              <li>
                                Email is required
                              </li>
                          }
                          {
                            submitted && !waiter.employeeNumber &&
                              <li>
                                Employee number is required
                              </li>
                          }
                          {
                            submitted && !waiter.password &&
                              <li>
                                Password is required
                              </li>
                          }
                          {
                            submitted && !waiter.password2 &&
                              <li>
                                Please, confirm password
                              </li>
                          }
                        </ul>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col sm2" />
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering }
}

const actionCreators = {
  register: waiterActions.register,
};

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);

export { connectedRegisterPage as RegisterPage };
