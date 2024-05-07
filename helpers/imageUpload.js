const aws = require("aws-sdk");
const s3 = new aws.S3();
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const imageUploads = (files, next) => {
  try {
    aws.config.setPromisesDependency();
    aws.config.update({
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      region: process.env.AWS_REGION, //E.g us-east-1
    });

    var params = {
      ACL: "public-read",
      Bucket: process.env.AWS_BUCKET,
      Body: fs.createReadStream(files.path),
      Key: `news/${files.originalname}`,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        //   console.log('Error occured while trying to upload to S3 bucket', err);
        return next({
          err: err,
        });
      }

      if (data) {
        fs.unlinkSync(files.path); // Empty temp folder
        const locationUrl = data.Location;
        return next({
          data: locationUrl,
        });
      }
    });
  } catch (error) {
    return errs(error);
  }
};

module.exports = imageUploads;
