const fs = require('fs');
const Traveler = require('../classes/traveler');


var currentTraveler = null

/**
 * 
 * @param {Traveler} traveler 
 */
function setCurrentTraveler(traveler) {
    currentTraveler = traveler
}

/**
 * 
 * @returns {Traveler}
 */
function getCurrentTraveler() {
    return currentTraveler
}

// Function to format the current time as HH:mm:ss
function getCurrentTime () {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

// traveler middleware for logging
const travelerMiddleware = (req, res, next) => {
    const currentTime = getCurrentTime();

    res.on('finish', async () => {
        console.log()
        console.log(`[${currentTime}]#########################################################`)
        console.log('Route called:', req.originalUrl);
        const t = getCurrentTraveler()
        if (t) {
            console.log(t.getInfo())
            console.log(t.getCategoryChancesDict())
            console.log("In country:", t.getTraveledToCountry())
        } else {
            console.log('No traveler initiated.');
        }
    })

    // Continue to the next middleware or route handler
    next();
};

/**
 * Initializes a category chances dictionary with equal chances for each category.
 * The default number of chances is set to 5, but it can be easily changed.
 * Categories include "History", "Geography", "Economics", "Media&Sports", and "Statistics".
 *
 * @param {number} numberOfchances - The number of chances to assign to each category.
 * @returns {Object.<string, number>} - The category chances dictionary.
 */
function initCategoryChancesDict(numberOfchances = 3) {
    return {
        "history": numberOfchances,
        "geography": numberOfchances,
        "economics": numberOfchances,
        'media&sports': numberOfchances,
        "statistics": numberOfchances,
    }
}


// Function to retrieve all regions from a text file
function getAllRegions() {
    const regions = fs.readFileSync('services/regions.txt', 'utf8').split('\n').map((line) => line.trim());
    return regions;
}

// Function to retrieve all continents from a text file
function getAllContinents() {
    const continents = fs.readFileSync('services/continents.txt', 'utf8').split('\n').map((line) => line.trim());
    return continents;
}

// Function to retrieve random personality traits from a text file
function getRandomPersonalityTraits(n) {
    const personalityTraits = fs.readFileSync('services/personality_traits.txt', 'utf8').split('\n').map((line) => line.trim());
    const randomTraits = [];
    const availableTraits = [...personalityTraits];

    for (let i = 0; i < n; i++) {
        if (availableTraits.length === 0) return randomTraits;
        const randomIndex = Math.floor(Math.random() * availableTraits.length);
        const selectedTrait = availableTraits[randomIndex];
        randomTraits.push(selectedTrait);
        availableTraits.splice(randomIndex, 1);
    }

    return randomTraits;
}

// Function to generate a random gender (M/F)
function getRandomGender() {
    return Math.random() < 0.5 ? 'M' : 'F';
}

// Function to generate a random name based on gender
function getRandomName(gender) {
    const namesFile = gender === 'M' ? 'services/male_names.txt' : 'services/female_names.txt';
    const surnames = fs.readFileSync('services/surnames.txt', 'utf8').split('\n').map((line) => line.trim());
    const names = fs.readFileSync(namesFile, 'utf8').split('\n').map((line) => line.trim());
    const randomFirstName = names[Math.floor(Math.random() * names.length)];
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    return `${randomFirstName} ${randomSurname}`;
}

/**
 * Censors the name of the country in a given string.
 * Replace this function with your actual implementation.
 *
 * @param {string} originalString - The original string containing the country name.
 * @returns {string} - The string with the country name redacted.
 */
function censorCountryName(originalString, country) {
    const countryName = country;
    const redactedString = originalString.replace(new RegExp(countryName, 'gi'), 'this country');
    return redactedString;
}

module.exports = {
    setCurrentTraveler,
    getCurrentTraveler,
    initCategoryChancesDict,
    getAllContinents,
    getAllRegions,
    getRandomPersonalityTraits,
    getRandomGender,
    getRandomName,
    censorCountryName,
    travelerMiddleware
}