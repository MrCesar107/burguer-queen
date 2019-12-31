import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { waiterActions } from '../actions';

// Components
import Navbar from '../components/Navbar';
import { ItemCard } from '../components';

class HomePage extends Component {
  render() {
    return(
      <div className="app">
        <Navbar />
        <div className="Menu container">
          <div className="row">
            <div className="col s12">
              <h1 className="Menu--title">Menu name</h1>
            </div>
            <div className="row">
              <div className="col s12 Menu--items">
                <div className="row">
                  <div className="col s4">
                    <ItemCard name="Test" description="Testing" />
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
  const { authentication } = state;
  const { waiter } = authentication;
  return { waiter };
}

const actionCreators = {
  
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);

export { connectedHomePage as HomePage };


