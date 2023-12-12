const fs = require('fs');
const filePath = 'Pitanja.txt';

// reading questions from the file
function readQuestionsFromFile(filePath) {
  const questions = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);
  return questions;
}

// choosing 4 random questions
function getRandomQuestions(questions, count = 4) {
  const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, count);
}

module.exports = getRandomQuestions;
