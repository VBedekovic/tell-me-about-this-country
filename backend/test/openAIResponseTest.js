const { requestAIModelResponse } = require("../services/openaiApiService");
const { tourGuideSkeletonPrompt } = require("../services/promtBuilderService")

require('dotenv').config();

const testAPICall = async () => {
    let result = await requestAIModelResponse(tourGuideSkeletonPrompt("What is the most famous dish from this country?", "Italy"))
    console.log(result.data)

}

testAPICall()