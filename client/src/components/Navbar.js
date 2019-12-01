import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const renderName = () => {
    if (props.name === undefined) {
      return "Holidays Posts";
    }
    return `${props.name[0]} ${props.name[1]}`;
  };

  return (
    <React.Fragment>
      <nav className="navigation">
        <div className="nav-wrapper teal lighten-2">
          <div className="container">
            <a href="#" className="brand-logo left">
              {renderName()}
            </a>
            <ul className="right">
              <li>{props.name ? "" : <Link to="/login">Login</Link>}</li>
              <li>{props.name ? <Link to="/logout">Log out</Link> : ""}</li>
              <li>{props.name ? "" : <Link to="/">Sign up </Link>}</li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
