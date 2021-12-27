import { Component } from "react";
import { BooleanLiteral } from "typescript";
import { AuthService } from "../services/AuthService";

interface LoginProps {
  authService: AuthService;
}

interface LoginState {
  userName: string;
  password: string;
  loginAttempted: boolean;
  loginSuccessfull: boolean;
}

export class Login extends Component<LoginProps, LoginState> {
  state: LoginState = {
    userName: "",
    password: "",
    loginAttempted: false,
    loginSuccessfull: false,
  };
  render() {
    return (
      <div className="login-container">
        <h2>Please login</h2>
        <form>
          <input value={this.state.userName} />
          <br />
          <input value={this.state.password} type="password" />
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
