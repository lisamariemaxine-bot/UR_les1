const fs = require('fs');
const heicConvert = require('heic-convert');

(async () => {
  const inputBuffer = fs.readFileSync('public/Laptop.heic');
  const outputBuffer = await heicConvert({
    buffer: inputBuffer, // the HEIC file buffer
    format: 'JPEG',      // output format
    quality: 1           // the jpeg compression quality, between 0 and 1
  });
  fs.writeFileSync('public/Laptop.jpg', outputBuffer);
  console.log('Converted to Laptop.jpg');
})();
