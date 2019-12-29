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
    const waiter = this.state;
    
    if(waiter.name && waiter.lastName && waiter.email && waiter.password &&
       waiter.password2) {
      this.props.register(waiter);
    }
  }

  render() {
    const { registering } = this.props;
    const { waiter, submitted } = this.state;

    return (
      <div>

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
