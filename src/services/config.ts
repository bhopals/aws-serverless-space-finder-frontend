const spaceUrl = "http://vlbrdes3434.execute-api.eu-west-1.amazonaws.com/prod/";
export const config = {
  REGION: "us-east-1",
  USER_POOL_ID: "us-east-1_JWds32f42", // User Pool Details
  APP_CLIENT_ID: "as23f23w34sg233242", // User Pool Details
  IDENTITY_POOL_ID: "us-east-1:9bserasdfasewfwefw", // IDentity Pool Details
  TEST_USER_NAME: "test_user", // User Pool Details
  TEST_USER_PASSWORD: "askesfme3wf", // User Pool Details
  SPACES_PHOTOS_BUCKET: "spaces-photos-0238058255",
  api: {
    baseUrl: spaceUrl,
    spacesUrl: `${spaceUrl}spaces`,
  },
};
