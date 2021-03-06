import { ICreateSpaceState } from "../components/spaces/CreateSpace";
import { Space } from "../model/Model";
import { S3, config } from "aws-sdk";
import { config as appConfig } from "./config";
import { generateRandomId } from "./../utils/Utils";
config.update({
  region: appConfig.REGION,
});
export class DataService {
  private s3Client: S3;

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

  private getS3Client(): S3 {
    if (this.s3Client) {
      return this.s3Client;
    } else {
      this.s3Client = new S3({
        region: appConfig.REGION,
      });
      return this.s3Client;
    }
  }

  public async uploadPublicFile(file: File, bucket: string) {
    const fileName = generateRandomId() + file.name;
    const uploadResult = await this.getS3Client()
      .upload({
        Bucket: bucket,
        Key: fileName,
        Body: file,
        ACL: "public-read",
      })
      .promise();
    return uploadResult.Location;
  }

  public async getSpaces(): Promise<any> {
    const requestUrl = appConfig.api.spacesUrl;
    const requestResult = await fetch(requestUrl, { method: "GET" });
    const responseJSON = await requestResult.json();
    return responseJSON;
  }

  public async reserveSpace(spaceId: string): Promise<string | undefined> {
    if (spaceId === "123") {
      return "555";
    } else {
      return undefined;
    }
  }
}
