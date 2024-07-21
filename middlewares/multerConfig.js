// const multer = require('multer');
// const path = require('path');
// const AWS = require('aws-sdk');
// const multerS3 = require('multer-s3');
// const dotenv = require('dotenv');

// dotenv.config(); // Load environment variables

// // Debug: log environment variables
// console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
// console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);
// console.log("AWS_REGION:", process.env.AWS_REGION);
// console.log("S3_BUCKET_NAME:", process.env.S3_BUCKET_NAME);

// // Configure AWS S3
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION
// });

// // Configure multer for local storage
// const localStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
//   }
// });

// // Configure multer for S3 storage
// const s3Storage = multerS3({
//   s3: s3,
//   bucket: process.env.S3_BUCKET_NAME, // Ensure this is correct
//   acl: 'public-read',
//   key: function (req, file, cb) {
//     cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
//   }
// });

// // Multer upload
// const upload = multer({
//   storage: s3Storage, // Use s3Storage for S3 or localStorage for local
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image and video files are allowed!'), false);
//     }
//   }
// });

// module.exports = upload;
