const OpenAI = require("openai");
const { OpenAIStream, streamToResponse } = require("ai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // https://api.openai.com/v1/
  baseURL: "https://api.nextapi.fun/v1/",
});

async function handle(req, res) {
  const { messages } = req.body;
  // const ip = req.headers.get("x-forwarded-for");
  // if (ip) {
  //   console.log("Client IP:", ip);
  // } else {
  //   console.log("No X-Forwarded-For header found");
  // }
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      // {
      //   role: "system",
      //   content: "",
      // },
      // {
      //   role: "assistant",
      //   content: "",
      // },
      // ...messages,
      { role: "user", content: "写一首诗词" },
    ],
  });
  const stream = OpenAIStream(response);
  return streamToResponse(stream, res);
}

module.exports = {
  handle,
};
