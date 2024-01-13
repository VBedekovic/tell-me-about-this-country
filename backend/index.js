const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const tourGuideAPI = require('./api/tourGuideCommunicationAPI');
app.use('/tour-guide-v1', tourGuideAPI);

const travelerAPI = require('./api/travelerCommunicationAPI');
const { travelerMiddleware } = require('./services/travelerTestService');
app.use('/traveler-v1', travelerMiddleware, travelerAPI);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
