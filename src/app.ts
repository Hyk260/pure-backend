#!/usr/bin/env node
async function start() {
  // 设置路径别名
  // require("module-alias").addAliases({
  //   "@": process.cwd() + "/src",
  // });
  require("./server").serveNcmApi({
    checkVersion: false,
    // port: 8081,
    // host: '',
    // moduleDefs: ''
  });
}
start();
