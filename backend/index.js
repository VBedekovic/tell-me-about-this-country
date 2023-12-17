const express = require('express');
const path = require('path');
const imageDownloader = require('./imageService/imageDownloader');

const app = express();
const port = process.env.PORT || 5005;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/download-images', async (req, res) => {
  const searchTerm = req.query.term;
  const numberOfImages = parseInt(req.query.num) || 5;

  try {
    const imageUrls = await imageDownloader.getGoogleImageUrls(searchTerm, numberOfImages);
    await imageDownloader.downloadImages(imageUrls);
    res.send('Images downloaded successfully!');
  } catch (error) {
    res.status(500).send('Error downloading images');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
