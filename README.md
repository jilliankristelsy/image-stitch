# stitch
Takes images and return an image with all of combined to one image.

##Test Project

Prompt:
Create a NodeJs application that encapsulates the following functionality:
----
Accept 4 images as input via browse and drag and drop
Given the 4 images, create a new image that stitches the source images in sequence, one after the other
Once the stitched image is created, display on a web page 
And then give the user the ability to download the resulting image to store it on their local computer.
----
Requirements:
	Comment your code as appropriate (no need to comment every line. Only when necessary to clarify)
	Publish to github including md file and provide us with the repository link via email
---------------

Assumptions:
- You are only uploading images (png,jpg) in the drag and drop container
- You are only allowed to upload the limit number of images (Limit: 4)
- You will stitch the images if and only if we have the required (limit) number of images (For this example: 4 images)
- You can only get the stitched image by clicking the 'download image' button, no right-click

Technical environment
- You have npm and node installed in your device
	- npm version 5.6.0
	- node version 9.11.1


Steps:
1. run 'npm install' in /image-stitch, this might take several minutes
2. run 'npm run server' in console
3. run 'npm run client' in another console
4. navigate to http://localhost:3000, if it doesn't automatically open