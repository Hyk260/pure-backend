const OpenAI = require("openai");
const { OpenAIStream, streamToResponse, StreamingTextResponse } = require("ai");

async function completions(req, res) {
  const { messages, stream = true } = req.body;

  if (process.env.NODE_ENV !== "development") {
    const ip = req.get("x-forwarded-for");
    if (ip) {
      console.log("Client IP:", ip);
    } else {
      console.log("No X-Forwarded-For header found");
    }
  }

  // 创建OpenAI API客户端
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // https://api.openai.com/v1/
    // https://api.nextapi.fun/v1/
    baseURL: "https://api.nextapi.fun/v1/",
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: stream,
    messages: [
      // {
      //   role: "system",
      //   content: "",
      // },
      // {
      //   role: "assistant",
      //   content: "",
      // },
      { role: "user", content: "测试" },
      // ...messages,
      // ...newMessages
    ],
  });
  // console.log('response:',response);
  // 将响应转换为文本流
  const aiStream = OpenAIStream(response);
  console.log("aiStream:", aiStream);

  // 用流进行响应
  // const streamingResponse = new StreamingTextResponse(aiStream);
  // console.log("streamingResponse:", streamingResponse);
  // return streamingResponse;

  const streamResponse = streamToResponse(aiStream, res);
  console.log("streamResponse:", streamResponse);
  return streamResponse;
}

module.exports = {
  completions,
};
