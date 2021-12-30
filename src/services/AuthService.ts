import User, { UserAttributes } from "../model/Model";
import { Auth } from "aws-amplify";
import Amplify from "aws-amplify";
import { config } from "./config";
import { CognitoUser } from "@aws-amplify/auth";

import * as AWS from "aws-sdk";
import { Credentials } from "aws-sdk/lib/credentials";

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    userPoolWebClientId: config.APP_CLIENT_ID,
    identityPoolId: config.IDENTITY_POOL_ID,
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

export class AuthService {
  // public async login(
  //   userName: string,
  //   password: string
  // ): Promise<User | undefined> {
  //   if (userName === "user" && password === "123") {
  //     return {
  //       userName,
  //       email: "user@example.com",
  //     };
  //   } else {
  //     return undefined;
  //   }
  // }

  public async login(
    userName: string,
    password: string
  ): Promise<User | undefined> {
    try {
      const user = await Auth.signIn(userName, password);
      return {
        cognitoUser: user,
        userName: user.getUserName(),
      };
    } catch (error) {
      return undefined;
    }
  }

  public async getUserAttributes(
    user: User
  ): Promise<UserAttributes[] | undefined> {
    const result: UserAttributes[] = [];
    const attributes = await Auth.userAttributes(user.cognitoUser);
    result.push(...attributes);
    return result;
  }
}
