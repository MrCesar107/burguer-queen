import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { waiterActions } from '../actions';

class HomePage extends Component {
  render() {
    return(
      <div>

      </div>
    );
  }
}

function mapState(state) {
  const { authentication } = state;
  const { waiter } = authentication;
  return { waiter };
}

const actionCreators = {
  
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);

export { connectedHomePage as HomePage };


