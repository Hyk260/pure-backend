const COS = require("cos-nodejs-sdk-v5");
const { secretId, secretKey, bucket, region } = require("../../config");
const cos = new COS({ SecretId: secretId, SecretKey: secretKey });

// https://cloud.tencent.com/document/product/436/8629
function uploadFile(file, fileName) {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: bucket,
        Region: region,
        Key: fileName,
        Body: file.buffer,
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          return resolve(data);
        }
      }
    );
  });
}

module.exports = {
  uploadFile,
};
