import { AwsS3Auth } from './awsS3Auth';
import dotenv from 'dotenv';
dotenv.config();

export const AwsS3DeleteImg = (imgUrl) => {
  const fileName = imgUrl.split('.com/')[1];
  AwsS3Auth.deleteObject(
    {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
    },
    (err, data) => {
      if (err) console.log('s3 에러');
    },
  );
};
