const express = require('express');
const router = express.Router();

const { requestAIModelResponse } = require("../services/openaiApiService");
const { tourGuideSkeletonPrompt } = require("../services/promtBuilderService");
const { getSuggestedQuestions } = require("../services/suggestedQuestionsService")


//Expected request body:
/*
{
    "question": "questionString",
    "country": "countryNameString"      //example: Croatia, Spain, Germany
}
*/
router.post('/ask-question', async (req, res) => {
    const { question, country } = req.body;

    let promptResult = await requestAIModelResponse(tourGuideSkeletonPrompt(question, country))

    res.status(200).json(JSON.parse(promptResult.choices[0].message.content))
})

router.get('/n-random-questions/:n', async (req, res) => {
    const numberOfQuestions = req.params.n;

    const questionsArray = getSuggestedQuestions(numberOfQuestions);

    res.status(200).json(
        {
            questionsArray: questionsArray
        }
    )
})


module.exports = router;