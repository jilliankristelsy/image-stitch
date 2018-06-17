const mergeImg = require('merge-img');
const config = require('./config');
const path = require('path');

/* Use the mergeImg package to send an array of images
 * and received a single file which contains all the images
 * Saving this image in the server with a static file name
 * so that we can conserve space
 */
function processImages(images, cb) {
	var imagesURL = images.map((image) => image.data);
	
	mergeImg(imagesURL)
	  .then((img) => {
	    // Save image as file
	    img.write(path.join(__dirname, config.FILENAME), cb);
	  });
}

module.exports = processImages;