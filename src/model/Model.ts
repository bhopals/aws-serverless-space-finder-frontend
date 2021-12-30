import { CognitoUser } from "@aws-amplify/auth";

export default interface User {
  userName: string;
  cognitoUser: CognitoUser;
}

export interface UserAttributes {
  Name: string;
  Value: string;
}

export interface Space {
  spaceId: string;
  name: string;
  location: string;
  photoUrl?: string;
}
