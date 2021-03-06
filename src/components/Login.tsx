import { Component, SyntheticEvent } from "react";
// import { useNavigate } from "react-router-dom";
import User from "../model/Model";
import { AuthService } from "../services/AuthService";

interface LoginProps {
  authService: AuthService;
  setUser: (user: User) => void;
}

interface LoginState {
  userName: string;
  password: string;
  loginAttempted: boolean;
  loginSuccessfull: boolean;
}

interface CustomEvent {
  target: HTMLInputElement;
}

export class Login extends Component<LoginProps, LoginState> {
  state: LoginState = {
    userName: "",
    password: "",
    loginAttempted: false,
    loginSuccessfull: false,
  };

  private navigate: any;
  private setUserName(event: CustomEvent): void {
    this.setState({ userName: event.target.value });
  }

  private setPassword(event: CustomEvent): void {
    this.setState({ password: event.target.value });
  }

  private async handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    this.setState({ loginAttempted: true });
    const result = await this.props.authService.login(
      this.state.userName,
      this.state.password
    );
    if (result) {
      this.setState({ loginSuccessfull: true });
      this.props.setUser(result);
      // useNavigate()("/profile"); //TODO - need to push this in functional component
    } else {
      this.setState({ loginSuccessfull: false });
    }
  }

  render() {
    let loginMessage: any;
    if (this.state.loginAttempted) {
      if (this.state.loginSuccessfull) {
        loginMessage = <label>Login successful</label>;
      } else {
        loginMessage = <label>Login failed</label>;
      }
    }

    return (
      <div className="login-container">
        <h2>Please login</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            value={this.state.userName}
            onChange={(e) => this.setUserName(e)}
          />
          <br />
          <input
            value={this.state.password}
            type="password"
            onChange={(e) => this.setPassword(e)}
          />
          <br />
          <input type="submit" value="Login" />
        </form>
        {loginMessage}
      </div>
    );
  }
}
