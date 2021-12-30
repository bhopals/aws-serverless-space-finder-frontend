import { User, UserAttributes } from "../model/Model";

export class AuthService {
  public async login(
    userName: string,
    password: string
  ): Promise<User | undefined> {
    if (userName === "user" && password === "123") {
      return {
        userName,
        email: "user@example.com",
      };
    } else {
      return undefined;
    }
  }

  public async getUserAttributes(
    user: User
  ): Promise<UserAttributes[] | undefined> {
    const result: UserAttributes[] = [];
    result.push({ Name: "description", Value: "Best user ever!" });
    result.push({ Name: "job", Value: "Engineer" });
    result.push({ Name: "age", Value: "25" });
    result.push({ Name: "experience", Value: "3 years" });

    return result;
  }
}
