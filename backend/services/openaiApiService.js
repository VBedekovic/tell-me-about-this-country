const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
});

/**
   * @param {string} promptString
   */
async function requestAIModelResponse(promptString) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: promptString }],
        model: 'gpt-3.5-turbo',
        temperature: 0.7
    });

    return chatCompletion
}

module.exports = {
    requestAIModelResponse
}