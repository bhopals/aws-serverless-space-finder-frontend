export interface User {
  userName: string;
  email: string;
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
