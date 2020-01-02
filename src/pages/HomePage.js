import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import { menuActions, itemActions } from '../actions';

// Components
import Navbar from '../components/Navbar';
import { ItemCard } from '../components';
import { ActionButton } from '../components';

class HomePage extends Component {
  constructor(props) {
    super(props);


    this.state = {
      menu: {
        name: '',
        items: [],
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getMenus();
    this.props.getItems();
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }

  handleChange(e, optionID) {
    const { name, value, checked } = e.target;
    const { menu } = this.state;

    this.setState({
      menu: {
        ...menu,
        [name]: value,
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { menu } = this.state

    if(menu.name && menu.items) {
      this.props.createMenu(menu);
    }

    this.setState({
      menu: {
        name: '',
        items: [],
      },
      submitted: false,
    });
  }

  render() {
    const { menus, items } = this.props;
    const { menu, submitted } = this.state;

    return(
      <div className="App">
        <Navbar />
        <div className="Menu container">
          {
            menus.menus &&
              menus.menus.menus.map((menu) => {
                return(
                  <React.Fragment>
                    <div className="row">
                      <div className="col s12">
                        <h1 className="Menu--title">{ menu.name }</h1>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12 Menu--items">
                        <div className="row">
                          {
                            menus.menus.items.map((item) => {
                              return(
                                <div className="col s12 m4">
                                  <ItemCard
                                    name={item.name}
                                    price={item.price} />
                                </div>
                              );
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
          }
        </div>
        <ActionButton />
        <div id="modal" className="modal">
          <div className="modal-content">
            <h4 className="Modal--title">New menu</h4>
            <div className="divider"></div>
            <div className="Modal--form">
              <div className="row">
                <form className="col s12" onSubmit={this.handleSubmit}>
                  <div className="input-field">
                    <input 
                      type="text"
                      id="name"
                      name="name"
                      value={menu.name}
                      onChange={this.handleChange} />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="Form--options">
                    <div className="row">
                      {
                        items.items &&
                          items.items.map((item) => {
                            return(
                              <p>
                                <label>
                                  <input type="checkbox"
                                         name="items"
                                         value={item._id}
                                         onChange={e => this.handleChange(e, item._id)} />
                                  <span>{item.name}</span>
                                </label>
                              </p>
                            )
                          })
                      }
                    </div>
                  </div>
                  <button
                    className="btn waves-effect waves-light Form--button right"
                    type="submit"
                    name="submit">
                    Create menu
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { menus, items } = state;
  return { menus, items };
}

const actionCreators = {
  getMenus: menuActions.getAll,
  getItems: itemActions.getAll,
  createMenu: menuActions.createMenu,
  updateMenu: menuActions.updateMenu,
  deleteMenu: menuActions.deleteMenu,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);

export { connectedHomePage as HomePage };


