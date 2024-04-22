const { createClient } = require("@vercel/kv");

// console.log(process.env.KV_URL);
// console.log("KV_REST_API_URL", process.env.KV_REST_API_URL);
// console.log("KV_REST_API_TOKEN", process.env.KV_REST_API_TOKEN);
// console.log(process.env.KV_REST_API_READ_ONLY_TOKEN);

const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

module.exports = kv;
