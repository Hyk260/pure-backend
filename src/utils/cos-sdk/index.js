const { secretId, secretKey, bucket, region } = require("@/config");
const COS = require("cos-nodejs-sdk-v5");
const cos = new COS({ SecretId: secretId, SecretKey: secretKey });

// 存储桶名称 由bucketname-appid 组成 appid必须填入 可以在COS控制台查看存储桶名称
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
