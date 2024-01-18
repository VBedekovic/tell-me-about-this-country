const express = require('express');
const router = express.Router();

const imageDownloader = require('../services/imageDownloader');
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


router.get('/ask-for-images', async (req, res) => {
    const searchTerm = req.query.term;
    const numberOfImages = parseInt(req.query.num) || 5;

    try {
        const imageUrls = await imageDownloader.getGoogleImageUrls(searchTerm, numberOfImages);
        await imageDownloader.downloadImages(imageUrls);
        res.send('Images downloaded successfully!');
    } catch (error) {
        res.status(500).send('Error downloading images');
    }
});


module.exports = router;