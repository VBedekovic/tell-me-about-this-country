const express = require('express');
const router = express.Router();

const { requestAIModelResponse } = require("../services/openaiApiService");
const Traveler = require('../classes/traveler');
const traveler = require("../services/travelerTestService");


router.get('/regions', async (req, res) => {
    // TODO 
})

router.get('/continents', async (req, res) => {
    // TODO 
})


//Expected request body:
/*
{
    "regionOrContinent": "string"
}
*/
router.post('/init-traveler', async (req, res) => {
    const { regionOrContinent } = req.body;
    
    const traveler = await Traveler.createRandomTraveler(regionOrContinent);
    // TODO save traveler instance to travelerTestService.js

    res.status(200).json(traveler.getInfo())

})


router.get('/current-traveler-info', async (req, res) => {
    // TODO get traveler from service and return info

    res.status(200).json(null)
})


//Expected request body:
/*
{
    "question": "questionString"
}
*/
router.post('/ask-question', async (req, res) => {
    const { question } = req.body;

    //let promptResult = await requestAIModelResponse(travelerSkeletonPrompt(question, country))
    // ^^^ moved to the traveler class

    res.status(200).json(JSON.parse(promptResult.choices[0].message.content))
})

module.exports = router;