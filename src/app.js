#!/usr/bin/env node
async function start() {
  require('./server').serveNcmApi({
    checkVersion: false,
    // port: 8081,
    // host: '',
    // moduleDefs: ''
  })
}
start()