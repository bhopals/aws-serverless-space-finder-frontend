import { Space } from "../model/Model";

export class DataService {
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
      }
    );
    return result;
  }
}
