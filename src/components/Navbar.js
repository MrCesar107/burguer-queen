import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return(
      <React.Fragment>
        <nav className="Navbar">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo center Navbar--brand">
              Burguer Queen
            </Link>
            { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
            <a
              className="Navbar--menu-button sidenav-trigger show-on-medium-and-up"
              href="#"
              data-target="slide-out">
              <i className="material-icons center">menu</i>
            </a>
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
            <Link to="/logout" className="waves-effect">
              Log out
            </Link>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Navbar;
