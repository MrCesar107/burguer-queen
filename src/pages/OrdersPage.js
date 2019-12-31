import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Navbar from '../components/Navbar';
import { OrderCard } from '../components';

class OrdersPage extends Component {
  render() {
    return(
      <div className="app">
        <Navbar />
        <div className="Menu container">
          <div className="row">
            <div className="col s12">
              <h1 className="Menu--title">Orders</h1>
            </div>
            <div className="row">
              <div className="col s12 Menu--items">
                <div className="row">
                  <div className="col s4">
                    <OrderCard name="Test" waiter="Waiter Test" />
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

}

const actionsCreator = {

};

const connectedOrdersPage = connect(mapState, actionsCreator)(OrdersPage);

export { connectedOrdersPage as OrdersPage };
