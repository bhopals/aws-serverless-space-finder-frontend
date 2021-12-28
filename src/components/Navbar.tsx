import { Component } from "react";
import { User } from "../model/Model";

export class Navbar extends Component<{
  user: User;
}> {
  render() {
    return <div>Welcome to the Home Page</div>;
  }
}
