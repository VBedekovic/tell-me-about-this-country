const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

async function getGoogleImageUrls(searchTerm, numberOfImages) {
    const searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchTerm)}`;
    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);
  
    const imageUrls = [];
    $('img').each((index, element) => {
      if (imageUrls.length < numberOfImages) {
        const imageUrl = $(element).attr('src');
        if (imageUrl) {
          if(imageUrl.startsWith("https://encrypted-tbn0.gstatic.com/images?")){
            imageUrls.push(imageUrl);
          }
        }
      }
    });
  
    return imageUrls;
  }
  
  async function downloadImages(imageUrls) {
    const downloadDir = path.join(__dirname, 'downloads');
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir);
    }
  
    for (const imageUrl of imageUrls) {
      const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
      const imageFileName = uuidv4() + '.jpg';
      const imagePath = path.join(downloadDir, imageFileName);
      imageResponse.data.pipe(fs.createWriteStream(imagePath));
    }
  }

module.exports = { getGoogleImageUrls, downloadImages };