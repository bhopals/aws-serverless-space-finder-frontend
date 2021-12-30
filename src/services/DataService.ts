import { ICreateSpaceState } from "../components/spaces/CreateSpace";
import { Space } from "../model/Model";

export class DataService {
  public async createSpace(iCreateSpace: ICreateSpaceState) {
    return "123";
  }

  public async getSpaces(): Promise<Space[]> {
    const result: Space[] = [];
    result.push(
      {
        location: "Paris",
        name: "Best Location Paris",
        spaceId: "123",
      },
      {
        location: "London",
        name: "Best Location London",
        spaceId: "456",
      },
      {
        location: "Toronto",
        name: "Best Location Toronto",
        spaceId: "789",
      },
      {
        location: "New York",
        name: "Best Location New York",
        spaceId: "658",
      }
    );
    return result;
  }

  public async reserveSpace(spaceId: string): Promise<string | undefined> {
    if (spaceId === "123") {
      return "555";
    } else {
      return undefined;
    }
  }
}
