import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { waiterActions } from '../actions';
import M from 'materialize-css';

class Navbar extends Component {
  componentDidMount() {
      let elem = document.querySelector('.sidenav');
      M.Sidenav.init(elem, {});
  }

  render() {
    return(
      <React.Fragment>
        <nav className="Navbar">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo center Navbar--brand">
              Burguer Queen
            </Link>
            { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
            <button
              className="Navbar--menu-button sidenav-trigger show-on-medium-and-up"
              data-target="slide-out"
              type="button">
              <i className="material-icons center">menu</i>
            </button>
          </div>
        </nav>
        <ul id="slide-out" className="sidenav fixed">
          <li>
            <div className="user-view">
              <div className="background">
                <img
                  src="https://www.recipetineats.com/wp-content/uploads/2016/02/Beef-Hamburgers_7-2-500x375.jpg"
                  alt="menu-background" />
              </div>
              <span className="white-text name">User name</span>
              <span className="white-text email">user@email.com</span>
            </div>
          </li>
          <li>
            <Link to="/" className="waves-effect sidenav-close">Menus</Link>
          </li>
          <li>
            <Link to="/orders"
                  className="waves-effect sidenav-close">Orders</Link>
          </li>
          <li>
            <Link to="/items"
                  className="waves-effect sidenav-close">Products</Link>
          </li>
          <li><div className="divider"></div></li>
          <li>
            <Link to="/logout"
                  onClick={waiterActions.logout}
                  className="waves-effect sidenav-close">
              Log out
            </Link>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Navbar;
