import multer from 'multer';
import multerS3 from 'multer-s3-transform';
import * as sharp from 'sharp';
import dayjs from 'dayjs';
import { AwsS3Auth } from './aws/awsS3Auth';
import dotenv from 'dotenv';
dotenv.config();

const created_at = dayjs().format('YYYY-MM-DD');

export const MulterS3ImgConfigAndUpload = (file: unknown, size: number, bucketName: string) => {
  const storage = multerS3({
    s3: AwsS3Auth,
    bucket: process.env.AWS_S3_BUCKET_NAME + `/${bucketName}`,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: true,
    transforms: [
      {
        id: 'resized',
        key: function (req, file, cb) {
          try {
            const fileType = file.mimetype.split('/')[0] != 'image';
            if (fileType) {
              // 이미지 타입 아님
              return cb(new Error('Only images are allowed'));
            }
            const ex = file.originalname.split('.');
            cb(null, created_at + `${bucketName}` + Date.now() + Math.random() * (99 - 10) + 10 + '.' + ex[ex.length - 1]);
          } catch {
            return cb(new Error('multer image upload error'));
          }
        },
        transform: (req, file, cb) => {
          cb(null, sharp().resize({ width: size }).rotate());
        },
      },
    ],
    acl: 'public-read-write',
  });
  return multer({ storage: storage }).single(`${file}`);
};
