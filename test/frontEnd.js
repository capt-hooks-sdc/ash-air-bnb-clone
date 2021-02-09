// need to test to ensure that clicking close on the modal resets the currentPhoto Index back to the start

  //using react-rendered I can render a test version of my component, and activate the onclick function
  // I can then use the property matcher to compare that the value of the currentPhoto matches what is expected, in this case, 0

// need to check to see that clicking see all photos opens carousel at the first image
  // Similarly, I can use render to create this component and trigger the onclick for the see all photos button. I can then use the property matcher to ensure that the image rendered is the same as expected, in this case, 0

// need to make sure that clicking an individual photo starts the carousel at that particular index
  // I can use render to create the gallery and trigger the onclick of an element function, specifying the index clicked. I can then check the currentPhoto property with property matcher to ensure that the index clicked now matches the currentPhoto.

  // Should test that the arrow buttons in the carousel change the photo properly.
    // here I can use render to start the carousel at a specific index, then in two seperate tests activate forward and backward, and check to see that the currentPhoto property has incremented or decremented properly.
