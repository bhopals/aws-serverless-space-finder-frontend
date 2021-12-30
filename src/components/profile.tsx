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
  state: ProfileState = {
    userAttributes: [],
  };

  async componentDidMount() {
    if (this.props.user) {
      const userAttrs =
        (await this.props.authService.getUserAttributes(this.props.user)) || [];
      this.setState({ userAttributes: userAttrs });
    }
  }

  private renderUserAttributes() {
    const rows = [];
    for (const userAttr of this.state.userAttributes) {
      rows.push(
        <tr key={userAttr.Name}>
          <td>{userAttr.Name}</td>
          <td>{userAttr.Value}</td>
        </tr>
      );
    }
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  render() {
    let profileSpace;
    console.log("this.props>", this.props);
    if (this.props.user) {
      profileSpace = (
        <div>
          <h3>Hello {this.props.user.userName}</h3>
          Here are your attributes
          {this.renderUserAttributes()}
        </div>
      );
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
