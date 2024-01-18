const { requestAIModelResponse } = require("../services/openaiApiService");
const { tourGuideSkeletonPrompt } = require("../services/promtBuilderService")

const testAPICall = async () => {
    let result = await requestAIModelResponse(tourGuideSkeletonPrompt("What is the most famous dish from this country?", "Italy"))
    console.log(JSON.parse(result.choices[0].message.content))

}

testAPICall()


/* 

console.log(result)
>>> requestAIModelResponse return object example structure
{
    id: 'chatcmpl-8SuzosCX5qb8bCZrnisfrSY9NfbXH',
        object: 'chat.completion',
        created: 1701902968,
        model: 'gpt-3.5-turbo-0613',
        choices: [{ index: 0, message: [Object], finish_reason: 'stop' }],
        usage: { prompt_tokens: 167, completion_tokens: 23, total_tokens: 190 },
    system_fingerprint: null
}
 */

/*
console.log(result.choices[0].message)
>>> message object example structure
{
  role: 'assistant',
  content: '{\n' +
    '  "flags": ["valid"],\n' +
    '  "answer": "The most famous dish from Italy is pizza."\n' +
    '}'
}
*/