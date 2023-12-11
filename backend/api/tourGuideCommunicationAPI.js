const express = require('express');
const router = express.Router();

const { requestAIModelResponse } = require("../services/openaiApiService");
const { tourGuideSkeletonPrompt } = require("../services/promtBuilderService")

router.post('/ask-question', async (req, res) => {
    res.status(200).json(
        {
            flags: [],
            answer: "The answer string goes here."
        }
    )
})

//#########TODO#####################
router.get('/n-random-questions/:n', async (req, res) => {
    const numberOfQuestions = req.params.n;
    const questionsArray = Array.from({ length: numberOfQuestions }, () => "Question?");
    // get questions from the service and return them
    //console.log(numberOfQuestions)
    //console.log(questionsArray)
    res.status(200).json(
        {
            questionsArray: questionsArray
        }
    )
})


module.exports = router;