import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import './App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        
        //*limit* determines the number of images we can stitch
        //*exceedFiles* controls displaying an error message when limit is exceeded
        //*numOfImages* internal check of number of images
        //*downloadReady* controls the 'download image' button
        this.state = {
        	limit: 4,
        	exceedFiles: false,
        	numOfImages: 0,
        	downloadReady: false,
        }
        
        //stores the new image data
        this.stitchImage = null;
        
        //list of all images in the dropzone
        this.images = [];

        //dropzone configuration
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif",
            maxFiles: this.state.limit
        };

        //dropzone configuration
        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: '/dummy'
        };
        
        this.dropzone = null;

        //binding all methods
        this.addedfile.bind(this);
        this.removedfile.bind(this);
        this.maxfilesexceeded.bind(this);
        this.processImages.bind(this);
        this.arrayBufferToBase64.bind(this);
        
    }
    
    // Called after file is added on dropzone
    addedfile = file => {
    	this.images.push(file);
    	this.setState({numOfImages: this.state.numOfImages+1});
    }

    // Called after file is removed on dropzone
    removedfile = file => {
    	console.log('removing...', file);
    	var remIndex = this.images.indexOf(file);
    	this.images.splice(remIndex, 1);
    	this.setState({exceedFiles: false,
    		numOfImages: this.state.numOfImages-1});
    }
    
    // Called when limit is exceeded
    maxfilesexceeded = (file) => {
    	//Every time we exceed, remove file is called immediately after
    	this.dropzone.removeFile(file);
    	this.setState({exceedFiles: true});
    	
    };
    
    // Sending a request to server to stitch images
    processImages = ev => {
    	ev.preventDefault();
    	
    	// in middle of processing, download not ready
    	this.setState({downloadReady: false});

    	// setting up body by appending all images
        const data = new FormData();
        for(var i = 0; i < this.images.length; i++) {
        	data.append('images', this.images[i]);
        }

        // send request
        fetch('/api/stitch', {
          method: 'POST',
          body: data,
        }).then((response) => {
          // process response because it is an image
          response.arrayBuffer().then((buffer) => {
            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr = this.arrayBufferToBase64(buffer);
            // Setting new image, process is complete
            this.stitchImage = base64Flag + imageStr;
            this.setState({downloadReady: true});
          });
        });
    };
    
    // processing received images 
    arrayBufferToBase64 = (buffer) => {
      var binary = '';
      var bytes = [].slice.call(new Uint8Array(buffer));

      bytes.forEach((b) => binary += String.fromCharCode(b));

      return window.btoa(binary);
    };

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        //controls the processing image button
        //will only be true if we have the exact number of images
        var readyForStitch = (this.state.numOfImages === this.state.limit);

        const eventHandlers = {
            init: dz => this.dropzone = dz,
            addedfile: this.addedfile,
            removedfile: this.removedfile,
            maxfilesexceeded: this.maxfilesexceeded,
        }

        return (
          <div className = "App">
        	<div className="App-Left">
        	  <div className="dropContainer">
          	    <DropzoneComponent 
        	      config={config} 
        	      eventHandlers={eventHandlers} 
        	      djsConfig={djsConfig}>
        	      <div className="dz-message">Drop or click to add new images!</div>
        	    </DropzoneComponent>
        	    <button disabled={!readyForStitch} onClick={this.processImages}> Process Images </button>
        	  </div>
        	  {this.state.exceedFiles && <div className="exceed-error">Sorry, we only allow {this.state.limit} images!</div>}
        	</div>
        	<div className="App-Right">
      	      <div className="stitchContainer">
      	        <div className="dz-message">Stitched Image Here:</div>
      	        {this.state.downloadReady && <img src={this.stitchImage} alt="Stitched"/>}
        	  </div>
        	  <a href={this.stitchImage} download="mystitched.png">
        	    <button disabled={!this.state.downloadReady}> Download Image </button>
        	  </a>
      	    </div>
      	  </div>
        )
    }
}