#!/usr/bin/env node
async function start() {
  require("./server").serveNcmApi({
    // port: 8081,
    // host: '',
    // moduleDefs: ''
  });
}

start();
