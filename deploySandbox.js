// eslint-disable-next-line import/no-extraneous-dependencies
const s3FolderUpload = require("s3-folder-upload");
const fs = require("fs");

const directoryName = "build";

const BUCKETNAME = "sandbox.eth.build"; // <<---- SET YOUR BUCKET NAME AND CREATE aws.json ** see below vvvvvvvvvv


 const invalidation = {
  awsDistributionId: "ELRHIIIOM3P69",
  awsInvalidationPath: "/*"
 }
