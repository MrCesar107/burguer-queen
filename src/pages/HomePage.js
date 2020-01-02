import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import { menuActions, itemActions } from '../actions';

// Components
import Navbar from '../components/Navbar';
import { ItemCard } from '../components';
import { ActionButton } from '../components';
import { Chcekbox } from '../components';

class HomePage extends Component {
  constructor(props) {
    super(props);


    this.state = {
      menu: {
        name: '',
        items: new Map,
      },
      submitted: false,
      checkedItems: new Map,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getMenus();
    this.props.getItems();
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { menu } = this.state;

    this.setState({
      menu: {
        ...menu,
        [name]: value
      }
    });
  }

  handleCheckboxChange(e) {
    const { name, checked, value } = e.target;
    const { menu } = this.state



    this.setState(prevState => (
      {
        menu: {
          ...menu,
          items: prevState.menu.items.set(name, checked)
        },
        checkedItems: prevState.checkedItems.set(name, checked)
      }
    ));
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { menu } = this.state
    let menuItems = []

    if(menu.name && menu.items) {
      menu.items.forEach((key, value) => {
        key &&
          menuItems.push({ id: value })
      });

      this.setState({
        menu: {
          items: menuItems
        }
      });

      menu.items = menuItems

      this.props.createMenu(menu);
    }

    this.setState({
      menu: {
        name: '',
        items: new Map,
      },
      submitted: false,
      checkedItems: new Map,
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
                                    key={item._id}
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
                              <Chcekbox
                                key={item._id}
                                name={item._id}
                                nameElement={item.name}
                                value={item._id}
                                checked={(this.state.checkedItems.get(item._id))}
                                onChange={this.handleCheckboxChange} />
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
