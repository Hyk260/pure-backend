const https = require("https");
const path = require("path");
const fs = require("fs");
const { options } = require("../config");

/**
 * 下载文件并保存到本地
 * @param {string} fileUrl - 网络文件的 URL
 * @param {string} localFilePathRelative - 本地保存的文件相对路径
 * @returns {Promise<void>} - 当文件下载完成时，返回一个 Promise
 */
function downloadFile(fileUrl, localFilePathRelative) {
  return new Promise((resolve, reject) => {
    // 构建完整的本地文件路径
    const localFilePath = path.join(__dirname, localFilePathRelative);
    if (fs.existsSync(localFilePath)) {
      resolve("文件路径存在");
      return;
    }
    // 发起 HTTP GET 请求
    https
      .get(fileUrl, (response) => {
        // 创建可写流，将网络响应写入到本地文件
        const fileStream = fs.createWriteStream(localFilePath);
        response.pipe(fileStream);
        // 当所有数据写入完成时，关闭文件流
        response.on("end", () => {
          fileStream.close();
          resolve("文件下载完成");
        });
      })
      .on("error", (err) => {
        console.error("下载文件时发生错误:", err);
        reject(err); // 文件下载过程中发生错误，拒绝 Promise
      });
  });
}

// 使用示例：
const fileUrl = options.lowdbUser;
const localFilePathRelative = "../db/user.json";

downloadFile(fileUrl, localFilePathRelative)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error("文件下载失败:", err);
  });
