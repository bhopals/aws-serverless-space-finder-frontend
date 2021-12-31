import { ICreateSpaceState } from "../components/spaces/CreateSpace";
import { Space } from "../model/Model";
import { S3, config } from "aws-sdk";
import { config as appConfig } from "./config";
import { resolveModuleName } from "typescript";

config.update({
  region: appConfig.REGION,
});
export class DataService {
  // private s3Client = new S3({
  //   region: appConfig.REGION,
  // });

  public async createSpace(iCreateSpace: ICreateSpaceState) {
    if (iCreateSpace.photo) {
      const photoUrl = await this.uploadPublicFile(
        iCreateSpace.photo,
        appConfig.SPACES_PHOTOS_BUCKET
      );
      iCreateSpace.photoURL = photoUrl;
      iCreateSpace.photo = undefined;
    }
    const requestUrl = appConfig.api.spacesUrl;
    const requestOptions: RequestInit = {
      method: "POST",
      body: JSON.stringify(iCreateSpace),
    };

    const result = await fetch(requestUrl, requestOptions);
    const resultJSON = await result.json();
    return JSON.stringify(resultJSON.id);
  }

  public async uploadPublicFile(file: File, bucket: string) {
    const fileName = file.name;
    const uploadResult = await new S3({
      region: appConfig.REGION,
    })
      .upload({
        Bucket: bucket,
        Key: fileName,
        Body: file,
        ACL: "public-read",
      })
      .promise();
    return uploadResult.Location;
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
