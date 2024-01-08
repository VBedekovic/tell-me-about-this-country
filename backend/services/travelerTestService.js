const fs = require('fs');

// Function to retrieve all regions from a text file
function getAllRegions() {
    const regions = fs.readFileSync('backend/services/regions.txt', 'utf8').split('\n').map((line) => line.trim());
    return regions;
}

// Function to retrieve all continents from a text file
function getAllContinents() {
    const continents = fs.readFileSync('backend/services/continents.txt', 'utf8').split('\n').map((line) => line.trim());
    return continents;
}

// Function to retrieve random personality traits from a text file
function getRandomPersonalityTraits(n) {
    const personalityTraits = fs.readFileSync('backend/services/personality_traits.txt', 'utf8').split('\n').map((line) => line.trim());
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
    const namesFile = gender === 'M' ? 'backend/services/male_names.txt' : 'backend/services/female_names.txt';
    const surnames = fs.readFileSync('backend/services/surnames.txt', 'utf8').split('\n').map((line) => line.trim());
    const names = fs.readFileSync(namesFile, 'utf8').split('\n').map((line) => line.trim());
    const randomFirstName = names[Math.floor(Math.random() * names.length)];
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    return `${randomFirstName} ${randomSurname}`;
}
