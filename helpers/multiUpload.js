const cloudinary = require('cloudinary').v2;
require('dotenv').config();


const {
  cloud_name,
  api_key,
  api_secret
} = process.env;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret
});
/**
 * @param {File} file - user passport file
 * @returns {object} pagination - with the limit and offset fields
 * to query database
 */

const multiUpload = (res, file, next) => {
  (file.path);
  if (file.path) {
    cloudinary.uploader.upload(file.path,
      (error, result) => {
        if (error) {
          // res.status(500).send(error);
          return next(error);
        }
        return next(result);
        // return result;
      });
  } else {
    const image = {
      url: file
    }
    return next(image);
  }

}


module.exports = multiUpload;