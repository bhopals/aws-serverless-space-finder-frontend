import { Component } from "react";
import { Link } from "react-router-dom";
import { User } from "../model/Model";

export class Navbar extends Component<{
  user: User | undefined;
}> {
  render() {
    let loginLogout: any;
    if (this.props.user) {
      loginLogout = (
        <Link to="/logout" style={{ float: "right" }}>
          {this.props.user.userName}
        </Link>
      );
    } else {
      loginLogout = (
        <Link to="/login" style={{ float: "right" }}>
          Login
        </Link>
      );
    }
    return (
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {loginLogout}
      </div>
    );
  }
}
