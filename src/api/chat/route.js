const OpenAI = require("openai");
const { OpenAIStream, streamToResponse } = require("ai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // https://api.openai.com/v1/
  baseURL: "https://api.nextapi.fun/v1/",
});

async function handle(req, res) {
  const { messages } = req.body;
  if (process.env.NODE_ENV !== "development") {
    const ip = req.get("x-forwarded-for");
    if (ip) {
      console.log("Client IP:", ip);
    } else {
      console.log("No X-Forwarded-For header found");
    }
  }
  // 在提示下询问OpenAI以完成流式聊天
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
      { role: "user", content: "写一首诗词" },
      // ...messages,
      // ...newMessages
    ],
  });
  console.log(response);
  const stream = OpenAIStream(response);
  return streamToResponse(stream, res);
}

module.exports = {
  handle,
};
