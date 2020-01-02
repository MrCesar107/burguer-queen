import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import { orderActions, itemActions } from '../actions';

// Components
import Navbar from '../components/Navbar';
import { OrderCard } from '../components';
import { ActionButton } from '../components';
import { Checkbox } from '../components';

class OrdersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {
        items: new Map,
        total: '',
      },

      submitted: false,
      checkedItems: new Map,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getOrders();
    this.props.getItems();
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { order } = this.state;

    this.setState({
      order: {
        ...order,
        [name]: value
      }
    });
  }

  handleCheckboxChange(e) {
    const { name, checked } = e.target;
    const { order } = this.state

    this.setState(prevState => (
      {
        order: {
          ...order,
          items: prevState.order.items.set(name, checked)
        },
        checkedItems: prevState.checkedItems.set(name, checked)
      }
    ));
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { order } = this.state
    let orderItems = []

    if(order.total && order.items) {
      order.items.forEach((key, value) => {
        key &&
          orderItems.push({ id: value })
      });

      this.setState({
        order: {
          items: orderItems
        }
      });

      order.items = orderItems

      this.props.createOrder(order);
    }

    this.setState({
      order: {
        items: new Map,
        total: '',
      },
      submitted: false,
      checkedItems: new Map,
    });
  }

  render() {
    const { orders, items } = this.props;
    const { order, submitted } = this.state;

    return(
      <div className="App">
        <Navbar />
        <div className="Orders container">
          <div className="row">
            <div className="col s12">
              <h1 className="Orders--title">Orders</h1>
            </div>
            <div className="row">
              <div className="col s12 Orders--orders">
                <div className="row">
                  {
                    orders.orders &&
                      orders.orders.orders.map((order, index) => {
                        return(
                          <React.Fragment>
                            <div className="col s4">
                              <OrderCard
                                name={`Order: #${index + 1}`}
                                waiter="Unknow waiter" />
                            </div>
                          </React.Fragment>
                        );
                      })
                  }
                  <ActionButton />
                  <div id="modal" className="modal">
                    <div className="modal-content">
                      <h4 className="Modal--title">New order</h4>
                      <div className="divide"></div>
                      <div className="Modal--form">
                        <div className="row">
                          <form className="col s12" onSubmit={this.handleSubmit}>
                            <div className="Form--options">
                              <div className="row">
                                <div className="input-field">
                                  <input type="number"
                                        id="total"
                                        name="total"
                                        value={order.total}
                                        onChange={this.handleChange} />
                                  <label htmlFor="total">Total ammount</label>
                                </div>
                                {
                                  items.items &&
                                    items.items.map((item) => {
                                      return(
                                        <Checkbox
                                          key={item._id}
                                          name={item._id}
                                          nameElement={item.name}
                                          value={item._id}
                                          checked={(this.state.checkedItems.get(item._id))}
                                          onChange={this.handleCheckboxChange} />
                                      );
                                    })
                                }
                              </div>
                            </div>
                            <button
                              className="btn waves-effect waves-light Form--button right"
                              type="submit"
                              name="submit">
                              Create order
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
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
  const { orders, items } = state;
  return { orders, items };
}

const actionCreators = {
  getOrders: orderActions.getAll,
  getItems: itemActions.getAll,
  createOrder: orderActions.createOrder,
  updateOrder: orderActions.updateOrder,
  deleteOrder: orderActions.deleteOrder,
};

const connectedOrdersPage = connect(mapState, actionCreators)(OrdersPage);

export { connectedOrdersPage as OrdersPage };
