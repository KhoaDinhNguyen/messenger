const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const getImageFromS3 = async ({ filename }) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: filename,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });

  return url;
};

const uploadToS3 = async ({ file, userid }) => {
  const key = `${userid}_${new Date().getTime()}_${file.originalname}`;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(command);

    const url = await getSignedUrl(s3, command);
  } catch (err) {
    console.log(err);
    throw err;
  }

  return key;
};

module.exports = { uploadToS3, getImageFromS3 };
