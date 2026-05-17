const { fromPath } = require('pdf2pic');
const path = require('path');

const options = {
  density: 300,
  saveFilename: "parti-doos",
  savePath: "./public",
  format: "jpg",
  width: 1080,
  height: 1080
};

const storeAsImage = fromPath("./public/Parti doos.pdf", options);

storeAsImage(1).then((resolve) => {
  console.log("Page 1 is now converted as image");
}).catch((error) => {
  console.error("Error converting pdf: ", error);
});
