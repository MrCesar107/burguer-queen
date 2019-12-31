import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Navbar from '../components/Navbar';
import { ItemCard } from '../components';

class ItemsPage extends Component {
  render() {
    return(
      <div className="App">
        <Navbar />
        <div className="Items container">
          <div className="row">
            <div className="col s12">
              <h1 className="Items--title">Products</h1>
            </div>
          </div>
          <div className="row">
            <div className="col s12 Items--items">
              <div className="row">
                <div className="col s4">
                  <ItemCard name="Test" description="Testing"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapState() {
}

function actionsCretor() {
}

const connectedItemsPage = connect(mapState, actionsCretor)(ItemsPage);

export { connectedItemsPage as ItemsPage };
