const { requestAIModelResponse } = require("../services/openaiApiService");
const { travelerSkeletonPrompt, travelerChooseCountryPrompt } = require("../services/promtBuilderService");
//import random choice functions travelerTestService when complete

class Traveler {
    // "Private" constructor
    /**
     * 
     * @param {string} gender - Should be a string with the value of "M" or "F".
     * @param {string} name 
     * @param {string[]} personalityTraits
     * @param {string} traveledToCountry
     */
    constructor(gender, name, personalityTraits, traveledToCountry) {
        if (gender !== 'M' && gender !== 'F') {
            throw new Error('Invalid gender. Must be "M" or "F".');
        }

        this.gender = gender
        this.name = name
        this.personalityTraits = personalityTraits

        this.traveledToCountry = traveledToCountry

        // TODO add params that keep track of left questions per category
    }

    static async createTraveler(gender, name, personalityTraits, regionOrContinent) {
        if (gender !== 'M' && gender !== 'F') {
            throw new Error('Invalid gender. Must be "M" or "F".');
        }

        const genderName = gender === 'M' ? "male" : "female";
        const openaiResponse = JSON.parse(
            await requestAIModelResponse(travelerChooseCountryPrompt(regionOrContinent, personalityTraits, genderName, name))
        )

        return new Traveler(gender, name, personalityTraits, openaiResponse.country)
    }


    static async createRandomTraveler(regionOrContinent) {
        // TODO random choice functions #################################
        const randomGender = Math.random() < 0.5 ? 'M' : 'F';
        const randomName = "Lucy";
        const randomPersonalityTraits = ["adventurous", "friendly"];
        // ##############################################################

        // Use the createTraveler factory method
        return await Traveler.createTraveler(
            randomGender,
            randomName,
            randomPersonalityTraits,
            regionOrContinent
        );
    }

    getInfo() {
        return {
            gender: this.gender,
            name: this.gender,
            personalityTraits: this.personalityTraits,
        }
    }

    getTraveledToCountry() {
        return this.traveledToCountry
    }


    async askQuestion(question) {
        const openaiResponse = JSON.parse(
            await requestAIModelResponse(travelerSkeletonPrompt(
                question,
                this.traveledToCountry,
                this.personalityTraits,
                this.gender === 'M' ? "male" : "female",
                this.name
            ))
        )

        // TODO make logic based on the categories to see what was used up with this question
        const giveToFrontend = openaiResponse

        return giveToFrontend
    }

}

module.exports = Traveler