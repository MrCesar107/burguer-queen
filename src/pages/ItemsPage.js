import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import { itemActions } from '../actions';

// Components
import Navbar from '../components/Navbar';
import { ItemCard } from '../components';
import { ActionButton } from '../components'

class ItemsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
        name: '',
        description: '',
        price: '',
        totalUnits: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getItems()
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { item } = this.state;

    this.setState({
      item: {
        ...item,
        [name]: value,
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { item } = this.state;

    if(item.name && item.description && item.price && item.totalUnits) {
     this.props.createItem(item);
    }

    this.setState({
      item: {
        name: '',
        description: '',
        price: '',
        totalUnits: '',
      },
      submitted: false,
    });
  }

  render() {
    const { items } = this.props;
    const { item, submitted } = this.state;
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
              {
                items.items &&
                  items.items.map((item) => {
                    return(
                      <div className="col s12 m4" key={item._id}>
                        <ItemCard
                          item={item}
                          name={item.name}
                          price={item.price} />
                      </div>
                    );
                  })
              }
              </div>
            </div>
          </div>
        </div>
        <ActionButton />
        <div id="modal" className="modal">
          <div className="modal-content">
            <h4 className="Modal--title">New item</h4>
            <div className="divider"></div>
            <div className="Modal--form">
              <div className="row">
                <form className="col s12" onSubmit={this.handleSubmit}>
                  <div className="input-field">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={item.name}
                      onChange={this.handleChange} />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="input-field">
                    <textarea
                      name="description"
                      id="description"
                      className="materialize-textarea"
                      value={item.description}
                      onChange={this.handleChange} />
                    <label htmlFor="description">Description</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="number"
                      id="price"
                      name="price"
                      step="any"
                      value={item.price}
                      onChange={this.handleChange} />
                    <label htmlFor="price">Price</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="number"
                      id="totalUnits"
                      name="totalUnits"
                      value={item.totalUnits}
                      onChange={this.handleChange} />
                    <label htmlFor="totalUnits">Total units</label>
                  </div>
                  <button
                    className="btn waves-effect waves-light Form--button right"
                    type="submit"
                    name="submit">
                    Create item
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapState(state) {
  const { items } = state;
  return { items };
}

const actionCreators = {
  getItems: itemActions.getAll,
  createItem: itemActions.createItem,
  updateItem: itemActions.updateItem,
  deleteItem: itemActions.deleteItem,
}

const connectedItemsPage = connect(mapState, actionCreators)(ItemsPage);

export { connectedItemsPage as ItemsPage };
