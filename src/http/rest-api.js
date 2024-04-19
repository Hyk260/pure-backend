const axios = require('axios')
const { imServerBaseUrl } = require("../config");

// https://cloud.tencent.com/document/product/269/1519
const service = axios.create({
  baseURL: imServerBaseUrl,
  timeout: 10000,
})

service.interceptors.request.use((config) => {
  return config
})

service.interceptors.response.use((response) => {
  const { data, config, status } = response
  const { code, msg } = data
  if (status === 200) return data
})

module.exports = {
  service,
}
