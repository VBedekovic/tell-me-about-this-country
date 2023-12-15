const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'Pitanja.txt');

// reading questions from the file
function readQuestionsFromFile(filePath) {
  const questions = fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .map((line) => line.trim()) // Remove leading and trailing whitespace
    .filter(Boolean);

  return questions;
}

// choosing 4 random questions
function getRandomQuestions(questions, count = 4) {
  const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, count);
}

function getSuggestedQuestions(n = 4) {
  const questions = readQuestionsFromFile(filePath);
  return getRandomQuestions(questions, n)
}

module.exports = {
  getSuggestedQuestions
};
