import { Component } from "react";
import { Link } from "react-router-dom";
import { User, UserAttributes } from "../model/Model";
import { AuthService } from "../services/AuthService";

interface ProfileState {
  userAttributes: UserAttributes[];
}

interface ProfileProps {
  user: User | undefined;
  authService: AuthService;
}
export class Profile extends Component<ProfileProps, ProfileState> {
  render() {
    let profileSpace;
    console.log("this.props>", this.props);
    if (this.props.user) {
      profileSpace = <h3>Hello {this.props.user}</h3>;
    } else {
      profileSpace = (
        <div>
          Please <Link to="/login">Login</Link>
        </div>
      );
    }
    return (
      <div>
        <br />
        Welcome to the profile page
        <br />
        {profileSpace}
      </div>
    );
  }
}
