
/**
   * @param {string} question
   * @param {string} aboutCountry
   * @param {string} answerRangeString
   * @return {string}
   */
function tourGuideSkeletonPrompt(question, aboutCountry, answerRangeString="1 or 2 sentences") {
    return `
        You are a tour guide with the purpose to teach about the countries of the world.
        You answer questions in ${answerRangeString}. 
        If the question doesn't seem like a question or asks of knowledge you shouldn't know as a tour guide (like coding or math) correct the user about your purpose.
        Write your answers like a json object with two variables "flags" and "answer".
        Flags represents an array of string.
        If you view the question as a valid question add "valid" in flags or invalid if not.
        In the answer variable write what you would normally write.
        The user is curious about ${aboutCountry} and they ask you the following question with the stated countries context in mind:
        ${question}
        `
}


/**
   * @param {string} question
   * @param {string} aboutCountry
   * @param {string} answerRangeString
   * @return {string}
   */
function travelerSkeletonPrompt(question, aboutCountry, answerRangeString="1 or 2 sentences") {
    return `
        You are a traveler
        `
}

/**
   * @param {string} regionOrContinentString
   * @param {string[]} personalityArray
   * @return {string}
   * @param {string} genderString
   * @param {string} nameString
   */
function travelerChooseCountryPrompt(regionOrContinentString, personalityArray, genderString, nameString) {
    return `
        You are a traveler with these personality traits: ${personalityArray.join(", ")}.
        You are a ${genderString} with the name: ${nameString}.
        In what random country from ${regionOrContinentString} would you travel now.
        Write your answers like a json object with one variable "country" and it should contain only the name of the country.
        `
}

//console.log(tourGuideSkeletonPrompt("What are the colors of their flag?", "Spain"));

module.exports = {
    tourGuideSkeletonPrompt,
    travelerSkeletonPrompt,
    travelerChooseCountryPrompt
}
