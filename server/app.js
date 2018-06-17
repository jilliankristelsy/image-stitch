const config = require('./config');
const processImages = require('./processImages');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));


//ENDPOINTS
app.post('/api/stitch', (req, res, next) => {
  // add callback to ensure write was completed in the called
  // function before sending the file in the response
  processImages(req.files.images, () => {
	  console.log("Stitch complete");
	  res.sendFile(path.join(__dirname, config.FILENAME), {
	    headers: {
	        'Content-Type': 'image/png',
	    },
	  });
  });
});


//START THE SERVER
const port = config.PORT;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});