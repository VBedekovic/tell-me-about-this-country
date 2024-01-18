const express = require('express');
const router = express.Router();

const { requestAIModelResponse } = require("../services/openaiApiService");
const Traveler = require('../classes/traveler');
const { setCurrentTraveler, getCurrentTraveler } = require('../services/travelerTestService');


router.get('/regions', async (req, res) => {
    // TODO 
    res.status(501)
})

router.get('/continents', async (req, res) => {
    // TODO 
    res.status(501)
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
    setCurrentTraveler(traveler)

    res.status(200).json(traveler.getInfo())

})


router.get('/current-traveler-info', async (req, res) => {
    res.status(200).json(getCurrentTraveler().getInfo())
})

router.get('/current-traveler-category-chances', async (req, res) => {
    res.status(200).json(getCurrentTraveler().getCategoryChancesDict())
})

router.get('/current-traveler-guess-chances', async (req, res) => {
    res.status(200).json({
        guess_chances_count: getCurrentTraveler().getGuessChancesCount()
    })
})


//Expected request body:
/*
{
    "question": "questionString"
}
*/
router.post('/ask-question', async (req, res) => {
    const { question } = req.body;

    const promptResult = await getCurrentTraveler().askQuestion(question)

    res.status(200).json(promptResult)
})

module.exports = router;