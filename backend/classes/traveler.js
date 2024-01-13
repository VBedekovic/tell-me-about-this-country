const { requestAIModelResponse } = require("../services/openaiApiService");
const { travelerSkeletonPrompt, travelerChooseCountryPrompt } = require("../services/promtBuilderService");
const { initCategoryChancesDict, getRandomGender, getRandomName, getRandomPersonalityTraits, censorCountryName } = require("../services/travelerTestService");

const NUM_OF_PERSONALITY_TRAITS = 3

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

        this.categoryChancesDict = initCategoryChancesDict()
    }

    static async createTraveler(gender, name, personalityTraits, regionOrContinent) {
        if (gender !== 'M' && gender !== 'F') {
            throw new Error('Invalid gender. Must be "M" or "F".');
        }

        const genderName = gender === 'M' ? "male" : "female";
        const promptResult = 
            await requestAIModelResponse(travelerChooseCountryPrompt(regionOrContinent, personalityTraits, genderName, name))
        const openaiResponse = JSON.parse(promptResult.choices[0].message.content)

        return new Traveler(gender, name, personalityTraits, openaiResponse.country)
    }


    static async createRandomTraveler(regionOrContinent) {
        const randomGender = getRandomGender();
        const randomName = getRandomName(randomGender);
        const randomPersonalityTraits = getRandomPersonalityTraits(NUM_OF_PERSONALITY_TRAITS);

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
            name: this.name,
            personalityTraits: this.personalityTraits,
        }
    }

    getTraveledToCountry() {
        return this.traveledToCountry
    }

    getCategoryChancesDict() {
        return this.categoryChancesDict
    }

    async askQuestion(question) {
        const promptResult = 
            await requestAIModelResponse(travelerSkeletonPrompt(
                question,
                this.traveledToCountry,
                this.personalityTraits,
                this.gender === 'M' ? "male" : "female",
                this.name,
                this.categoryChancesDict
            ))
        const openaiResponse = JSON.parse(promptResult.choices[0].message.content)

        if (this.categoryChancesDict[openaiResponse.answered_category] <= 0)
            openaiResponse.answer = "I'm sorry, but you used up all your questions in this category..."

        if (openaiResponse.answered_category !== null) {
            // DANGER Potential openai error
            if (this.categoryChancesDict[openaiResponse.answered_category] > 0) 
                this.categoryChancesDict[openaiResponse.answered_category] -= 1;
        }
        openaiResponse.category_chances_dict = this.categoryChancesDict;

        if (!openaiResponse.flags.includes("correct_guess"))
            openaiResponse.answer = censorCountryName(openaiResponse.answer, this.traveledToCountry);

        return openaiResponse
    }

}

module.exports = Traveler